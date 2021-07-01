---
layout: post
title: Finally Yammer allows you to edit a post but why did it take so long?
date: '2017-04-13 21:36:32'
---

####Some thoughts on platform change and how we should think about it####

There was a great piece of news today with [the announcement that Yammer now allows editing of existing posts](https://techcommunity.microsoft.com/t5/Yammer-Blog/Edit-Post-is-Here/ba-p/61461). You will be able to see that posts have been edited and the history of changes are shown. What is great about this announcement is that it was announced through a small post on the community site and echoed on the Yammer Twitter account - not through massive announcements. 

####But, if it was that small a thing, why has it taken so long?####

While involved in a recent plan to roll-out Yammer, there was a lot of discussion about the ability to edit posts. Small typos still wind up a lot of people and there are times that your first post just doesn't quite meet what you are really trying to say. This was certainly a big topic so you would think that the Yammer team would get everyone on it and make it happen. That's all it needs right?

This is where some experience with development helps to understand why things take longer than others. Platforms like Yammer are geared up to huge volumes of data that changes on a regular basis. Setting data up to be written and then read allows it to be performant and quick to consume, with filtering and sorting all in place. If you allow that content to be edited, the performance of accessing that content plummets as well.

So now something that feels like a simple change suddenly has a potential impact to the entire performance. Of a cloud platform. Used by tens of thousands of people. And they depend on it.
![Bad idea](http://funny-pictures-blog.com/wp-content/uploads/2013/12/Bad-idea_3.jpg)

Instead, there will have been hours of unit and automated testing followed up by beta testing and pilots. This is where the Dev Ops practices that have been talked about really kick in. The modern ways of working that the cloud espouse allow for changes to be made and tested effectively but that isn't all that is required. No amount of automated testing can stop a hard to use user experience so there also has to be real world usage of it as well.

####Why does it matter to me?####

There are different streams to how these thoughts could impact you.

![User](/images/2017/04/Photo-Android-Smartphone-Phone-User-Instagram-634069-1.jpg)

**You're a passionate user of these platforms** - you want to see change happen fast but you need it to be reliable. You won't know whether a nosql database that doesn't need re-indexing into bla bla bla or not. You just want to be able to share content with your connections and build relationships. And it should work all the time. 

What you should do though is keep talking with the product teams and their connections. Tell people what it is that you want to see and help them realise the importance of things like editing. Sign up for the [User Voice](https://yammer.uservoice.com/) and fill out those surveys that are sent round. When there is some A/B testing, feedback that you like or don't like it with some constructive thoughts. Finally, be nice! There are rare times that people do things just to wind people up.

![IT Pro](/images/2017/04/laptop-1.jpeg)

**You're an IT Pro managing one of these platforms** - aka the one stuck in the middle. You have to deal with the changes taking place and take the flack when people don't like it. People don't listen to what you think whether it's on your changes or why it takes so long and you always get blamed. So what should you do about it?

Make sure that you have all the latest information at your fingertips and point people towards those references. Not everyone likes what they hear but make sure that they know what is planned and this eases any pain. In the other direction, make sure that you help to pass on feedback as to what has and hasn't worked and what is really being demanded. 

![Developer](/images/2017/04/7643288084_09053952da_b-1.jpg)

**You're a developer** - you spent hours on a great bit of code that improves the performance, is fully unit tested, has automated UI tests to ensure it stays working and was delivered ahead of plan. It's delivered and nothing is heard. The next change is a font colour change and Twitter is raving about the improvements. It's a hard life.

What can you do? Keep on doing things as you are. Changes will continue working well with the right level of testing and people will never be happy. One of my favourite stories from Worse Than Failure is the [speed-up loop](http://thedailywtf.com/articles/The-Speedup-Loop). Sometimes, the hard but important work is also the most invisible to give the value. I still believe in the transparency of agile but it does need to be tied up with a pretty bow occasionally!

*UPDATE* - Yammer kindly [tweeted me](https://twitter.com/Yammer/status/852643424130007040) with a great post about what it took to apply editing to posts. [Interesting read](https://techcommunity.microsoft.com/t5/Yammer/Why-is-Editing-Messages-So-Complex/td-p/28340) on the details.
