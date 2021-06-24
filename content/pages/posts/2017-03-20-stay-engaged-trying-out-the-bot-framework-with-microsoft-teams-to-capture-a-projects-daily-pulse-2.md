---
layout: post
title: Stay engaged - trying out the Bot Framework with Microsoft Teams to capture
  a project's daily pulse
date: '2017-03-20 23:43:39'
tags:
- digital workplace
- bots
---

Microsoft Teams has brought a new way for Office 365 users to collaborate together and stay productive as a team. As I said in my last post, it also brings together multiple areas to connect different services together. One of the more interesting aspects is the integration with the Bot Framework and how this can be used to bring forward what Microsoft has been calling "Conversation as a Service". The change this brings about is the ease of use of different services through natural interaction in a single place. People can chat to a bot in their Teams channel to either update a client in Salesforce or query a set of knowledgebases to answer a question.

First though, I needed something for the bot to write to and so I picked up on a good idea suggested to me last year - Project Pulse.

#### The Project Pulse app

When a project is running, it is useful to know how the team and key stakeholders are feeling on a regular basis. This is often done with status reports but it would be great if you could quickly capture the "pulse" of a project. Hence, Project Pulse.

The app is created using the SharePoint Framework and uses Node JS. You can view the full source code at https://github.com/kevmcdonk/Mcd79ProjectPulse. It shows a set of emojis that are easy to click on and submit your feeling for the day. 

![Capture the pulse](/images/2017/12/Project-Pulse-view-1.PNG)

Once submitted, it will show the average temperature for the day from everyone who has submitted.

![Show the temperature](/images/2017/12/Project-Pulse-view-2.PNG)

The app was built up using much of the great documentation available around the framework starting from https://dev.office.com/sharepoint. The differing parts were how to create the SharePoint list including Content Types and Site Fields - how to do this came from https://dev.office.com/sharepoint/docs/spfx/toolchain/provision-sharepoint-assets but I also found that using the standard Visual Studio 2015 SharePoint template allowed an easier creation of the schema needed.

Once I had a working solution, testing it in my local workbench and then deployed to my tenant's workbench, I took a look at how to host the files correctly. I debated these being deployed in to SharePoint as part of the solution but the more sustainable way that reduced duplication was to use the Office 365 CDN that is in preview. I found that Waldek Mastykarz's great blog had a post that covered how to set this up. I created a new site collection called CDN and placed a folder in Site Assets for my files. During testing, I used the direct link to this folder rather than the CDN link as it took time for files in the CDN to update.

There are more improvements to be added such as better checking for whether the person has already submitted a pulse, more views to show the longer term temperature and the ability to customise further the different emotions (not everyone is a fan of Meh...)

####Adding a bot

The next step was to work out how a bot could be used for this. I kept this very simple and decided that the bot could be used to submit the pulses. With Microsoft Teams now, you can add a new bot to a channel and @ mention it to interact.

The code for this is all available at https://github.com/kevmcdonk/Mcd79ProjectPulseBot. 

![Bot on a Team channel](/images/2017/12/Teams-bot.PNG)

Many of the steps to follow are outlined in the main Bot Framework documentation. I decided to create a Node JS bot and so followed https://docs.botframework.com/en-us/node/builder/overview/#navtitle. I downloaded the Bot emulator and within half an hour, had a Bot that replied to a specific message. I next followed the links in the documentation to deploy to Azure and had a working Bot published. The next step was to sideload this Bot into one of my Teams channels and I had a Bot I could interact with from the Teams app. Easy so far!

I wanted to make the interaction process as natural as possible so I introduced LUIS. For those who don't know, [LUIS](https://www.microsoft.com/cognitive-services/en-us/luis-api/documentation/home) is not a friendly developer who could help me out but part of the [Cognitive Services stack](https://www.microsoft.com/cognitive-services) from Microsoft that allows your Bot to better understand natural language. It works by working out what your intent is for your conversation and pulls out the different entities from the text. For example, my main intent was to add a pulse and the entity defined was the type of Pulse, i.e. Happy, Meh or Sad.

The hardest part with the LUIS integration was identifying how to do this from the samples. Many of them worked using the IntentDialogs but I found that a Dialog with a TriggerAction at the end worked best for me. The standard samples at https://github.com/Microsoft/BotBuilder/tree/master/Node/examples often referenced only the inbuilt entities rather than custom created ones.

Finally, I wanted to be able to write back to SharePoint so needed to have Office 365 authentication. For this, I was helped by a [great blog](http://thecollaborationcorner.com/2017/01/25/search-for-your-sharepoint-content-from-a-bot-using-the-bot-framework-oauth2-and-node-js/#.WMl7lTvyjic) by Frank Cornu which talked through much of this process. It suggests using adal-npm and setting up an Azure AD application. As you can see from the image above, the first time you speak to the Bot, it asks you to login and then allows you to submit a pulse.

I have since found that with the Bot in Teams, it does currently ask for you to login for each conversation. If you reply to a comment, it retains the token but loses it within a new conversation. This leads me on to some of the other areas where I'd like to build on. It would be good to be able to ask what the temperature of any specific day is within the Bot and also to reduce the need for the authentication to speed up submitting the thoughts. This could then expand in to being an overall project tracking Bot to capture items for the daily stand-up as well as the daily pulse.

####Summary

It was very simple to pull together a simple Bot that is usable and useful. There will be many other scenarios that could be used for simple ideas like this and I hope that the code acts as a useful guide for others.

I am interested to see how well this scales for larger Bots dealing with more scenarios but think that the majority of situations will be better handled by more single-minded Bots with a directory to help answer your questions on which Bot to use when. There will certainly be a lot of continuous improvements needed for any developed Bots and people should prepare for this. Reviewing the analytics of what people are asking will be key and LUIS is well set-up to capture these details. If people often ask for the same thing, you can set up new intents and entities to cater for it, e.g. if lots of people submit an angry pulse then a new pulse should get added.

I would love to hear from you on your experience with creating Teams Bots and any ideas for taking the Project Pulse Bot forward.

*With thanks to Betsy Weber for the Robot Heart image - https://www.flickr.com/photos/betsyweber/16375995051* 

 

