---
layout: post
title: An Advent series - Knowing when you’re not doing things the right way and being okay with that
date: '2018-12-17 06:00:00'
content_img_path: 'images/2018/12/swing.jpg'
comments: false
author: "Kevin McDonnell"
future: true
tags:
- Thoughts
---

The other day, I was doing a deployment to Azure Functions and I sat there and knowingly clicked right click and publish. I had a CI/CD Pipeline on Azure Dev Ops but I still did a right click publish. Now this isn't the right thing to do. This doesn't check that it works on other machines, this doesn't log it with release comments and it doesn't run automated tests. But I knew this was all ok. I knew it wasn't the completely right thing to do but I was ok with that. Does that make me a bad person?

## Let's take a trip back in time

![Time warp](/images/2018/12/timewarp.jpg)

A little bit of history about myself. I started working in an investment bank in the UK on the technology side on a graduate programme. From day one, it was all about getting stuff done, it was all about keeping the traders happy, keeping them making money. I was learning new technologies but just enough to be useful. It was not necessarily about making sustainable code the majority of the time, it was about getting it done quickly. There was a real hero culture with people working long hours just to keep things running. The louder voices that supported the main users were the big winnders. And this is how I started off.

After a couple of years, I had the opportunity to work in Singapore for the same company. I had never been obsessed with back-packing but wanted to see a new place from the inside so this was perfect. It also introduced me to a new way of doing development. Working with more people who had come through formal training in school on development techniques rather than many self-taught people, there was more of a focus on doing things the right way. There was also the massive benefit of a timezone gap that meant the majority of users in the UK were not really online until around three in the afternoon, meaning that the morning's were less pressured and time was spent working on the code. This was the early 21st century and so agile techniques were really starting to take off, even if not understood by the management teams (especially the Project Management Office) but it meant exploring different ways of gathering requirements and tracking work done.

I also started to introduce unit testing to my code, something I hadn't really heard of before. I pushed for the extra time to have automated tests instead of the more usual iterative hit and hope that I had done before. This made me think more about the repeatability of my code and reducing code complexity, improving my code to be more testable with interfaces and learning about Dependency Injection.

This wasn't just a coding lesson though. I started to see the benefit over the long term of doing things the right way. When I spent more time on work and made sure it all worked from the start, there was less of a need for long nights working out problems. Having regular daily calls with the users to ensure that we were meeting the right requirements was very different to the long phases of projects that we had done before. I thought about documenting as part of my code and learnt about the benefits of Behaviour Driven Development where users (or at least product owners) could understand the tests we were writing through well named code, helping ensure that we had understood the requirements.

![Flying back from Singapore](018/12/jumbojet.jpg)

## Applying my learnings

A few years later when I moved back to the UK and there was once again the pressure to just get things done. However, it was different now. I had the knowledge on what was the right thing to do. I knew about having unit tests with more than 90% coverage and automated UI tests. I knew that we should have a daily stand-up meeting and run regular retrospectives to make sure that all voices were heard and we continuously improved. So I made sure I continued doing all this?

No, is the simple answer. The difference was that now I could make an informed decision. I did make sure that I had unit tests but there may only have been 60% or so coverage. We made sure that we got things done and when projects were larger than a few people, we had daily stand ups and tracked as user stories. But the retrospectives would often only happen once a quarter if at all. I would sometimes copy code directly in to Production if it needed a quick fix. There are definitely times I wish I hadn't but it all helped me get the right balance.

As I moved further in to the world of SharePoint, the same logic applied. I worked hard to know the right of doing things (i.e. never use SharePoint Designer) but if there was a genuine requirement to have a fully customised page to meet a need for the business, I would take that step. I knew enough to document it well and know that it would be painful later when we had to migrate but it was an informed decision.

## TL;DR

Make sure you know enough about how to do the right things so that you also know enough about when to do the wrong things. Know what the consequences are and be prepared to take a known risk. Balance the devil and the angel on your shoulders with facts, not just a reckless push to get things done.

![Angel and devils are waiting to chat](018/12/devilangelducks.jpg)