---
layout: post
title: Searching Bing with an Azure Function
date: '2017-08-01 23:26:28'
content_img_path: 'https://upload.wikimedia.org/wikipedia/commons/e/ee/AWI-core-archive_hg.jpg'
tags:
- technical
- sharepoint
- azure
- azure-functions
---

I promised in my [last blog](https://www.mcd79.com/fed-up-hunting-down-images-for-your-news-pages-in-sharepoint/) to follow up with some more details on how the image search wed part application has been created and so this is the first part, looking at how the Azure Function was been created. It would have been great to not need the Azure Function and have the web part call various image APIs directly. Unfortunately, the security is a far more important consideration and so an intermediary is needed. You could create a web api but Azure Functions open up a quick and easy way to wrap code securely and with minimal infrastructure (virtual or otherwise) to be set up.

Just before I get started on creating an Azure Function, I would like to apologise to anyone who tried to access my blog between 29 and 31 July. A few issues with what should have been a routine Ghost upgrade that took longer than hoped.

## Creating an Azure Function

Much of what I followed was from the [insightful series of blog posts](http://www.sharepointnutsandbolts.com/2017/04/calling-azure-function-from-sharepoint.html) from [Chris O'Brien](https://twitter.com/ChrisO_Brien), particularly the details on holding your code in Github and have that sync up to Azure.

There are three extensions that I would take for this:

## ## #1 - Run functions locally

Azure has made [more capabilities](https://docs.microsoft.com/en-us/azure/azure-functions/functions-run-local) on this and you can now work on the function locally before deploying up to Azure. This makes it far faster to work on.

## ## #2 - Update the function directly

The code in the portal itself becomes read-only when you use Github (or another source control tool like Visual Studio Online) to sync but you can change this to read-write. This means you can quickly update the code during development - not the best practice but hugely useful. I found this even more useful when running PowerShell scripts as Azure Functions, opening up to IT Pros as well as developers.

## ## #3 - Use a subfolder in Github
Another useful change I found was that you can hold your Azure Function in a subfolder in Github so that you can have other applications in your repository as well, e.g. the SPFX webpart.

To do this, add a key called PROJECT to the Azure Function app settings and provide this with the Folder name or path.

![Azure Function PROJECT App Setting](/images/2017/08/Azure-Function-PROJECT-App-setting.JPG)

## ## Quick note on pricing

Using Azure Functions may put off a lot of people with the thought of having to purchase additional resources. The beauty of using Azure Functions is that they are very low cost. In fact, the first 400,000 GB/s of execution and 1,000,000 executions are free at the moment. You can view more details on the pricing at https://azure.microsoft.com/en-gb/pricing/calculator/ but for all but the highest usages, it will be a low cost solution.

## Adding some image searching

I had a few options for doing the searching but having had experience with using the [Azure Cognitive Services](https://azure.microsoft.com/en-gb/services/cognitive-services/), I chose to start with the [Bing Image Search](https://docs.microsoft.com/en-gb/azure/cognitive-services/bing-image-search/search-the-web). In the future, I plan to give the option to search Google and Flickr as well. 

The code to search Bing is relatively short. It uses HttpClient to pass the API key in the header and all the other details as query parameters:

` var client = new HttpClient();
// Request headers  
client.DefaultRequestHeaders.Add("Ocp-Apim-Subscription-Key", "");// put your //key here
      var queryStringText = "";
      queryStringText += "q=" + query;
      queryStringText += "&license=Share";`

If you are using the code in Github, you will need to set the key at this line. There are further options for filtering the images which are currently commented out in the code but will be included soon to add more options:

`/*
      aspectΓÇöFilter images by aspect ratio (for example, standard or wide screen images)
colorΓÇöFilter images by dominant color or black and white
freshnessΓÇöFilter images by age (for example, images discovered by Bing in the past week)
height, widthΓÇöFilter images by width and height
imageContentΓÇöFilter images by content (for example, images that show only a person's face)
imageTypeΓÇöFilter images by type (for example, clip art, animated GIFs, or transparent backgrounds)
licenseΓÇöFilter images by the type of license associated with the site
sizeΓÇöFilter images by size, such as small images up to 200x200 pixels
 */`


Next steps (for the next blog) were to use this function in a SharePoint Framework Web Part.

