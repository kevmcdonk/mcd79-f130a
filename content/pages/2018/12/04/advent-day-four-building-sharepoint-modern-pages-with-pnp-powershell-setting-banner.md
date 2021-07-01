---
layout: post
title: An Advent series - building a SharePoint modern page with PnP PowerShell setting the banner image
date: '2018-12-04 06:00:00'
content_img_path: 'images/2018/12/paper.jpg'
comments: false
author: "Kevin McDonnell"
tags:
- digital homeplace

---

The [SharePoint PnP Provisioning framework](https://docs.microsoft.com/en-us/sharepoint/dev/solution-guidance/pnp-provisioning-framework) is great for creating sites from a template but sometimes you need to do that little bit more that PowerShell offers and one such scenario at the moment is setting the banner image for a page.

The full script for this can be found at https://github.com/kevmcdonk/Mcd79SharePointScripts/blob/master/CreateTeamSiteWithCustomModernPage.ps1.

If you are connecting to multiple versions of SharePoint (e.g. SharePoint 2013, SharePoint 2016 and SharePoint Online), then I highly recommend [this post](https://www.erwinmcm.com/running-the-various-versions-of-pnp-powershell-side-by-side/) from Erwin van Hunen.

## Getting started with the simple stuff

The first step for almost all PnP PowerShell scripts is to run [Connect-PnPOnline](https://docs.microsoft.com/en-us/powershell/module/sharepoint-pnp/connect-pnponline). My scripts generally take a credentials parameter at the start so that I do not need to keep entering credentials. You can also use -UseWebLogin, especially if you are using Multi-Factor Authentication.


Using PnP PowerShell, it is very easy to create a new Team or Communications Site using [New-PnPSite](https://docs.microsoft.com/en-us/powershell/module/sharepoint-pnp/new-pnpsite), passing the name and alias for the site (used for the Url).

```
New-PnPSite -Type TeamSite -Title $departmentDisplayName -Alias $departmentName
```

## Clearing the decks

Making changes to existing pages is possible but as you do not know what could have been added to pages, I prefer to delete the existing page and add a brand new one. On the script example, the page has just been created so this may be overkill but as I tend to use these functions in other scripts, I kept it in.

Delete the current homepage with [Remove-PnPFile](https://docs.microsoft.com/en-us/powershell/module/sharepoint-pnp/remove-pnpfile)

```
$removedFile = Remove-PnPFile -SiteRelativeUrl $homePageUrl -Force
```

and add a new blank one with [Add-PnPClientSidePage](https://docs.microsoft.com/en-us/powershell/module/sharepoint-pnp/add-pnpclientsidepage)
```
$newHomepage = Add-PnPClientSidePage -Name "Home" -LayoutType Article
```

and then in the interests of clearing the deck, remove all sections on the page too
```
$homepage = Get-PnPClientSidePage -Identity Home
$homepage.Sections.Clear()
```

## Adding some basic content

The simplest content to add is the the latest content on the site with a Content Rollup web part based on the left section.

```
Add-PnPClientSidePageSection -Page Home -SectionTemplate TwoColumnLeft
Add-PnPClientSideWebPart -Page Home -DefaultWebPartType ContentRollup -Section 1 -Column 1
```

The page can then be saved and set as the home page using the WelcomePage of the RootFolder

```
$ctx = Get-PnPContext
$web = Get-PnPWeb
$ctx.Load($web.RootFolder)
**$web.RootFolder.WelcomePage = "sitepages/Home.aspx"**
$web.RootFolder.Update()
$ctx.ExecuteQuery()
```

## Finally the complex bit
This took quite a bit of testing and searching on how to set this and I hope to try and integrate this in to a [PnP PowerShell](https://github.com/SharePoint/PnP-PowerShell) pull request.

The first step is to get the ID of the image you want to set as the banner. The image should already be uploaded to SharePoint somewhere although you can reference an external URL as well - I would recommend not doing this though as you are reliant on the image remaining there and adding external calls.

```
$stockImageUrl = $tenantSitesUrl + $stockImageSite
Connect-PnPOnline $stockImageUrl -Credentials $mycreds
$bannerImageItem = Get-PnPFile -Url $bannerImageLink -AsListItem
$bannerImageId = $bannerImageItem["UniqueId"]
```
Adding the webpart html is key. To split out the right content, converting it to xml first to make it easier to set the right parameters. The unique ID of the image retrieved in the first section as well as the image URL are set in the HTML and then set back on the page. You can also set the focal point location by changing the translate X and translate Y settings but I found that doing this on the page and then copying the values was the easiest way.

```
$page = Get-PnPClientSidePage $pageName
$layoutWebPartsText = "<div><div data-sp-canvascontrol="""" data-sp-canvasdataversion=""1.2"" data-sp-controldata=""&#123;&quot;id&quot;&#58;&quot;cbe7b0a9-3504-44dd-a3a3-0e5cacd07788&quot;,&quot;instanceId&quot;&#58;&quot;cbe7b0a9-3504-44dd-a3a3-0e5cacd07788&quot;,&quot;title&quot;&#58;&quot;Title Region&quot;,&quot;description&quot;&#58;&quot;Title Region Description&quot;,&quot;serverProcessedContent&quot;&#58;&#123;&quot;htmlStrings&quot;&#58;&#123;&#125;,&quot;searchablePlainTexts&quot;&#58;&#123;&#125;,&quot;imageSources&quot;&#58;&#123;&#125;,&quot;links&quot;&#58;&#123;&#125;&#125;,&quot;dataVersion&quot;&#58;&quot;1.2&quot;,&quot;properties&quot;&#58;&#123;&quot;title&quot;&#58;&quot;Home&quot;,&quot;imageSourceType&quot;&#58;4,&quot;translateX&quot;&#58;49.2,&quot;translateY&quot;&#58;74.3&#125;&#125;""></div></div>"

$layoutWebPartsXml = New-Object -TypeName XML
$layoutWebPartsXml.LoadXml($layoutWebPartsText)
$controlDataText = $layoutWebPartsXml.ChildNodes[0].ChildNodes[0].Attributes["data-sp-controldata"]
$controlData = ConvertFrom-Json -InputObject $controlDataText.'#text'
$controlData.serverProcessedContent.imageSources | Add-Member imageSource $bannerImageLink -Force
$controlData.properties | Add-Member uniqueId $bannerImageId -Force
$controlData.properties | Add-Member imageSourceType 2 -Force
$controlDataTextUpdated = ConvertTo-Json -InputObject $controlData
$layoutWebPartsXml.ChildNodes[0].ChildNodes[0].Attributes["data-sp-controldata"].Value = $controlDataTextUpdated
$page.PageListItem["LayoutWebpartsContent"] = $layoutWebPartsXml.OuterXml
$page.PageListItem.Update()
$ctx = Get-PnPContext
$ctx.Load($page.PageListItem)
$ctx.ExecuteQuery()
```

## Summary

The script allows you to build out sites using PowerShell scripts which can either be run manually or built in to an Azure Function and run on a trigger. PnP Provisioning is great for building out the structure of sites and can be used for pages but there are still cases where PowerShell can be more suitable.
