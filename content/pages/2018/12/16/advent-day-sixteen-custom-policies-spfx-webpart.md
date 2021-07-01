---
layout: post
title: An Advent series - Building a modern SPFX webpart to search policies
date: '2018-12-16 06:00:00'
content_img_path: 'images/2018/12/telescope.jpg'
comments: false
author: "Kevin McDonnell"
tags:
- SharePoint
- Digital Workplace

---

Much of the focus on modern SharePoint has been on the pages and lists but for me, the true magic has been the introduction of modern development tooling with the [SharePoint Framework](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/sharepoint-framework-overview) (SPFX) that has introduced tools like [Node](https://nodejs.org/en/), [Gulp](https://gulpjs.com/) and [Webpack](https://webpack.js.org/) to deliver powerful front-end solutions. When coupled with the great community of developers like the [PnP community](https://docs.microsoft.com/en-us/sharepoint/dev/community/community) that deliver [samples](https://developer.microsoft.com/en-us/SharePoint/gallery/?filterBy=SharePoint,Samples) and other tools (like [PnP JS](https://github.com/pnp/pnpjs)), it is much easier to develop modern looking solutions that match the new look. To demonstrate this, I have extended the Policies pages from my [last](/2018/12/15/advent-day-fifteen-adding-page-approvals-in-modern-site.html) [posts](/2018/12/14/advent-day-fourteen-building-policies-site-in-modern-site.html) to have a webpart that allows you to search by the tagged metadata for each of the documents. You can see the full solution at https://github.com/kevmcdonk/Mcd79PoliciesViewer.

![Policies Viewer](/images/2018/12/PolicesViewerWebPart.PNG)

## Getting started

There are some great documents from Microsoft around getting started with SPFX at https://docs.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-developer-tenant so I won't replicate too much of that. I picked the webpart and went for React as the Framework. So instead the focus of this is what I used to show the documents.  I wanted it to look like SharePoint so I used [Office UI Fabric](https://developer.microsoft.com/en-us/fabric) to integrate it well. To retrieve the data, I used the PnP JS Core framework.

## How does it work

The webpart retrieves the list of policies from SitePages on the site. It also expects two lists - Departments and PolicyRoles. These provide the metadata that can be assigned to policies and can also be searched for.

PnP JS gives a good looking bit of code for querying lists, such as the code below for retrieving the departments:

    public getRoles(): Promise<any[]> {
        return pnp.sp.web
        .lists
        .getByTitle('PolicyRoles')
        .items
        .select('Title','ID')
        .get().then((items: any[]) => {
            return Promise.resolve(items);
        }).catch(error => {
            console.log('Error ensuring list: ' + error.message);
            return Promise.reject('Error returning list');
        });
    }

## What's next for it?

I would like to add some more magic to the look of it by using Isotope to give better animation to filtering. It would also be great to introduce search as well so that it searches the content alongside the tags themselves.