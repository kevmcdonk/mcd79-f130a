---
layout: post
title: Issue with Microsoft Groups not syncing for SharePoint Site
date: '2020-12-09 08:00:00'
feature_image: '/assets/images/2020/12/Aligned.jpg'
comments: false
published: true
author: 'Kevin McDonnell'
tags:
- Technical
- SharePoint
---

I hit a strange issue this week but today had that massive buzz of solving it. Sometimes it is the simple things that you've missed but other times (like this one), it is something very odd. The problem was that I had a set of around 1000 migrated sites that had come from SharePoint 2010 and should have been set up as Modern sites. They appeared to be but the SharePoint Groups had retained the old names, i.e.

- Site Owners
- Site Members
- Site Visitors

I was expecting the groups to have the name of the site in there, i.e. if my site was called "My New Site" then the groups would be:

- My New Site Owners
- My New Site Members
- My New Site Visitors

As I was investigating, I noticed that some of the sites had started to get the new names. At this point, I thought I was going mad but as I had taken notes, I knew that something had changed and it wasn't just my goldfish level memory. I eventually realised that if I browsed to Site Permissions from a Modern Home page then something happened along the way that triggered the correction.

My next step was to check PnP PowerShell to see if the sites needed [Groupifying](https://docs.microsoft.com/en-us/sharepoint/dev/features/groupify/groupify-overview) but running the command [Add-PnPMicrosoft365GroupToSite](https://docs.microsoft.com/en-us/powershell/module/sharepoint-pnp/add-pnpmicrosoft365grouptosite?view=sharepoint-ps) told me that they were already associated with a Group.

Finally, I got developer-y and opened up the Chredge Dev Console to look at which REST calls the page made when it hit the Site Permissions page. This is when I discovered a POST call to /_api/GroupService/SyncGroupProperties and this sounded promising. I fired up [Invoke-PnPSPRestMethod](https://docs.microsoft.com/en-us/powershell/module/sharepoint-pnp/invoke-pnpsprestmethod?view=sharepoint-ps) and made a call to a site that happened been manually fixed yet and by magic, it worked! This certainly saved a very dull day of manually clicking several hundred site permission links.

I should say that I cannot find this API documented anywhere so this does not appear to be a fully supported API but if this post saves someone a day or several days of clicking on sites then I'll be a happy person.

Photo courtesy of [Toa Heftiba](https://unsplash.com/@heftiba) via [Unsplash](https://unsplash.com)

