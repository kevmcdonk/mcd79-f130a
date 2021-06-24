---
layout: post
title: Knowledge Management Series - Introduction to SharePoint Syntex
date: '2020-09-26 18:00:00'
content_img_path: 'images/2020/09/SortingRecords.jpg'
comments: false
published: true
author: 'Kevin McDonnell'
tags:
- Digital Workplace
- Knowledge Management
---
With Microsoft Ignite 2020 (Sep 22-24) came more Knowledge Management news and the biggest one of these (at least as far as most people were concerned) was the first widely available service from Project Cortex. Rather than release one big service to organisations, Microsoft has listened to feedback and will be releasing different services under the Project Cortex banner and from October 1, you will be able to add SharePoint Syntex to your E3 and E5 licenses - but what is it?

> This is part five of the Knowledge Management series. For other parts, see links below:
<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< master
> * [Part One - Introduction](/2020-09-03-Knowledge-Management-Series.html)
> * [Part Two - Considering where knowledge is stored](/2020-09-10-Knowledge-Management-Series-Considering-where-knowledge-is-stored.html)
> * [Part Three - Organising knowledge](/2020-09-14-Knowledge-Management-Series-Organising-knowledge.html)
> * [Part Four - Creating a culture of knowledge](/2020-09-17-Knowledge-Management-Series-Creating-a-culture-of-knowledge.html)
========================================================================
> * [Part One - Introduction](/2020/09/03/Knowledge-Management-Series.html)
> * [Part Two - Considering where knowledge is stored](/2020/09/10/Knowledge-Management-Series-Considering-where-knowledge-is-stored.html)
> * [Part Three - Organising knowledge](/2020/09/14/Knowledge-Management-Organising-Knowledge.html)
> * [Part Four - Creating a culture of knowledge](/2020/09/17/Knowledge-Management-Series-Creating-a-culture-of-knowledge.html)
>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> dev

