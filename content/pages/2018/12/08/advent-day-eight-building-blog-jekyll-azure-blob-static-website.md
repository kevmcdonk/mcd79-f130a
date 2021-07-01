---
layout: post
title: An Advent series - Building a blog with Jekyll and Azure Blob Static Website
date: '2018-12-08 06:00:00'
content_img_path: 'ekyllAndAzure.png'
comments: false
author: "Kevin McDonnell"
tags:
- azure
- technical

---

I promised this blog a couple of months back and after a [tweet](https://twitter.com/gregor_suttie/status/1072024346825244672) from [Gregor Suttie](https://twitter.com/gregor_suttie) asking about what people were using if not Wordpress, it seems a good time to write this.

## The journey to Jekyll

I wrote a [blog previously](http://www.mcd79.com/2017/03/02/hosting-a-ghost-publishing-blog-on-aws-using-a-custom-office-ui-fabric-theme-2.html) on using the [Ghost blog engine](https://docs.ghost.org/?_ga=2.17361915.390977825.1544461432-1817619238.1544461432) on AWS as that is how I had hosted my blog. After my trial year on AWS finished, the costs started creeping up so I flipped over to Google Cloud Engine. Sadly, despite good initial impressions, the free level VM just wasn't enough to run Ghost well and I had quite a few complaints of things not loading. I tried running Ghost on Google App Engine but it was more expensive for the same level of experience.

I had always wanted to run my blog on Azure as that's where I do most of my work but had not found enough options to do that cheaply. That was until the [Azure Blob Static Website preview](https://azure.microsoft.com/en-us/blog/azure-storage-static-web-hosting-public-preview/) hit and when coupled with [Microsoft Cloud Show](http://www.microsoftcloudshow.com/) mentioning Jekyll, the stars had aligned.

## What is Jekyll?

[Jekyll](https://jekyllrb.com/) is a lightweight engine that allows you to write your blog in [markdown](https://daringfireball.net/projects/markdown/) and then build out your blog as static pages. This makes them lightening fast to load and easy to host as you just need static storage. The [getting started guide](https://jekyllrb.com/docs/) is simple and you don't need to know any Ruby to get going. 

There are two main pain points:
- You need to compile your posts to deploy them each time
- There aren't so many templates

However, if you are a bit of a developer, the first point is simple as you can build a CI/CD process and simply check-in your posts to trigger an update - more on this later.

For the template, I had purchased a Ghost template to add a better look than my Delve inspired one previously so I adapted this to work with Jekyll. This was the most complex and onerous step as there were no guides I could find to adapt the syntax directly but running Jekyll locally, it was just a case of iterating through across a couple of evenings. You can also start with one of the base templates and implement your own with basic CSS knowledge too.

## Migrating content

One other concern I had was migrating all the content but you could easily extract from Ghost as a large JSON file. There are importers written for most of the main blogging engines such as [Wordpress](https://import.jekyllrb.com/docs/wordpress/) and [Ghost](https://import.jekyllrb.com/docs/ghost/) listed and this ran quickly and without any issues.

There was some manual formatting needed through some pages although nothing four or five bulk find and replaces couldn't solve. The biggest manual pain was the image assets as some of my earlier posts appear to lose the context but I did not have enough posts for this to be a large problem.

## Creating a static website in Azure Storage

Creating a very simple website is not very easy when you create a new Blob Storage account. Under the left menu, there is now a Static Website Preview link. Enabling this, creates a container called $web where you can then upload your static content. 

![Static Website Preview](e.PNG)

Upload an index.html with basic content and you will be able to access the page at the link described on the static website screen, e.g. https://blabla.z6.web.core.windows.net.

## Deploying posts

On to the fun part! Running the command:

`bundle exec jekyll build`

creates the blog in the _site folder. You can then upload these files to the Azure Blob Storage in the $web container and ask your blog with that link. If that is all you are looking for, then you are good to go.

## Using custom domain names

A great step with the static website is that you can now use custom domain names and also with https.

There are some details on this mentioned in the [Microsoft Docs](https://docs.microsoft.com/en-us/azure/storage/blobs/storage-blob-static-website) around static websites but I found myself getting lost in circles around the set-up. So here are my steps:

- Create a new Azure CDN

![Azure CDN Create](018/12/AzureCDNCreate.PNG)

- Configure the CDN Profile choosing whichever CDN you like - I chose the Microsoft one for the pricing

![Azure CDN Profile](/images/2018/12/AzureCDNProfile.PNG)

- Once created, add an Endpoint to the CDN with the following properties

![Azure CDN Endpoint](018/12/AzureCDNEndpoint.PNG)

- It may take a little time but you should now be able to access your blog via https://mcd79blogdemo.azureedge.net 
- Select custom domain from the left menu
- In another window, use your domain registrat to set up as per [this link](https://docs.microsoft.com/en-us/azure/cdn/cdn-custom-ssl?tabs=option-1-default-enable-https-with-a-cdn-managed-certificate#custom-domain-is-mapped-to-your-cdn-endpoint-by-a-cname-record) - below is my example from GoDaddy

![GoDaddy www config](oDaddyCDN1.PNG)
![GoDaddy CDNVerify](oDaddyCDN2.PNG)

- Add a Custom Domain in the Azure Portal with the CDN endpoint URL and your custom domain
- Select the Custom Domain and enable HTTPS as below

![Azure CDN Custom Domain](ustomDomain.PNG)

It may take a little time for the domain to be validated and the certificate correctly provisioned but after a couple of hours, you should be able to access your blog via the custom domain name.

## Deploying with Azure Dev Ops

The steps to build and deploy are relatively simple if a little slow to run due to the requirement to set up Ruby and the Ruby Gems for Jekyll. The first step is to check-in your code to either Git in your Azure Repo or to Github. Then you need a new build pipeline.

- Connect to the repo you have created
- Select an empty template
- Add the "Use Ruby Version" task and configure for version spec ">= 2.4"

![Ruby Task](ldRubyTask.PNG)

- Add a command line task to install jekyll bundler using `gem install jekyll bundler`
- Add a command line task to install any custom gems using `bundle install`
- Add a command line task to build the blog using `bundle exec jekyll build`
- Create a Copy Files task to put the _Site directory to a staging area 

![Copy Files task](evOpsCopyFiles.PNG)

- Add a Publish Artifact task to publish the _site directory

![Publish Artifact](evOpsPublishArtifact.PNG)

I have this build set to Continuous Integration so that it builds on every check-in but it could also be manually triggered.

Next create a new release pipeline with an empty template:
- Add the defined build as an artifact
- Add an Azure CLI task with the command `az storage blob upload-batch --source _site --destination $(containerName) --account-name $(storageAccount) --output table --no-progress`

![Dev Ops Release Task](018/12/DevOpsReleaseTask.PNG)

- You will notice two variables which need to be added to define the storageAccount and containerName (which should be $web)

![Dev Ops Variables](/images/2018/12/DevOpsVariables.PNG)

Again, you can set this up to release automatically with the build completing but in my case, I decided to allow this to happen manually to control when it took place. The main reason for this is at this stage I do not have an automated way for the CDN to be purged to get the latest home page showing the updated blog posts but I would like to build this in with a script later.

## Summary
As you are reading this, you know that a Jekyll based blog hosted in Azure static website can work. I see this as a great option for blogs and other static websites for more technical writers and at a much lower price than many other blog engines that need https and a custom domain. Any questions or thoughts, please do [tweet me](https://twitter.com/kevmcdonk)!
