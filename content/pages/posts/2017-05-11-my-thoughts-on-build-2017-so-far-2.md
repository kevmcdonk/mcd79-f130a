---
layout: post
title: My thoughts on Build 2017 so far
featured: true
date: '2017-05-11 21:49:57'
content_img_path: 'images/2017/05/build-header-1.jpg'
tags:
- digital-workplace
- sharepoint
- bots
- build
---

>"Empower every person and every organisation on the planet to achieve moreΓÇª.most importantly, not just celebrating any platform or technology of ours but celebrating what you can do with that technology to have broad impact." - Satya Nadella, May 2017

Build is Microsoft's annual developer conference which is being held in Seattle as I write. Not everyone who reads this will be a developer so why should you care? Last year, they announced the Bot Framework and talked more about the HoloLens and the possibilities of augmented reality. They also talked about their newly released Cognitive Services and how it gave more access to AI. Looking back at the last 12 months, the growth in AI, bots and augmented reality has been massive. So why should you care about what developers are seeing? Because that is what you will be seeing very soon with 500 million active Windows 10 devices (twice as fast as Windows 8 growth).

## What were the hot topics this year?

Intelligence and Bots are still very hot topics with the fruition of an extra year's worth of innovation showing up, most noticeably with the demo of live translation for PowerPoint presentations - more on this later.

Another big theme is the support for ISVs and others to publish their solutions out for people. There has been a common gripe with many of these new frameworks that they are only catered to developers and it is not easy to get these great solutions out to the people that need them - one of [my thoughts on what would be announced at the SharePoint Virtual Conference](https://www.mcd79.com/here-is-what-i-think-is-going-to-be-announced-for-sharepoint-in-may/) talked exactly about this.

Finally, there is a lot more exposure to the extra set of hubs that Microsoft is putting in place to access all these services. Exposing more products (Microsoft and third party) in Teams and adding more to the Microsoft Graph to power everyone's own interfaces. This further opens up the capabilities that I think should be built for organisation's Digital Workplaces in my [earlier blog](https://www.mcd79.com/why-you-should-build-components-and-connectors-for-your-intranet-not-a-gargangtuan-beast/).

## More AI for all

The keynote had a demonstration of a new app for PowerPoint that automatically translates the speaker to up to 9 different languages. This has come from one of Microsoft's Garage projects and you can [sign up](https://www.microsoft.com/en-us/garage/project-details.aspx?project=translator-ppt) to be one of the early adopters.

While this is amazing, what is more impressive is that this is using the platform of cognitive services and so is something that others could have made - it is not using anything that Microsoft has not made available to others. The capabilities that this could bring are only just being thought of and could open up new ways of working.

#### Bot Framework enhancements

To help build these new ways of workings, Microsoft has opened up more ways of connecting with its Bot Framework.

![New channels for Bot framework](https://blog.botframework.com/images/build2017/3_new_channels.png)

The truly exciting news for enterprises is the Skype for Business bots. Many people I've spoken to have been holding off working with the framework due to its lack of integration and I see this as being a large growth area. The management of these bots will be key to allowing this though with security teams still rightly nervous and devs must learn to see what can be used and what can't - for example, while I am a big fan of [LUIS](https://luis.ai), more information will be needed on where the data that is passed is used and held.

#### LUIS LUIS

Talking of LUIS, Microsoft has extended the number of intents that can be used and also introduced Phrase Lists. These allow a list of entities to be more easily defined and also suggests matching items e.g. a list of cities can suggest additional ones as well.

Enterprises will also appreciate the ability to manage multiple versions of your Luis application, allowing better managed deployments of changes and ability to test those changes. This is also supplemented with the Bot Analytics to see how your bots are being used.

#### Adaptive cards for bot framework

Adaptive cards will increase the UX of bots across multiple channels and reduce the inconsistency that has sometimes been seen with more complex bots.

#### Custom models for cognitive services

The final main part of the intelligence news are the custom models for cognitive services. The initial release of the services opened up a lot of capabilities but if your use case did not meet these, you were left with a far more complex scenario with your own machine learning algorithms. Services such as [custom vision](https://customvision.ai/) have bridged the gap between the two, allowing you to hold your own trained models. Again, this will be of interest to enterprises who may have concerns about wider access to their own materials.

## More places to access your information

There were more announcements around the popular Microsoft Teams with the ability to preview information from third party services without leaving the app.

![Teams previewing info](https://blogs.office.com/wp-content/uploads/2017/05/Office-at-Build-2017-1b.png)

There is also further integration to the newsfeed for third parties and extensions now available in the App Store. This will open up easier access for people for more services.

Interestingly, Jeremy Thake [suggested that Teams will soon become the primary collaboration app for Microsoft ahead of SharePoint](https://twitter.com/jthake/status/862421327688290305) and others certainly feel this as well. My view is that it will become another hub and some people will use this as the main area. However, Comms teams will still want their homepage, Sales people will still be focussed on their CRM and everyone will still have a homepage to land on when they open their browser. Things are changing but larger organisations still have many different ways of people working.

#### Microsoft Graph enhancements - the glue that binds them

What opens this up is the ever improving capabilities of the Microsoft Graph. I mentioned Content As A Service in my [last blog](https://www.mcd79.com/why-you-should-build-components-and-connectors-for-your-intranet-not-a-gargangtuan-beast/) and the news around the general availability of SharePoint Sites in the graph and also the Planner API mean that you can do more with the data in more places. The improved ability to connect to the graph from services like Teams and the Bot Framework using the newly announced MSAL will greatly improve the time taken to develop these services although I have heard mixed voices so far from those who have used it. I certainly found mixed experiences previously, especially when using with the Bot Framework and if it is not smooth for authenticated users, they will quickly find alternatives.

![Graph roadmap](/images/2017/05/Graph-Preview.jpg)

#### Cortana Skills

Cortana is still getting some good airtime and there are now new Skills to help it catch up with Amazon's Alexa. I have not seen many details of these skills yet to compare them but there is a lot to catch up on with Amazon. The difference may be the number of devices available for this and whether people can be encouraged in offices to start chatting to their computer more - something that remains to be seen so far.

## More in Store

While there has been great work with the Teams extensions and the SharePoint Framework, it still takes a lot of work to use these for non-devs. With Teams Apps now available to be submitted to the Office Store and news coming today around SPFX, vendors can start to show off more of what they have been able to do. This will help enhance capabilities as companies stretch the capabilities further. 

#### News for non-devs too

The other news is a store for Flow and PowerApps connectors. The custom story had already been improved but to open up for easy access for others will keep things moving. 


## Great start, can't wait for more on Day 2

There is so much content to digest and I am already hearing information appearing on the SPFX enhancements. This blog has already been delayed by my two week old baby and is being finished one handed while he's fed so time to wrap up for now!

![one handed feed](/images/2017/05/one-handed-feed.JPG)

## Further Reading

https://blogs.office.com/2017/05/10/office-at-build-2017-announcing-new-opportunities-for-developers/

https://azure.microsoft.com/en-us/blog/what-s-new-for-serverless-at-microsoft-build-2017/

https://news.microsoft.com/features/microsoft-aims-empower-every-developer-new-era-intelligent-cloud-intelligent-edge/#4vPUBJrDoDyor7MH.97

https://blog.botframework.com/2017/05/10/Build

At Build, MicrosoftΓÇÖs Vision Of The Future Workplace Looks Both Helpful And Intrusive - Fast Company
https://apple.news/AAjlpbiT7Qvqm9LYG0zgRMA

Insights API in Graph
https://developer.microsoft.com/en-us/graph/docs/api-reference/beta/resources/insights
