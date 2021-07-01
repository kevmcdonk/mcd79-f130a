---
layout: post
title: An Advent series - What has changed in the Bot Framework
date: '2018-12-11 06:00:00'
content_img_path: 'images/2018/12/light-bulb.jpg'
comments: false
author: "Kevin McDonnell"
tags:
- digital workplace
- technical
- azure
- bots
---

I have [talked about using the Bot Framework to create Bots on my blog](/tag/bots) previously and think it's a great solution for creating code that works across multiple channels with minimal extra effort. Microsoft has continued to build on its platform by looking at the earlier complexities while retaining the ability to work across the channels.

V4 was made [generally available](https://azure.microsoft.com/en-gb/updates/microsoft-bot-framework-v4-sdk-is-now-generally-available/) in September 2018 and it has been a major difference to V3. [Stefan Bisser](https://twitter.com/cloudguy_pro) has a great slide showing a breakdown of the elements the build up the Bot Framework. The patterns and concepts layer is where the big changes are, improving the ability to modularise the dialogs (i.e. groups of conversations) and middleware such as connections to [Language Understanding service (LUIS)](https://www.luis.ai) and other Azure Services. 

![Bot Framework V4 breakdown](/images/2018/12/BotFrameworkV4.jpg)

If you have used earlier versions, you will find v4 a big leap and a very different way of working. The focus on Dialogs has shifted and the use of DialogContainers has made it simpler to group expected conversations together. The use of State has been simplified and more samples for saving state using Azure Storage and Cosmos DB made more prominent.

One thing I found very interesting was the ability to create a Dispatch to wrap around multiple instances of [LUIS](https://www.luis.ai) and the [QnAMaker](https://www.qnamaker.ai/) that will route to the appropriate service based on the responses received. This reduces the amount of custom code and helps simplify how it appears there, something I have found a struggle in the past. The downside is that setting up the Dispatch is too complex with slightly random command lines needed to be run to merge Luis intents with the QnAMaker. The idea is solid but there is more that can be done with the implementation.

If you are looking to get started with a brand new bot, the Bot Framework Blog has a great post:

https://blog.botframework.com/2018/05/07/build-a-microsoft-bot-framework-bot-with-the-bot-builder-sdk-v4/

And there are some very useful samples around Bot-Builder:
https://github.com/Microsoft/BotBuilder-Samples

Sadly, I have not found much in the way of guidance on migrating Bots to V4 and my experience so far has been to review what your Bot is doing and re-write it, rather than update in place. The ways of constructing your Bot can gain so many benefits in the new format that it is worth the pain.

Finally, a shout out to the [Bot Builder Community](https://github.com/botbuildercommunity) for all the work they are doing and making available to fill in some of the gaps in the Bot Framework.