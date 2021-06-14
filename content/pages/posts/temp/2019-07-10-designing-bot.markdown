---
layout: post
title: Designing a Bot - Bot Series Part 3
date: '2019-07-11 06:00:00'
feature_image: '/assets/images/2019/07/designer.jpg'
comments: false
published: true
author: "Kevin McDonnell"
tags:
- Bots
---

Stepping away from the Daily Bing Challenge Bot [overview](/2019/07/06/daily-bing-challenge-bot.html) and [setup](/2019/07/09/installing-daily-bing-challenge-bot-copy.html), this post covers the processes to go through when designing a Bot. This won't be too much of a technical post as it is targetted at the analysis side of the solution but will point towards where you can find out more about the Bot Framework elements themselves.

For this blog, I will use the example of a Bot to work with Microsoft Project Server, something that is of big interest for [CPS](https://www.cps.co.uk). It is intended to make some of the more tedious tasks a little easier.


## Getting started

The first steps are to work out what you want your Bot to do. That may sound like an obvious thing but the range of things you can do with a blog is huge so getting down on paper what the aims are is key. Start with which user types you think will be involved, then move on to the sort of tasks they will do, focus on a few of those and map out the journeys that those tasks will take.

First, let's think about the key groups of users. As with many application designs, my initial design was using OneNote as a whiteboard so I have taken those sketches here.

![Bot Design User roles](/assets/images/2019/07/Bot Design User Roles.png)

The roles shown cover the three main groups that would be using Project Server at a basic level. What sort of tasks would they do?

![Bot Design Tasks](/assets/images/2019/07/Bot Design Tasks.png)

Chatting through the different options with a CPS colleague, we thought through the more tedious tasks that there are and what would be useful. Project Managers and the PMO often live in Project and Project Server so wouldn't get too much benefit but team members are far less likely to be in there. Having responses in Teams means that they will be in the tool they live in more often so the focus should be on asking for and providing status updates.

We also use Project Server to determine where staff are as they are allocated to projects and so you know where they will be. This can also be important for knowing where you are meant to be too.

Once we had a list of all the tasks, it was important to pick a few tasks to focus on initially to get an MVP.

![Bot Design Tasks MVP](/assets/images/2019/07/Bot Design Tasks MVP.png)

## Creating a user journey

Given these initial tasks, we talked through what the journey would be for the user. How they would start, the questions they would be asked, the expected responses and the completion part. Some of these would take multiple paths but others would be more basic.

![Bot Design DPU journey](/assets/images/2019/07/Bot Design DPU journey.png)

![Bot Design DPU assignments](/assets/images/2019/07/Bot Design DPU assignments.png)

![Bot Design DPU chase updates](/assets/images/2019/07/Bot Design DPU chase updates.png)

## Designing the bot structure

We have a good idea on how things should flow as an app now. How should we think about that as a Bot? The key is to think about the blocks of chat which are known in the Bot Framework as a dialogue. Each of the journeys above could be thought of as a dialogue. You would want all in the same Bot but need a way of transferring between those conversations.

The main dialogue will be the entry point to the Bot, the start of the overall conversation. This should be like the centre point of the mind map above and needs to know what the initial aim of the user is. There is a great service in Azure which can help this called [Luis (Language Understanding Intelligent Service)](https://azure.microsoft.com/en-us/services/cognitive-services/language-understanding-intelligent-service/). Within this service, you can define a set of intents i.e. buckets that you would like the conversation to move in to. For each of these intents, you can create some phrases that the user might type and then the AI built in to the service will expand on these. 

If each of our journeys above becomes an intent then the phrases could be:

	- Chase timesheets for all staff
	- Chase overdue tasks for project Phoenix
	- Where will I be on 15 March
	- Can I provide my DPU

Each of these will be analysed and the objects extracted (e.g. Timesheets or the project name) and the details then passed on to the dialogue for each journey.

![Chatting](/assets/images/2019/07/chatting.jpg)
## Designing a dialogue

The dialogues work exactly like the flows above. Either a question is asked to start the dialogue or it receives the details from the main dialogue via Luis. The Bot will react to the responses as they are due, retrieving data from other services like Project Server as required. Once the Flow has finished, the dialogue is ended and the conversation returned to the main conversation.

The dialogues could be treated like a screen or set of screens in a traditional application where you consider which buttons the user will press and what text they will enter. If you consider the UI to be like a wizard then the Bot fits that design well.

So that's pretty simple, right? Mostly, yes, it is but where the complication can appear is all the exceptions to that simple flow. With a standard UI, it is easy to add a close or cancel button that will always be there. With a Bot, you need to ensure you consider these and build them in to the code.

For example, in the Whereabouts example, what if they decide to change the day halfway through? Or if they disagree with the assignments there? Or perhaps just want to have a general update not related to a specific assignment. You may say that they can't do these things but you need to design the Bot to make sure they don't try. Otherwise you end up with someone's daily update saved as "No, I don't want to bloody provide an update on that ridiculous project, give me MY project" or something similar. People are inclined to write sillier stuff in response to an automated Bot than they might in a standard UI due to the chatty nature so it is something to be aware of.

## Managing state

One other thing to consider is that people do not always reply straight away. Especially in the case of the chase task update dialogue, people are likely to come back to it later and your Bot will need to consider that. 

The Bot Framework manages this through the [state providers](https://docs.microsoft.com/en-us/azure/bot-service/bot-builder-concept-state?view=azure-bot-service-4.0) for the dialogue. By default, this is held in memory but this should be changed for live use to be held in something like Table Storage or Cosmos DB. This will then held the current state of the conversation indefinitely.

However, there can still be some confusion when you have a Teams Bot with multiple people replying, with some replying within the thread and some creating a new thread. These can have different impacts and so you need to think of the inputs that are possible at each of these states and what to do if the user replies with something you are not expecting.

![Adaptive cards](/assets/images/2019/07/Bot design adaptive cards.png)

## Adding a little UI

While the focus is on text based responses, you can also make use of adaptive cards within your Bot that are supported by most of the end channels. This allows you to return images and elements of structured text as well as introducing buttons that can guide the user to a response. It may not always be appropriate to use adaptive cards as they are larger and so can fill the screen and hide the bulk of the conversation. However, they add some elegance and uniqueness to the user as well as adding additional guidance to the responses that can be made.

## Wrap-up

To summarise the steps from above, the key is to treat the design in a similar way to a standard application with your user roles, journeys and similar screen design. Where things differ is that you need to consider a lot more about how the user may step away from the standard journey. You need to build in ways for them to exit this journey when required and make it obvious to the user how that can be done. 

Make use of cards where appropriate to help with the user guidance and bring a little bit of a visual element to the mostly text based interface. remember that these are often called chat bots so be prepared to design responses in a chatty way while balancing the risk of becoming increasingly annoying - yes Clippy, I'm thinking of you.


Header Photo by Med Badr Chemmaoui on Unsplash
Chatting Photo by Ben White on Unsplash