## What is SharePoint Syntex?
After the hints and suggestions around [Project Cortex](https://aka.ms/ProjectCortex), at [Ignite](https://myignite.microsoft.com) there was details on what people would actually be able to do. [Jeff Teper](https://www.twitter.com/jeffteper) announced that it wouldn't just be about the single service but people would be able to pick the services that they wanted and the first available would be SharePoint Syntex, from October 1. This first service would be focused on automating the process of getting your metadata out of your SharePoint content using [Machine Teaching](https://blogs.microsoft.com/ai/machine-teaching/). This is slightly difference to machine learning in that you can gather intelligence using a smaller set than you would use in machine learning and use experts to provide guidance, reducing the size of initial data set that would be required.

Syntex is suggested as being used in three areas:
- Content Understanding - extracting metadata from documents and setting classification automatically
- Content Processing - categorise content and build in to automated processes
- Content Governance - manage to content to apply appropriate security and governance

Using a set of models, you can teach Syntex how to process different types of documents to automatically extract the metadata in three key ways (more on these later in this post):
- Document understanding - recognise patterns in documents such as resumes, statements of work and contracts to extract key info
- Form processing - using AI Builder, extracting information from images and other document forms that are structured or semi-structured such as printed contracts or feedback forms
- Digital image processing - automatic tagging of images by recognising the content and extracting handwritten content from images

Syntex also appears to be wrapping in some of the Microsoft Search capabilities with Graph Connectors so that you can pull content outside of SharePoint and OneDrive into this as well. For larger organisations who have invested in other ways to store their knowledge such as ServiceNow or even MediaWiki. From what I can tell at this stage, this means that you don't need to first mgirate your content into SharePoint/OneDrive to get your metadata, you can also connect it at source which fits with my earlier post of finding [where knowledge is stored](/2020-09-10-Knowledge-Management-Series-Considering-where-knowledge-is-stored.html) and [organising that knowledge](/2020-09-14-Knowledge-Management-Series-Organising-knowledge.html) without having to move it.

The final area is for me one of the most interesting and that is the extension to the recent Content Services in SharePoint that will allow administrators to see how the metadata is being used. This has been an area lacking in SharePoint for a long time with Administrators spending plenty of time structuring their metadata but having no idea if it was being used in the right way without using a third party tool or some heavy scripting. Making this available and consumable will open up a far more analytically driven management of the metadata and understanding the depth to which people are assigning content. For example, do people tag content with HR or Human Resources as a department, do they just tag everything as Public rather than Internal or Confidential, etc. It will also look at widely used Enterprise Keywords (an open set of metadata with little governance) to see commonly used terms that probably should move to a more governed set of metadata. This will also include management of Content Types to Hub Sites to help push out standard content types more easily - I truly hope that this works better than the current Content Type Hub! 

## Document Understanding
There are several third party tools that have added capabilities for tagging metadata available but this is the first from Microsoft. Some of those tools have used Azure and the AI capabilities in Cognitive Services but not Microsoft has wrapped these up into their own tools. The Document Understanding allows licensed users to take a sample set of documents and process them by:
- Identifying a Content Type to hold the metadata
- Teach the model what should match this Content Type using at least five different documents
- Train the model to extract entities using phrases, positions and others
- Match the model to labels
- Assign to Content Type Hubs

You can watch a great [Click through demo](https://aka.ms/SharePointSyntex/demo) of this which gives an idea of how it works. I was lucky enough to see an early preview of this late last year and at the time, felt that it was a little hard to just get going with it - it felt like it would involve a lot of training to get started. However, Microsoft have really learnt from the early previews and this demo shows that it is easy to pick up common patterns. I look forward to being able to trying this out with some real content like our requirements docs and statements of work that can make it easier to match the content. Imagine being able to load all your project definitions into one place and then have the document be tagged with the Project Name, department and key stakeholders so that it shows up in the project site, department site and makes it easy for stakeholders to see all their definitions. It could even track common themes in the project so you could see all Finance projects, C# projects, customer projects, etc in one place. The models created can be re-used as well and published to other libraries as well so they can be duplicated across areas for common patterns.

![Syntex Extractor Example](020/09/SyntexExtractorExample.jpg)

## Form Processing

For those who follow the Power Platform, you will likely already know about AI Builder and what could be done to process images of forms and cards to extract entities automatically. I have even used this with my son in a Power App to take photos of Pokemon cards and extract all the stats for each. This logic could be used to process tickets or physical ID cards quickly and easily. This has been integrated into SharePoint for a while but had multiple hoops with licensing and connecting to metadata. With Syntex, this can now all be done for you in one go. It will be interesting to see how much this gets above the standard AI Builder over time.

![Form Processor Example](020/09/FormProcessorExample.jpg)

## Digital Image Processing

Similar to Form Processing, this seems to be similar to functionality to what is already available. Text and handwriting are extracted from image files and indexed already and you can get a recommended alt text for uploaded photos. Syntex takes this further in that you can set your own fields with these values and get more control over how it is used.

## What is new?

There were certainly some people who were disappointed with Syntex, hoping for more to be announced around the knowledge hubs and new information as well. I personally think we'll see those pretty soon and certainly before the end of the year but let me quickly what I cover exactly what is new:

- Document understanding really builds on the Azure Cognitive Services to make it easy to apply models - yes, you could develop your own in Azure but this makes it easy for end users to understand and use.
- Compliance and security are closely linked in to all of this so you can add more intelligence to your labelling processes.
- Bringing it all together into one place and integrating the services, making it easier to get less technical users to make the most of the services available.
- Analytics on how the content is actually being used, allowing people to act on real data not just hunches.

You can read more about the details in the [announcement blog](https://techcommunity.microsoft.com/t5/project-cortex-blog/announcing-sharepoint-syntex/ba-p/1681139) on SharePoint Syntex.

Will these new capabilities and ease of use for existing services be worthwhile? Much will depend on the final details on the licensing to be announced on October 1. Microsoft have said that Syntex will be an add-on to [E3/E5 licenses](https://www.microsoft.com/en-us/microsoft-365/compare-microsoft-365-enterprise-plans) but I have not yet seen how many license you will need, i.e. will it require everyone in an organisation to be licensed or just those creating models? October will reveal all but I would hope that it will just be a smaller subset of power users who need to be licensed. How much? [ZDNet think](https://www.zdnet.com/article/microsoft-launches-sharepoint-syntex-to-automate-content-categorization-and-build-a-foundation-for-knowledge-curation/) that it will be $5 per user per month which I think sounds a great amount for those power users to set content. If it's for all who view the content then that could be a harder sell to most organisations.

## What is next?

We have [already been told](https://techcommunity.microsoft.com/t5/project-cortex-blog/announcing-sharepoint-syntex/ba-p/1681139) that this is the first service in Project Cortex and that more will be generally available by the end of the year but what will those other services be? There have been details of Knowledge Hub sites that act as a landing page for knowledge on specific entities such as projects in an organisation as can be seen in [this demo](https://demobuilderwebcpptxz.blob.core.windows.net/microsoft-365-knowledge-sharing/startdemo.html?ot=false&lan=&guidemodeenabled=false&audioenabled=false). In addition, Project Cortex has talked about having knowledge experts who will be able to define specific knowledge on top of the automatically tagged info. There is also many comments about Cortex being the join of People and AI to ensure that it is useful and relevant to what people need.

I would like to see more around the use of Bots to surface Knowledge automatically to people that is relevant at the right time and based on what they are doing, especially with a greater integration to Microsoft Teams which is now the hub for most people doing work. It would also be interesting to see whether taxonomies can start to be recommended rather than just being defined by experts up front.

What is coming on October 1 looks very useful and the positioning of a set of services feels like a great approach to open this up to more people. I'll confess to being slightly disappointed that more wasn't released yet but will hold on to that for the end of the year!

Photo courtesy of [Edu Grande](https://unsplash.com/@edgr) via [Unsplash](https://unsplash.com)
