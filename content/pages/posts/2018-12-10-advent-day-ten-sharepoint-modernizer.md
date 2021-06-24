---
layout: post
title: An Advent series - The power of the SharePoint Modernizer
date: '2018-12-10 06:00:00'
content_img_path: 'images/2018/12/mini.jpg'
comments: false
author: "Kevin McDonnell"
tags:
- sharepoint

---

As someone who has been working in technology and development since the early 2000s, there is always a risk of becoming jaded and just seeing new technologies as the same old thing. But there are still things I get excited about. One of those was the advent of the Modern SharePoint push that started with the [Future of SharePoint event](https://www.microsoft.com/en-us/microsoft-365/blog/2016/05/04/the-future-of-sharepoint/) in May 2016, showing that Microsoft could work in a responsive way and make good looking sites with little effort.

There was still a lot of work to do to make sure that all the features of class SharePoint pages could be met and I believe that almost everything can now be done (with the exception of full branding and in my opinion that is a good thing). The problem now is that while migrating between SharePoint versions is not needed, there is still a big step to migrate pages to the new version. Until now, this required a lot of manual work, blood, sweat and tears to take the old pages and copy the content to new pages. Not any longer.

## Modernize your SharePoint pages

![Create Modern Version](/images/2018/12/createmodernversion.png)

With yet another example of the power of the SharePoint Community, the PnP Core team has got together has worked to create a tool that can automatically migrate a classic webpart page in SharePoint over to a modern page. They have created a set of libraries that can be used to:

- Automate the migration of pages using either PowerShell or .Net
- Allow users to migrate page by page using the SharePoint UI

The second part there is the amazing part where you can allow site owners to take control and move across the content as they want to. This is so key to help migrations work as site owners are the people who know how they want their sites to work but are often busy people with a bigger focus on their main business, not on updating SharePoint. This puts the power in their hands. They can view a preview and choose whether to proceed or role back.

That's not to say that IT Pros and Developers are left out as the migrations can be scripted and run automatically as well. Whether you are more comfortable in C# or PowerShell, the options are there. 

You can read more about modernizing SharePoint pages at:

https://developer.microsoft.com/en-us/sharepoint/blogs/modernize-your-sharepoint-pages/

And you can view an example by [Bert Jansen](https://twitter.com/O365Bert) from the SharePoint Dev Community Monthly Call:

https://developer.microsoft.com/en-us/sharepoint/blogs/sharepoint-dev-community-pnp-december-2018-monthly-community-call-recording/

Or get stuck in with some code at:

https://github.com/SharePoint/sp-dev-modernization