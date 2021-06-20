---
layout: post
title: Using Microsoft Search with a SPA
date: '2020-08-09 20:00:00'
feature_image: '/assets/images/2020/08/pool.jpg'
comments: false
published: true
author: 'Kevin McDonnell'
tags:
- Digital Workplace
- Technical
---

Microsoft Search was announced as the single search for finding items across the whole of the Microsoft 365 world back in 2017 during the Ignite that year. One backend to reference so that no matter where you search from, you get the same results back. That's the promise and that is gradually coming to fruition. I will cover more on how this looks in SharePoint but this post will look in to the Dev side - how can Microsoft Search be used in a SPA (aka Single Page Application - sorry, no massages here)?

TL;DR - take a look at the code at [https://github.com/kevmcdonk/ms-search-spa](https://github.com/kevmcdonk/ms-search-spa) to see how it's done.

That fateful conversation. "I really like this but can it look a bit less like SharePoint?". It's a hard one as Modern SharePoint offers so much to people but there are those that have been bitten before and just don't want the flexibility that SharePoint brings and don't want the space grabbing that it can take as well. Usually, I try and push harder but in this case, there was little that the client wanted outside of the ability to easily search enterprise content. They wanted a way to get to their other web applications and other content faster. What did they like? Microsoft Search.

The power that Microsoft Search offers to index content from a multitude of places has increased the interest. It allows users to search content from across Microsoft 365 in a single way, knowing that results will come back the same regardless of where you search from. It also now allows you to pull content from outside of Microsoft 365 so that your single search can be aligned to all of your content. I spoke more of this at the [GlobalCon1 event](https://events.collab365.community/globalcon1-agenda/) run by [Collab 365](https://collab365.community/) that you can sign up for the [All Access Pass](https://partners.collab365.community/13990/41362) to view, including an eBook on the subject.

What was announced at Ignite in 2019 was that this search would now be available using the Microsoft Graph. There are only certain areas available at the moment such as searching files, events, messages and external items - you can read more in the [Graph Docs](https://docs.microsoft.com/en-us/graph/api/resources/search-api-overview?view=graph-rest-beta). The sample that I have put together makes use of these APIs as well as some others to retrieve SharePoint info. Sadly, not quite all the needs are available in Graph so I've had to make some SharePoint REST calls too but we'll get to that.

## How it looks

The UI focuses on the ability to search for contents with a large search box as the focus. Below that, it shows the trending news and then follows up with other trending items using the Graph and SharePoint APIs.

![Main page](/assets/images/2020/08/mssearchspa-1.jpg)

![Second half of main page](/assets/images/2020/08/mssearchspa-2.jpg)

The search bar returns results straight away and uses the Adapative Cards to render the results although these could do with some improving to look a bit better!

![Search results](/assets/images/2020/08/mssearchspa-3.jpg)

## Framework
The overall app utilises the Next JS framework to create a static app that can be hosted on Azure Storage. This makes it very cheap to run and relatively simple once the code is compiled. Azure DevOps can build and deploy all the files and get the site running in minutes. Which is nice.

Next JS is an opionated framework focused on Single Page Applications with React. It handles the routing and used WebPack to run dev locally with the Hot Modules - all the things you would expect from a modern framework. Big thanks to [Garry Trinder](https://www.twitter.com/garrytrinder) for getting this set up as it makes things a lot smoother than my original, pure JS version. He also put plenty of work in to the other elements so huge kudos to that man.

I used MSAL to utilise Azure AD for authentication and Office UI Fabric for the UI. The final part to help with rendering the search results is to use Adaptive Cards and Adaptive Templates. For the rest of this post, the focus is on the API calls (Graph and SharePoint) with a little Adaptive thrown in too and most of these are located in the [Services](https://github.com/kevmcdonk/ms-search-spa/tree/master/services) folder.

## Calling the Microsoft Search Graph APIs
The [Search.js](https://github.com/kevmcdonk/ms-search-spa/blob/master/services/search.js) file shows how the Search API is queried. It receives a token that is retrieved from MSAL and accepts a searchQuery, a string that contains the query that is comes from the search box the user types in. The call is pretty basic with the only addition being that you can control the number of results to return and whether to skip results, allowing you to page through records.

<script src="https://gist.github.com/kevmcdonk/5cb7f9a6a72f58628dd57e826af49489.js"></script>

The limitations really are that you can only return one entity type at a time. To return all events and messages, you would need to make two separate calls and merge them. Same with files (aka Drive Items) which slightly differs from the one search message at the moment. It does simplfy the response though as the entities returned are just those that you search for.

## Adaptive Cards and Templates
The results returned from search are nicely rendered from the Graph using Adaptive Cards. These are used in the [Graph Explorer Preview](https://developer.microsoft.com/en-us/graph/graph-explorer/preview) to show how the results can be rendered which demonstrates the direction of importance that these are taking.

The best place to find out more about Adaptive Cards is at [https://adaptivecards.io](https://adaptivecards.io). There you can view samples as well as use the Designer to build your own cards. 

The card templates are used in the [search.js component](https://github.com/kevmcdonk/ms-search-spa/blob/master/components/search.js), rendering the responses back from the Graph or SharePoint calls. The templates themselves are held as JSON files in the [cards folder](https://github.com/kevmcdonk/ms-search-spa/tree/master/cards) and added in to the component. The key packages used are adaptivecards, adaptivecards-fabric and adaptivecards-templating which combine to allow you to render the UI in a Fabric friendly way. You can see below that can add some config like the default font (good old Segoe UI in this case) and that you can create an action for when actions take place with the card. 

The templating is still in preview so approach with caution and be ready for some changes although I found that it worked pretty well once you find the right samples. However, if you have used previously, it is worth noting the breaking changes as of May 2020 noted at [https://docs.microsoft.com/en-us/adaptive-cards/templating/](https://docs.microsoft.com/en-us/adaptive-cards/templating/).

<script src="https://gist.github.com/kevmcdonk/288e71d02b60e49889f982530a273119.js"></script>

## Getting News from SharePoint
To get the news from SharePoint, I would love to use Graph but at the time of developing it, there was not enough support for the Search of news articles so I went back to using the SharePoint REST API. I added a filter for the Page content type and also for PromotedState as 2 to ensure that it was just News pages and not other standard pages.

<script src="https://gist.github.com/kevmcdonk/09a4dd977f7f4fec418d927d1ea82518.js"></script>

## Trending Items
For the trending items, things were a lot easier as I could make use of the trending insights functionality in the Microsoft Graph.

<script src="https://gist.github.com/kevmcdonk/aa229abc623037431860a33fe6d80999.js"></script>

## Using SitePages API
One of the areas that could be a little controversial in this code is the use of the SitePages API. This is used in SharePoint itself for actions on SitePages but is not formally supported as there is no documentation for it. I made use of it to return specific news pages filtered to only return files (the filter of FSObjType=0). However, the risk of using this is that it may stop working at any point so should be used cautiously. 

<script src="https://gist.github.com/kevmcdonk/59924e7072bb4286cb7fa8ec3a84f302.js"></script>


## Next steps
While I was happy with how this works, I would love to implement a little more to help with testing. Firstly, I would extend the existing Cypress tests to do a full UI test based on some of the great work that Elio Struyf has done.

Next, I would improve this with deployment scripts that set up test data to use in a fresh environment wiht sample applications set up to be searched. It would also be good to get additional services to understand better which applications are in use and show those as the first option.

Any other ideas you have, I'd love to hear them via [Twitter](https://twitter.com/kevmcdonk) or as suggestions in the [GitHub issues](https://github.com/kevmcdonk/ms-search-spa/issues?q=is%3Aissue+is%3Aopen+sort%3Aupdated-desc).