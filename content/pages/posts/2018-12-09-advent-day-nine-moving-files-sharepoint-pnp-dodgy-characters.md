---
layout: post
title: An Advent series - Getting started with PnP PowerShell by allowing file move across site collections
date: '2018-12-09 06:00:00'
feature_image: '/assets/images/2018/12/files.jpg'
comments: false
author: "Kevin McDonnell"
tags:
- sharepoint
- technical

---

Have you used [PnP PowerShell](https://github.com/SharePoint/PnP-PowerShell) or many of the other great community initiatives under the [SharePoint PnP banner](https://docs.microsoft.com/en-us/sharepoint/dev/community/community)? Have you ever hit an issue with it? What did you do? Raise an issue? Tweet one of the community? Did you consider trying to fix it?

Here's my little story of making a fix to an issue I found. The [issue](https://github.com/SharePoint/PnP-PowerShell/issues/1051) was that I was trying to copy files that had ampersands in the name. These were supported in SharePoint Online and OneDrive but I was hitting an error when copying using Copy-PnpFile between site collections - strangely, this didn't occur when in the same site collection.

The first step to try and fix the issue was to get the source code running - the details for this can be found at the bottom of the [PnP PowerShell Github](https://github.com/SharePoint/PnP-PowerShell) page. You can then follow along with the details [Contributing](https://github.com/SharePoint/PnP-PowerShell/blob/master/CONTRIBUTING.md) page.

In the issue I encountered, it was more complex as the issue could either been considered in the core PnP or in PnP PowerShell. I decided that it made more sense to make the change in PnP PowerShell, as I noted in the issue description:

>So why haven't I logged this in Core? Well I think that this logic may need to move back in to PowerShell and cater for different platforms as the characters above are still relevant for 2013. Therefore I think that the Upload File should be brought in to the CopyFile.cs class and use different Regex expressions for the different platform.

Once I had fixed the issue and tested it but using this version in my migration scripts, I added some unit tests and created a pull request. At this point, I started a discussion with [Erwin Van Hunen](https://twitter.com/erwinvanhunen) aka the Godfather of PnP Powershell. The reason was that the tests needed two site collections but this broke the fundemental assumption of needing a single site collection. 

As with many people running open source projects, any complication can cause changes to take longer to get sorted. As I had a fix for my situation, I didn't chase as much as I could have so it sat as an open pull request for some time. What I loved though was that it was left open and robbert-vanandel commented on the Pull Request. This was a spur for Erwin to agree to some changes on the additional site collection and there was my first accepted Pull Request.

It was a relatively simple change but I hope the first of more changes to make. Just need to find more energy to pick up some more!