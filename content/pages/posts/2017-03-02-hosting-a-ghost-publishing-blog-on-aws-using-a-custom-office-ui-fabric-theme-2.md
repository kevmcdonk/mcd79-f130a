---
layout: post
title: Hosting a Ghost publishing blog on AWS using a custom Office UI Fabric theme
date: '2017-03-02 16:53:51'
tags:
- technical
- aws
- ghost-tag
- fabric-ui
---

Having blogged at work previously, I thought making a decision on where to blog externally would be a nice simple one. My first thoughts were to use a platform to get up and running quickly. I had a [Blogspot](https://www.blogger.com) login from many years back and follow a few people from LinkedIn and Medium but that didn't quite feel right. This will have elements of technical delivery on it so to have a site that can hold that as well as the blog content felt right. I already had my domain which was running my Office 365 domain but the public site on that was due to be decommissioned in March so it was time for a new site.

##How do you host your own blog?

The first thing to decide on was a blog engine. I wanted something easy to host and deploy on a cloud platform. Coming from a C# background, my first thought was to use [BlogEngine](http://www.dotnetblogengine.net) and found that there was an [Azure marketplace entry](https://azuremarketplace.microsoft.com/en-us/marketplace/apps/BlogEngineNET.BlogEngineNET) to get started quickly. With this, I was up and running in about 15 mins and could start creating my content. So did I stick with this?

No. Unfortunately while doing this, I was also watching [Halt and catch fire](http://www.amc.com/shows/halt-and-catch-fire) with Joe MacMillan talking about challenging yourself to be better. I know C# but want to know more about NodeJS so took a look at what engines were available on that. The strongest one that I found was the [Ghost publishing platform](https://ghost.org/) and as well as having a [large marketplace of themes](http://marketplace.ghost.org), it could host html content directly. A quick download from the [developers site](https://ghost.org/developers/) and I was up and running (I already had Node JS and NPM installed).

##Changing the theme

Browsing through the marketplace, I found a few different themes I liked the look of but what I really wanted was to look like an Office 365 blog. I had used the new blog pages from Delve and wanted to retain the look and feel. Having used [Office UI Fabric](https://dev.office.com/fabric), I took this as a basis and built up a similar look to the main Delve blogs. Being new to Ghost, I needed a little kick start to get moving and found that [Raivis Vitols Willow Theme](https://github.com/raivis-vitols/ghost-theme-willow) was a close look to what I wanted and acted as a basis for it.

With some rework, I now had a theme which could be uploaded and you can see the SourceCode at https://github.com/kevmcdonk/GhostFabric.

##Hosting

Next on to where it would be hosted. A blog about Office 365 had to be hosted on Azure, right? That was certainly my first reaction. I had four criteria:

- Easy to deploy
- Could host NodeJS
- Have a custom domain
- Supports SSL

Then the final thing was to be as cheap as possible. 

Azure met all four criteria but to host a web app with SSL and a custom domain was looking at a higher price than I was hoping to pay. Next stop Amazon.

With their [free tier for a year](https://aws.amazon.com/free/), ability to have SSL and custom domains, this certainly felt like the right answer. I had used Azure to set up web apps quite a bit but this was my first proper exploration of AWS. The [GhostForBeginners](https://www.ghostforbeginners.com/) page on [setting up Ghost on AWS ](https://www.ghostforbeginners.com/how-to-setup-an-amazon-ec2-instance-to-host-ghost-for-free/) got a site up on the AWS domain but finding out details around setting up the custom domain and SSL took a lot longer.

To help others get ahead, the first thing to say is that EC2 will only support SSL through a Load Balancer - here's [the post](http://serverfault.com/questions/560552/how-to-forward-godaddy-domain-to-ec2-load-balancer) that gave me the best confirmation of this. I followed [this guide](https://aws.amazon.com/blogs/aws/new-aws-certificate-manager-deploy-ssltls-based-apps-on-aws/) to set up the certificate and then [this post](https://aws.amazon.com/elasticloadbalancing/applicationloadbalancer/getting-started/) to set up the load balancing. I hit a few bumps along the way with my domain provider, mostly due to trying to remember what a A record and CName is but it is also important that you set up with the certificate with *.yourdomain.com AND yourdomain.com (thanks to vercettie in [this post](https://forums.aws.amazon.com/thread.jspa?threadID=226133) for pointing me right there). 

The final step was to set up SMTP and I decided to keep it simple and used GMail. Bitnami's [help page](https://docs.bitnami.com/aws/apps/ghost/#how-to-configure-outbound-email-settings) got me details of the config but I also had to [install and connect with Putty](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/putty.html?icmpid=docs_ec2_console) - make sure you check the bitnami docs to get the correct username.

And that's where it is now. There are a few changes I'd still like to make:

- Add discussions, probably with Disqus
- Improve on the profile pane on the homepage
- Add some navigation for static pages
- Support more profile links and make them dynamic

I'll certainly give AWS a year and then review what the costs would have been after that.

Please do [tweet me](https://twitter.com/kevmcdonk) or contact on LinkedIn if you have any questions or comments.