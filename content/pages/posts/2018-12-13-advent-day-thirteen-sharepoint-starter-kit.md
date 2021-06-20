---
layout: post
title: An Advent series - Have you discovered the PnP SharePoint Starter Kit
date: '2018-12-13 06:00:00'
feature_image: '/assets/images/2018/12/space-shuttle.jpg'
comments: false
author: "Kevin McDonnell"
tags:
- SharePoint
- Digital Workplace

---

Have you ever wanted an easy way to show off how good Modern SharePoint looks for an Intranet? The PnP Community have a great solution for you.

Modern Sites in SharePoint work fantastically out of the box and it is very quick and easy to get a great looking site. What the Starter Kit offers on top is to demonstrate how to add additional customisations to the site with items like a custom footer and additional webparts. It demonstrates how you can integrate custom changes that maintain the same look and feel to the rest of the modern site.

## How do you set it up?

One of the real benefits of this kit is the demonstration of creating a set of sites and supporting metadata which is set up with a single command. The installation of the starter kit makes use of the [tenant template](https://docs.microsoft.com/en-us/powershell/module/sharepoint-pnp/apply-pnptenanttemplate?view=sharepoint-ps) scripts  from the PnP community meaning that a single line can be used to build up multiple site collections:

`Apply-PnPTenantTemplate -Path starterkit.pnp -Parameters @{"SiteUrlPrefix"="demo"}`

A couple of things I found while using the scripts:

- You need to be the TermStore admin which isn't set by default in a new tenant - https://github.com/SharePoint/sp-starter-kit/issues/196
- At the moment, it doesn't appear to work when you have MFA enabled but hopefully someone out there will be able to solve this soon - https://github.com/SharePoint/sp-starter-kit/issues/179

## What do you get?

![Contoso Portal](/assets/images/2018/12/ContosoElectronics.PNG)

The script will add a set of Site Designs and Site Scripts which can be used to create department team sites and others, a set of webparts such as the world clocks, people directory and tiles and finally some page customisations such as the portal footer. It is a great example of building on the standard sites that can be used without breaking the look and feel. It demonstrates how you can keep it SharePoint-y while retaining a corporate brand.

What is great to see is how the list of web parts are expanding and it is good opportunity to start contributing yourself. Don't forget...

### Sharing is caring!

![Sharing is caring](/assets/images/2018/12/SharingIsCaring.jpg)

>Image courtesy of Toa Heftiba via Wikimedia https://commons.wikimedia.org/wiki/File:Sharing_is_caring_(Unsplash).jpg