---
layout: post
title: Exploring creating SharePoint TeamSites using SiteDesign and the REST API
date: '2018-07-21 09:40:40'
feature_image: '/assets/images/2018/07/painting-911804_1920.jpg'
comments: false
author: "Kevin McDonnell"
tags:
- technical
- flow
- sharepoint
---

I have been recently exploring creating sites with Flow off the back of a list. I'd done this previously with Azure Functions very successfully but wanted to see if Site Scripts and Site Designs could remove that extra step. TLDR? Yes you can!

There are some great posts on creating Site Scripts and Site Designs (see additional links at the bottom of the page) but the basic one on [Microsoft Docs](https://docs.microsoft.com/en-us/sharepoint/dev/declarative-customization/get-started-create-site-design) gets things going pretty quickly.

So how does Flow create the site? Creation of a Team Site using REST does not appear to be that well documented and I couldn't find any examples of creating a site with a site design in one step. This was a little odd so I took a look at what calls the main SharePoint page uses to create a site and the key appeared to be:

` _api/GroupSiteManager/CreateGroupEx `

> Massive caveat here - as these APIs appear to be minimally documented, they may be subject to change at short notice.
> 

There are a few examples of using this out there (try [Googling CreateGroupEx](https://www.google.co.uk/search?q=creategroupex&oq=creategroupex&aqs=chrome..69i57j69i60l4j69i59.2184j0j7&sourceid=chrome&ie=UTF-8)) that allowed you to pass the DisplayName, the Alias, whether it is public and even some that covered classification. However, I couldn't find any that passed anything to set the Site Design ID. Thankfully, Chrome came to the rescue and I found that it was passing the JSON below.

`{
"displayName":"@{triggerBody()?['Title']}",
"alias":"Project-@{triggerBody()?['ID']}",
"isPublic":false,
"optionalParams":{
"Description":"",
"CreationOptions":["implicit_formula_292aa8a00786498a87a5ca52d9f4214a_03dac6d2-3e91-4f43-9163-953ce1bf7616}"]
}
}`

A little bit of time later (and some swearing too...) I realised that the later half of the implicit_formula section was in fact the Guid of the Site Design. Once I had this I was away and running. 

![Returning-Site-Design-List](/assets/images/2018/07/Returning Site Design List.PNG)

I created a Flow that triggered from a SharePoint list containing the list of projects. It first retrieved the list of Site Designs to get the Guid - I could have hardcoded this but wanted to allow it to be more user friendly and retrieved by name, matching what the user would do. It then iterates through the designs until it found the matching one and made the call to CreateGroupEx.

![Create-Project-Site](/assets/images/2018/07/Create Project Site.PNG)

The REST API calls were made using the relatively recent SharePoint activity called "Send an HTTP request to SharePoint" which meant that there was no need to work with any tokens or credentials.

There are still many cases where you would need some additional scripting that would require the PnP provisioning templates for more advanced scenarios and so would use an Azure Function but for situations where you don't want to have to have an Azure subscription (it can take months for some enterprises to agree that this is something that should be set up) then this is a good alternative. [Chris O'Brien](https://twitter.com/ChrisO_Brien) covers some great scenarios in his SharePoint Nuts and Bolts post below.

Happy site creating (but don't forget the [governance](http://bostonmusicdave.com/balancing-self-service-with-governance-and-control-in-office-365/)...)!

p.s. Yes, I know I've been quiet on here. Sorry. Life, work, kittens. All got in the way.

Additional links:
* https://www.sharepointnutsandbolts.com/2018/01/site-designs-scripts-or-pnp-templates.html
* https://www.wortell.nl/blogs/sharepoint-online-site-designs-site-scripts/
* https://laurakokkarinen.com/the-ultimate-guide-to-sharepoint-site-designs-and-site-scripts
* http://www.aerieconsulting.com/blog/modern-sharepoint-templates