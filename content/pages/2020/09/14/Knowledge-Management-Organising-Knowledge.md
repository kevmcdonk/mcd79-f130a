---
layout: post
title: Knowledge Management Series - Organising knowledge
date: '2020-09-14 14:00:00'
content_img_path: 'images/2020/09/markers.jpg'
comments: false
published: true
author: 'Kevin McDonnell'
thumb_img_path: 'images/previews/2020/09/markers.jpg'
thumb_img_alt: 'Marker pens'
tags:
- Digital Workplace
- Knowledge Management
---
Organising can seem such a boring word. Organising is the opposite of spontaneous, it's the planned dinner you can't be bothered with instead of the quick pint after work that turns into an epic night out. It's what the young you is terrified that you will turn in to. It is also what makes things just work. It is what makes you be able to be productive, to be able to get on with what you need to do and be the most effective you can be. It's the front-row seats at the O2 after hours spent with multiple windows to get the tickets. But yeah, it is still a bit boring.

> This is part three of the Knowledge Management series. For other parts, see links below:
> * [Part One - Introduction](/2020/09/03/Knowledge-Management-Series.html)
> * [Part Two - Considering where knowledge is stored](/2020/09/10/Knowledge-Management-Series-Considering-where-knowledge-is-stored.html)

## So why do you need to be organised with your knowledge management efforts? 
In the [last part](/2020-09-10-Knowledge-Management-Series-Considering-where-knowledge-is-stored.html) of this series, I talked about working out where your knowledge is held and in many cases, that can be pretty large areas. The example I gave for the etiquette of Microsoft 365 includes Twitter and that is certainly a big place to find information. Being organised means that you can extract/use useful information at the right time from those larger sources.

How though? How do you sort out the huge volumes to be useful? The starter point is to define your taxonomy of information, define how it is that you can categorise knowledge. To be able to understand your knowledge, you need to be able to have ways to classify it into areas, whether it is curated manually or defined with articificial intelligence. A central taxonomy helps to:
- bring standardisation across your organisation
- navigate knowledge
- reduce confusion of common terms
- reduce redundant information
- match to analytics on usage

Creating the taxonomy is not an easy task and is something that should be done with as broader a group of people as possible. 

- Consider the areas that you would apply to knowledge and how people will use that knowledge.
- Consider the areas containing knowledge outlined in your knowledge map and how that would be categorised.
- Consider specific pieces of knowledge and how they could be categorised.
- Consider how a hierarchy of the terms could be created.
- Consider your taxonomy to be iterative and plan for change.

With those tips ringing in your ears, it is time to start building out a taxonomy for the etiquette of Microsoft 365.

## Building a taxonomy for the etiquette of Microsoft 365

