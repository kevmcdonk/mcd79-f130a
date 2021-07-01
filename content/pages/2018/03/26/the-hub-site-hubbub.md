---
layout: post
title: The Hub Site Hubbub
date: '2018-03-26 21:29:24'
content_img_path: 'images/2018/03/telephone-1822040_1920-1.jpg'
tags:
- digital workplace
- sharepoint
- communications
---

If you follow SharePoint news, you undoubtedly would have heard about Hub Sites. They were announced at Ignite in 2017 and have been causing a ripple of excitement ever since. Why? The big reason many people have often felt that SharePoint has lacked tools as standard that help to build a true Intranet. Rolling up news, connected sites, common navigation - all these things were possible in SharePoint but required a good bit of work to function well. Vendors have filled the gap in the past with some great digital workplace products like [Add-In 365](https://www.addin365.com/), [Valo Intranet](https://www.valointranet.com/) and [Powell 365](https://www.powell-365.com/en/) but many organisations did not want to make the additional investment required.

![Cogs](/images/2017/03/cogs.jpg)

## All about the hubs and spokes

I spoke in [an earlier blog](https://www.mcd79.com/here-is-why-microsoft-teams-is-vital-to-cut-down-a-cacophony-of-collaboration-tools-2/) about the importance of hubs and spokes to the digital workplace, allowing people to work in the way that they want but being connected to all the services that they need. At the time I was talking about the impact of Microsoft Teams as a new hub but areas of an organisation still look for their own hubs. That is where Hub Sites play in to this new world. 

HR want to show where they can provide assistance to staff and help people to help themselves. Finance want to give access to key reports and data to those who should be allowed access to it. The Project Management Office want to have a single place to show the status across their portfolio of projects. In that last case, each project would often have its own site but there can be the need to link those with a common navigation and have news from each roll up.

This is where Hub Sites come in.

![Test Hub Site](018/03/Test-Hub-Site-1.PNG)

A Hub Site is not that different from the modern team site or communication site and getting started with a hub site requires you to first create one of these. At this point, we hit one of the big issues currently with Hub Sites - you need to be an admin and to be comfortable with a little PowerShell to be able to elevate a site to be a Hub Site. It's a pretty simple command (shown below) but this closes it off to a smaller set of people who can do this.

>Register-SPOHubSite https://contoso.sharepoint.com/sites/HR

Associated other sites to a hub site is a much easier affair. From the cog menu, select Site Information and you will see a new option appear - as an aside, this has been the easiest way to check whether hub sites are available in your tenant.

![Site info](ite-info.PNG)

The associated site will inherit a navigation bar with a common logo and the same navigation items. Sites that are associated do not get automatically added to the navigation and links must be manually added. There is also some time taken from adding items to the menu before it appears on the other sites, up to 10 minutes from experience at the moment.

![Common navigation](ommon-navigation-1.PNG)

News will also roll-up from other sites on to the hub site. There isn't any control of approving the news and you can't filter using the standard News web part at all. But to bubble up news automatically, it works well.

![News roll-up](-up.PNG)

## Thoughts

So are Hub Sites living up to the excitement? Partially. They look great and are starting to bring some much needed functionality. However, it feels a little early to get too excited. They will evolve and the rapid release cadence that Microsoft is on means that they will improve rapidly. This feels like a start rather than a fully featured product and if that is the case, then it is a good start. Giving some more control to what goes where and allowing end users control without PowerShell would be a great improvement. There are some hints as to what is coming with cross-posting and pinning of news suggested in the [Hub Sites AMA](https://techcommunity.microsoft.com/t5/SharePoint-AMA/bd-p/SharePointAMA) which took place last week and there will be even more being announced in May at the SharePoint Conference North America. 

So a thumbs up for what is there now and hope that there is much more to come.