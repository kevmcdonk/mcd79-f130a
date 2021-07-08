---
layout: post
title: Creating a custom Microsoft Search connector with Logic Apps
date: '2020-09-30 18:00:00'
content_img_path: 'images/2020/09/connectors.jpg'
comments: false
published: true
author: 'Kevin McDonnell'
thumb_img_path: 'images/2020/09/connectors.jpg'
thumb_img_alt: 'Connectors'
tags:
- Digital Workplace
- Knowledge Management
- Technical
---

Microsoft has been speaking for some time about the power of Microsoft Search and the ability to have one place to search for all your content. This has gradually been coming more and more true but one of the areas that has not been widely available has been the ability to add your own custom content to the index. However, that is now possible and allows developers to bring content into search alongside other content. In this post, I will run through two ways of doing this but both will require development experience, including a sample from the graph team and then my own example using Logic Apps to consume Twitter content.

## Overview of custom connectors
Microsoft Search has the ability to connect to standard systems through the Microsoft 365 Admin Centre for some standard systems including SQL Server, Azure Dev Ops, MediaWiki and the others mentioned in the image below. These allow users to follow a wizard guide to enable content to be added to the index so where you have data in SQL such as a table of custom application data, this can be added to your Microsoft Search.

However, if you have a third party application or content in something like Cosmos DB, you need to use the interfaces in Microsoft Graph to add content to the index. This broadens the capabilities to connect without having to first move data to one of the systems below.

![Current Search Connectors](/images/2020/09/DefaultSearchConnectors.jpg)

## Adding custom data with .Net Core
The easiest point to get started with the custom search connectors is to use the [sample code](https://github.com/microsoftgraph/msgraph-search-connector-sample) from the Microsoft Graph team. This has a great guide in the readme to get started using a console app to connect. The process that it follows is:

- Set up the app registration in Azure AD
- Grant permissions for External Items to have Read/Write
- Create an External Connection giving a unique ID, name and description
- Create a schema for the index content and assign to the connection
- Add items to the index
- Confirm connection set up in Microsoft 365 Admin Centre
- Create a Vertical at the tenant or site level
- Create a Result Source for the layout of the results (using https://searchlayoutdesigner.azurewebsites.net/)

Once these are set up (following the great [readme](https://github.com/microsoftgraph/msgraph-search-connector-sample/blob/master/README.md) in the sample), the results show up in the main search results as a vertical below where the sample Parts vertical is set up. The console app sets up each of the steps above through number prompts for the user but is designed as an example not as a real solution to use. Which brings me to using Logic Apps.

![Parts Search Results](/images/2020/09/PartsSearchResults.png)

## Pulling index results using Logic Apps
Taking the ideas in the repo above to a more usable setting, I decided that pulling a set of tweets from Twitter would be useful to be searchable across Microsoft 365, using the great information that gets shared regularly on the TweetJam's run by [Christian Buckley](https://twitter.com/@buckleyplanet) under the [#CollabTalk](https://twitter.com/search?q=%23collabtalk&src=typed_query) hashtag. There are some great conversations that take place and useful information shared and making this available within the help guides could be useful.

The use of Logic Apps meant control over how the ingestion of the indexes can be triggered. Rather than the historic way of running nightly imports, the trigger can happen straight away and have the content made available. They also provide an easy way of viewing the history of imports both through the run history and through easy integration with App Insights.

So what Logic Apps are created? All the Logic Apps are available in the [Mcd79TwitterSearchConnector repo](https://github.com/kevmcdonk/Mcd79TwitterSearchConnector).
- [Setup](https://github.com/kevmcdonk/Mcd79TwitterSearchConnector/blob/main/Mcd79TwitterSearchConnectorSetup.json) - configures the connection and required schema, more on this below.
- [Search](https://github.com/kevmcdonk/Mcd79TwitterSearchConnector/blob/main/Mcd79TwitterSearchCollabTalk.json) - Retrieves up to 99 tweets to pull a range of information.
- [Trigger](https://github.com/kevmcdonk/Mcd79TwitterSearchConnector/blob/main/Mcd79Twitter-CollabTalk.json) - Regular trigger for any new tweets with the hashtag.

The first Logic App creates a connection with unique ID, name and description to identify the index items. It checks first to see if it exists and adds it if not. The same then follows for the schema which outlines the model for the index and defines which properties can be held. This is a relatively simple schema with datatypes but no collections or sub-schemas available.

![Setup Logic App](/images/2020/09/SetupConnectorAndSchema.jpg)

The schema itself defines the properties to be captured with the name and type as well as four other values from the [schema definition](https://docs.microsoft.com/en-us/graph/api/resources/schema?view=graph-rest-beta):
- isQueryable - whether the property can be used in search queries using KQL
- isRefinable - whether the property can be used to refine the query with filters
- isRetrievable - whether the property can be returned in the search results
- isSearchable - whether the property is searchable

The schema that I created for the Tweets can be seen in [the repo](https://github.com/kevmcdonk/Mcd79TwitterSearchConnector/blob/main/schema.json).

In both the search and trigger Logic Apps, the key element is the part that creates the index. This is done by making a PUT request against the connection and using a unique ID for each index. In the tweets case, I am using the Tweet ID. The body of the PUT request includes four key areas:
- Type - the type of object, usually microsoft.graph.externalItem
- [ACL](https://docs.microsoft.com/en-us/graph/api/resources/acl?view=graph-rest-beta) - the security required on the index item which can be a user, group, everyone or everyoneExceptGuests.
- [Content](https://docs.microsoft.com/en-us/graph/api/resources/externalitemcontent?view=graph-rest-beta) - the text content of the index, in the tweet it is the tweet contents.
- [Properties](https://docs.microsoft.com/en-us/graph/api/resources/externalitem?view=graph-rest-beta) - JSON object that must meet the schema defined

You can create up to 2,000,000 indexes in your tenant across both the custom connector and the standard connectors. Once you have added the index, you can follow the same guide as in the search sample [readme](https://github.com/microsoftgraph/msgraph-search-connector-sample/blob/master/README.md) to set up the Verticals and the Result Source to show how it will be rendered.

Once done, you can see the results appear in your search results as below.

![Tweet Search Results](/images/2020/09/TweetSearchResults.jpg)

So there you have it, the content from CollabTalk appearing right there in your search results. Obviously, I have picked this as an example but that content could be from your custom applications, Salesforce and anyone one of the many other Connectors that exists in Logic Apps. The only struggle I had was about getting the Graph Auth in place (I originally tried using Managed Identity as in [Garry Trinder's great post](https://garrytrinder.github.io/2020/09/implement-microsoft-graph-app-only-calls-the-easy-way-using-azure-logic-apps-and-azure-managed-identity) on using it with Logic Apps but found issues that I'll look back at) but otherwise, it was set up in an hour.

While this is a developer task and not through a wizard, it is an easy way to extend your search results and get access to data where you need it and render how it appears.

Photo courtesy of [John Barkiple](https://unsplash.com/@barkiple) via [Unsplash](https://unsplash.com)
