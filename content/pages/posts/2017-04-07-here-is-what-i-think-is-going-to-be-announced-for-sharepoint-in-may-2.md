---
layout: post
title: Here is what I think is going to be announced for SharePoint in May
date: '2017-04-07 08:56:18'
tags:
- sharepoint
- predictions
- bots
---

Around this time last year, there were still a few voices talking about the death of SharePoint and its disappearance as a brand, prompting Microsoft to hold a "Future of SharePoint" event. As someone who has worked with it in various forms since 2004, I was not worried that it would vanish but knew that the branding of things was changing. The name of SharePoint has long been a dirty word for enterprises fed up with difficult to use sites, confusing ways of adding images, badly implemented farms and customisations that argued with each other constantly. However, for me, the Future of SharePoint event changed a lot of that and showed that Microsoft wanted to take a new way forward that was simpler, better looking, mobile focussed and extendable but still keeping that name of SharePoint. The bad name that it had in some places was offset by the large number of people who knew it as the go-to place to find information. 

### The SharePoint Virtual Summit
Roll on just over 12 months and Microsoft will run [another online event](https://blogs.office.com/2017/03/21/announcing-the-sharepoint-virtual-summit/) and so we are likely to see more announced for the upcoming year that continues to improve on what has been delivered already- from modern lists and libraries to mobile apps, 25TB site collections to the SharePoint Framework, Team site news to a new landing page for all sites. A lot was promised at last year's event which was delivered and I expect this year's to be exactly the same. But what will it actually include? Here are my thoughts.

### Publishing Pages
The big excitement that came first with the new blog experience and then with the Modern Pages was always offset a little by the lack of publishing and the lack of columns. I loved these new blocks that were more naturally responsive and looked great but knew that many people don't want to have to keep scrolling, especially on desktops where SharePoint is used more. 

The good news is that there is plenty of talk about these changes coming which I take to mean that the engineering team want to make sure they get it right. Wes Hackett (CTO of the fantastic [Add-In365](http://www.addin365.com/) and Mark Kashman both spoke with Jeremy Thake ([Hyperfish](https://www.hyperfish.com) - highly recommend the product and the [podcast](https://blog.hyperfish.com/tagged/podcast)) about these pages and the importance that they will bring. There is still a push from page owners to get plenty of info up front and the modern pages just don't quite cut it for that. 

>- [Getting the most out of Office 365 with Wes Hackett](https://blog.hyperfish.com/getting-the-most-out-of-office-365-with-wes-hackett-hyperfish-podcast-249618d4656f?source=collection_home---4------1-----------)
- [The future of sharepoint's intelligent Intranet with Mark Kashman](https://blog.hyperfish.com/the-future-of-sharepoints-intelligent-intranet-with-microsoft-s-mark-kashman-hyperfish-podcast-63ff208c0a07?source=---------3)

The other side connected to this is to take Team news and extend to the wider org. There are great products out there that allow for this but to have this built in and readily available will improve the ability for people to get used to sharing info. From previous experience, people want a combination of sites that have info for their team or community and another that is for the wider population. Sharing is definitely encouraged but there are still many times when news needs to just be shared to those that are allowed to see it against those that want to. There is also the aim to surface interesting content to wider audiences.

I think that Microsoft will start to make this a little easier but still leave a space for ISVs to provide an enhanced experience where people want that bit more.

### Full page customisations and a JSLink replacement
Despite a large change in the stack of technology used for SharePoint development that developers need to learn, the SharePoint Framework has generally been well received. The ability to use modern techniques and have a model that allows development without a full SharePoint implementation on their local machine has made life a lot easier for devs - for example, I am more than happy to build webparts on my Surface Pro 3 and still do work while on a plane or train with no wi-fi. There are some impressive webparts out there and [great examples from PnP](https://dev.office.com/code-samples#?filters=sharepoint%20framework%20app) on how best to do this in multiple frameworks like React and Vue.

What is missing though is the larger page experience. There is still the need for the wider add-in model but this now feels lacking compared with SPFX. Deploying connected lists and libraries is still painful despite the good work and I expect to see a solution for replacing more solutions with the modern stack.

I also expect this to extend to the ability to integrate customisations with modern lists as well, replacing the older JSLink model that is not yet available. The citizen developer ([discussed by Jeremy Thake recently](https://blog.hyperfish.com/the-future-of-citizen-development-in-sharepoint-with-the-sharepoint-framework-3116a9dc3e9b)) still like to be able to make small tweaks to single lists and JSLink was a way to do this, however painful it could get. I expect to see a much better solution coming that allows people to add things like dashboard icons to a list.

Microsoft have also discussed making it easier to integrate solutions with the Microsoft Graph and I hope to see more of that announced around the event.

### Better story for ISVs to deliver solutions

Alongside the enhanced customisation solutions above, I believe that there will be more opportunity to monetise customisations for ISPs. At the moment, there has been no store for new webparts and so ISVs have had to find different ways to work on these. I expect this to change and make it easier to grab impressive changes. 

Having said that, I hope that it does not kill off the great community work that has taken place with open sourced collections like the [SPFX 40 fantastics available](https://github.com/OlivierCC/spfx-40-fantastics).


### More integration for Flow and PowerApps

I have a love hate relationship with Flow and PowerApps - I absolutely love what they do but often hit weird problems with doing anything beyond the demo level work. The great news is that they are changing all the time and issues like not being able to process JSON that I found from the [European SharePoint Community Hackathon](https://www.sharepointeurope.com/events/espc16-hackathon-results/) were resolved by the time Martin Veen and myself ran a [webinar](https://www.sharepointeurope.com/trump-creating-engaging-powerapp-machine-learning-matter-hours) on this a couple of months ago.

The big chance that will make a difference is to embed these PowerApps in to the browser itself and truly fill what InfoPath can do. Microsoft has been clear that these are not direct replacements for InfoPath and workflows but they can meet all of the needs and more, including a better enhancement process.

### More Bot integration

The release of Microsoft Teams has shown that Microsoft fully intends to be at the forefront of the bot revolution and not just by having the platform in the Bot Framework but built in to their products. There will be more coming with this and SharePoint is a natural place to include bots where you can interact on the home of your shiny new Intranet. The first phase of bots have been more fun and consumer related but Teams has started the flow towards more enterprise focussed bots and SharePoint will likely continue this.

What bots can you expect to see? The Who-Bot (https://www.onmsft.com/news/microsoft-teams-introduces-t-bot-and-who-bot) will be an obvious starter and there will likely be some bots to help people find the right information, building on top of the Microsoft Graph to get people to the right place faster. These will neatly give wider access to the digital workplace through integration with other platforms like Skype for Business and even SMS.


What I would love to see!

These ones I'm not so sure on but would certainly love to see turn up.

- *Better way to move between different tenants* - for those that work on multiple instances, it is very painful to move between different tenants with some services remembering your details and not making it obvious who you are logged in as. Not sure what the solution is but there is definitely the chance for a better experience.
- *Even more integration with the Cognitive Services* - the access to intelligence as a service has opened up more possibilities and ISVs will fill the gap with add-ins if Microsoft doesn't. The ability to add summaries automatically to each of your pages and gauge the sentiment for an organisation from analysis opens up new ways of working and it would be nice to see Microsoft get in there early with these. However, they need to make sure that these can be turned off for enterprises concerned about where this information will go.
- *People to stop asking about whether to use Yammer or Teams or Groups* - this is a real long shot and I saw another email newsletter today talking about this. I hope that people will start using the different services and decide what best meets the need of the organisation rather than focussing on what each of them can do so much.

### What do you think?

I'd love to hear what else you think might be coming and will definitely revisit this after the May event. To keep you entertained during the event itself, keep an ear out for these #buzzwordbingo phrases. There's a huge prize if you can find all of them - my undying admiration of your listening skills.

- Modern experience
- But that's all changed
- Empowering you
- Content editor web part
- Feature solutions
- Leveraging
- We haven't forgotten on-premise
- Salesforce
