---
layout: post
title: Creating a SharePoint Communications Site on the Office 365 root without Invoke-SPOSiteSwap 
date: '2019-08-13 06:00:00'
feature_image: '/assets/images/2019/08/treeroot.jpg'
comments: false
published: true
author: "Kevin McDonnell"
tags:
- Bots
- Technical
---

Almost since SharePoint Communication Sites were first announced, the clamour has been there to be able to have the root site be a Communications Site. An image driven, good looking site at the natural place for an Office 365 tenancy. Then, at this year's [SharePoint Conference](https://sharepointna.com), Microsoft [announced](https://techcommunity.microsoft.com/t5/Microsoft-SharePoint-Blog/Updates-to-SharePoint-security-administration-and-migration/ba-p/549585) that the PowerShell commandlet [Invoke-SPOSiteSwap](https://docs.microsoft.com/en-us/powershell/module/sharepoint-online/invoke-spositeswap?view=sharepoint-ps) was coming and would allow admins to swap out the current root site with another one (with a few provisos that I'll let you read in detail).

Awesome, I thought, my shiny Communications Site can now be shifted to be where most people would expect it. I fired up PowerShell and connected up to the site. Ran the command. Boom. Nothing happened except an error.

![Swapsite not supported](/assets/images/2019/08/swapsite-not-supported.png)

Humph. Turns out that the tenancy was on standard release so I could be waiting some time before I got my shiny Communications Site I had stupidly promised. The good news was I remembered a [workaround](https://hangconsult.com/2017/06/29/change-sharepoint-online-root-site-collection-to-use-the-new-communication-site-template/) involving saving a Communications Site as a template, deleting the root site and then setting it with a custom template. Not perfect and not supported but it would work. As I didn't want to try out deleting the root site on the main tenancy without being certain what would happen, I used my [Office Developer subscription](https://developer.microsoft.com/en-us/office/dev-program). I copied the url for saving the template, plugged it in and...

![No access](/assets/images/2019/08/no-access.png)

Oh. I can't access that any more. That's a pain. But I can be a stubborn beast so wanted to make sure that there was definitely no way round it. I took the plunge in the dev subscription and deleted the root site, safe in the knowledge that I would be able to recreate one...I hoped. I used the new admin centre to delete, making sure to permanently deleted it and clear all record of it.

![Delete current site](/assets/images/2019/08/01 Delete current site.png)
![Permanently delete site](/assets/images/2019/08/02 Permanently Delete it.png)

I tried out using some of the PnP commands like [New-PnPSite](https://docs.microsoft.com/en-us/powershell/module/sharepoint-pnp/new-pnpsite) and [New-PnpTenantSite](https://docs.microsoft.com/en-us/powershell/module/sharepoint-pnp/new-pnptenantsite) but neither worked unfortunately. So I decided to try and create a blank site where I could choose the template later, as the earlier post recommended. It was a risk as I had no Communications Site template saved but I thought it was worth a look. Why did I think that? Well, I had seen that there was a Communications Site template listed when I ran [Get-PnpWebTemplates](https://docs.microsoft.com/en-us/powershell/module/sharepoint-pnp/get-pnpwebtemplates) so I was hoping I might be lucky.

![Create new site using other options](/assets/images/2019/08/03 Create a new site using other options.png)
![Select more templates](/assets/images/2019/08/04 select more templates.png)
![Create site with select template later](/assets/images/2019/08/05 Create site with select template later.png)

So I now had a site but without a template. I tentatively browsed to that site and started looking through the template options. Oooo, what is that there?

![Select publishing](/assets/images/2019/08/06 navigate to created site and select publishing.png)

Under the publishing tab, there was Communications Site. I selected that, created the default groups and there it was, a Communications Site at the root.

![Communications Site at root](/assets/images/2019/08/08 comm site at root.png)

Fantastic, I was done! Except it occured to me that this tenancy was on targeted release. I took the risk to follow the same steps on the main site (it wasn't in active use yet) and thankfully I found the same thing. I had a working Communications Site.

## Caveat Emptor aka be careful using this

So here is the large disclaimer. This is not a supported method. My recommendation would still be to either wait for Invoke-SPSiteswap to reach standard release or change the tenancy to use targeted release. This method may suddenly stop working (in the way that Save Site As Template is now blocked) and it could impact the live running of your tenancy.

But if you are wanting to put a Communications Site at the root while on Standard Release, then I can confirm that on 13 August 2019, it does work.

Header Image by Susanne Jutzeler, suju fotografie from Pixabay