The taxonomy can take several forms. For the etiquette, the natural place to start is the navigation that is already in place in the [repo](https://greyhatbeard.github.io/m365-etiquette/). These are:

- By service - a more technical approach to the different services in Microsoft 365
- By approach - a grouping of different ways of using the services
- By scenario - specific scenarios to consider when using services

These have naturally evolved from the contents used and so these make sense to start with. This can be extended with a similar notion of which groups of user it is relevant for, i.e. would it be standard users or power users or perhaps just for admins to consider. Another area added is for the strength of the advice to help guide people consuming the information as to how much they should consider the recommendations. Finally, the source of the knowledge was added which will allow for analytics to be run on the content at a later date.

![Taxonomy for the Etiquette of Microsoft 365](/images/2020/09/EtiquetteTaxonomySketch.jpg)

The next step (not one that I've undertaken quite yet) is to start mapping samples of your content itself using this taxonomy. Identifying exceptions that don't fit this taxonomy is important as it helps you to work out whether you need to extend the taxonomy or allow some bits of content to not quite fit. Looking at [Limitations of Private Channels](https://greyhatbeard.github.io/m365-etiquette/By-service/teams/) in our repo, there's some great advice but it doesn't feel quite like it fits the must, should, might level exactly and hard to say if it would be for power users or admins. We will need to make a decision as to whether we update the content there or adapt the taxonomy. We will certainly need to break many of the pages into smaller blocks as parts of the pages have a real mixture of content. This shows a good example of working out whether to change your taxonomy, change your content or perhaps to have a transformation process into a central repo is the right thing to do.

## How to store your taxonomy

This is always a tricky one to answer. The important factors to consider are:

- Visibility to all
- Ability to consume with APIs
- Clear ownership
- Ability to request additions and changes

There are many services that can be purchased or databases built with APIs to support these factors. Coming from a SharePoint background, my natural position would be to store these in the taxonomy service and I will dig further into that in a future post in this series, considering how to make it more visible and easier to request additions and changes for all staff.

For the etiquette of Microsoft 365, all the content is held currently in a [YAML file](https://github.com/kevmcdonk/m365-etiquette/blob/master/docs/metadata.yml) with indents to show the taxonomy within that. It's an early beta so not yet extensive but gives an idea of how it will look when past the OneNote. The downside with YAML files is adding additional metadata such as alternative names capturing owners in the way that you could in the SharePoint Managed Metadata service. A future change could be to create a JSON file to hold this with the additional details as attributes. But this works nicely for now and for this series.

<script src="https://gist.github.com/kevmcdonk/60dd92ffc914348edf8a226ddcbd67cb.js"></script>

## What about an onotology?

Some of you reading this may have heard about ontologies as well as taxonomies. For me, the simple difference is that taxonomies will have a single hierarchy for each item in the taxonomy. Ontologies allow for more complex relationships to be put in place such as where departments and functions of an organisation may overlap. A taxonomy would be described in a tree view whereas an ontology is more like a web diagram linking different nodes.

If you are unsure, then stick with the simpler taxonomies as these are easier to implement with services like SharePoint Managed Metadata. As your information becomes more complex, then you could consider moving to the more complete ability to map relationships with an ontology instead.

For more information on the differences, the following articles may help:
- [Forbes - taxonomies vs ontologies](https://www.forbes.com/sites/cognitiveworld/2019/03/24/taxonomies-vs-ontologies/#79e714f57d53)
- [Earley - What is the difference between taxonomy and ontology](https://www.earley.com/blog/what-difference-between-taxonomy-and-ontology-it-matter-complexity)
- [Pedia - difference between taxonomy and ontology](https://pediaa.com/difference-between-taxonomy-and-ontology/)

## Driving change and adoption

Once you have begun the process of planning your knowledge, it is vital that you have a broad set of contributors, that you have opened up to people who will be using the metadata to make sure that you have the right information in place. For example, if your metadata includes an organisational structure but your HR systems use a different approach to your Finance systems then you have already excluded a large part of your potential user base. Engaging well and early with your key users of the metadata will help to ensure that the organised knowledge will be used - it may make things take longer as you adapt to different needs but it will be time well spent for later.

Broadening out to more users initially can lead to a much higher scope of work so be prepared to engage with areas that you may open up to later, be prepared to disappoint some people initially so that you can gain momentum instead of being bogged down in never ending requirements definition instead of earning some value. Don't be afraid of adapating an agile/continuous improvement approach to your knowledge metadata, being open with progress.

You should also make sure that you consider how the metadata will be managed:
- How will people request changes?
- Who will have ownership of different areas?
- Will there be an automated approval process?
- How will you know what is being used and what isn't?

The SharePoint Managed Metadata service, as I mentioned above, isn't great at these things so it is important that you consider how you are going to handle the requests, how you will monitor usage up front. It may be that from day one that you won't but do plan to get scripts in place to help with this or engage with some of the great third parties that are out there.

## Wrap-up

As with many collaboration systems, governance is key to Knowledge Management and organising your knowledge to ensure easy access and understanding will make sure that it is used effectively. Building up the metadata so that you do not always have to pull your data into one place gives you the flexibility needed for modern agile organisations while also giving that standardised structure to keep things consistent.

Engaging with others is key and part of that change and adoption is building a culture where people do understand the value of sharing knowledge and people are encouraged to actually do it. Building that culture is the subject of the next blog post.

Photo courtesy of [Faris Mohammed](https://unsplash.com/@pkmfaris) via [Unsplash](https://unsplash.com)
