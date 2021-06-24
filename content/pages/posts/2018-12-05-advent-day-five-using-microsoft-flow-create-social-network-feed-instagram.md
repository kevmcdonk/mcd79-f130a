---
layout: post
title: An Advent series - Get Instagram posts into SharePoint in just 5 mins of configuration
date: '2018-12-05 07:00:00'
content_img_path: 'images/2018/12/apps.jpg'
comments: false
author: "Kevin McDonnell"
tags:
- flow
- sharepoint

---

The modern SharePoint webparts have added connectors to Twitter, Facebook pages, YouTube and many others but there are still some gaps like Instagram - here is how you can use Microsoft Flow to push your content in to SharePoint.

![Instagram feed on SharePoint](018/12/InstagramToSharePoint.PNG)

##How does it work?

[Microsoft Flow](https://emea.flow.microsoft.com) is an easy to use tool that runs workflows that can be triggered from a large number of systems. Many of the connectors included are Social Media connectors such as Twitter, Facebook and Instagram.

With the Instagram trigger, a Flow can be started whenever a new photo is uploaded to your account. The connector returns a link to the image which can be pulled using the HTTP activity. The contents can then be written to a SharePoint library.

![Instagram to SharePoint Flow](nstagramToSharePointFlow.PNG)

Ignore the error message in the image which was due to me hiding the site used.

##Showing the contents

As you can see in the top image, the document library can be displayed as an image gallery on any page with a set of tiles for the images.

Should you need to customise the display further, you could also a [PowerApp](https://powerapps.microsoft.com/en-us/) to retrieve the feed and render the results as you want with details like the caption and other text.

You can also custom develop a webpart using [SharePoint Framework](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/sharepoint-framework-overview) and deploy across your organisation, allowing full control to the HTML returned.

##Is this needed for all social networks?
Thankfully Microsoft has already created many of the connectors as webparts that can be used without any customisation. The example of the Twitter feed is shown above and below are the current set of webparts available in first release tenants.

[List of WebParts](018/12/ListOfWebParts.PNG)
[List of WebParts with connectors](/images/2018/12/ListOfWebParts2.PNG)

##A brief warning
The HTTP connector is due to move to require a P1 or P2 license for Flow so there will be additional cost for the licenses. However, if you are already using the HTTP connector, you have an extension as the [detailed post](https://techcommunity.microsoft.com/t5/Office-Retirement-Blog/Updates-to-Microsoft-Flow-and-PowerApps-for-Office-365/ba-p/289589) says:

>Customers with active users of these features will get an automatic extension until January 31, 2020 or the expiration of their existing Office 365 subscription term (whichever is longer).   

##Is it easy to create the flow?

Yes, it doesn't take long to copy the flow but you can also import the Flow directly using this [Exported Flow](https://github.com/kevmcdonk/Mcd79SharePointScripts/blob/master/UploadInstagramFeedtoSharePoint.zip).