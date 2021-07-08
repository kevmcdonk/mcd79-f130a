---
layout: post
title: Show Their Tweets - A Power App using Face API to show tweets based on photo taken
date: '2020-01-18 00:00:00'
content_img_path: 'images/2020/01/selfie.jpg'
comments: false
published: true
author: "Kevin McDonnell"
thumb_img_path: 'images/2020/01/selfie.jpg'
thumb_img_alt: 'Selfie'
tags:
- Technical
- PowerApps
---

Ignite - The World Tour. London. January 2020. Microsoft brings along some of its biggest names in the Power Apps world to the Excel Centre. 

In the morning, [Dona Sarkar](https://twitter.com/donasarkar), principal advocate for the Power Platform promises a brand new [Power Platy](https://twitter.com/search?q=%23powerplaty) sticker for anyone who shows a Power App to her or [Brian Dang aka 8bitclassroom](https://twitter.com/8bitclassroom). I'm a sucker for a sticker so showed my [kitchen calendar app](https://www.mcd79.com/2017/03/20/i-do-not-like-green-eggs-and-ham-sam-i-am-2.html) and now my Surface has a little less space. It didn't stop there though.

The Ignite Tour is great as it helps those of us who struggle to afford the trip over to the US and shares some of the best of the sessions. I was a little disappointed with the range of talks this year but there was a heavy sway towards AI and also Power Platform. As I had breakfast on day 2, I was hatching a plan. Could I write an app in a day that combined the best of both? The answer turned out to be not quite - a combination of too much chatting to the community (always worthwhile) and wobbly wifi for most of the day meant that I had to finish it off this morning but I think the end result was worth it.

## Share Their Tweets

The main aim of the app was to integrate the [Face API](https://azure.microsoft.com/en-us/services/cognitive-services/face/) and possibly some other [Cognitive Services](https://azure.microsoft.com/en-us/services/cognitive-services/). The rest of it slowly evolved from there. As I was among many MVPs and other knowledgeable people who share much of their learnings on Twitter, I thought that it might be good to introduce some of that. So how does it work?

The home page lets the user take a photo and it will try and recognise a face in that photo (just the one at the moment). If they are in the list, then it will show a list of their tweets with the option to show any that they are mentioned in. Then if you click on two of the icons along the top, the app will now extract either a set of key phrases from the last thirty tweets or the entities used by running them through the [Text Analytics Cognitive Service](https://azure.microsoft.com/en-us/services/cognitive-services/text-analytics/).

![Homepage](/images/2020/01/ShowTheirTweets-Home.jpg)
![Tweets](/images/2020/01/ShowTheirTweets-Tweets.jpg)
![Entities](/images/2020/01/ShowTheirTweets-Entities.jpg)

The rest of the app is about setting up the people who can be searched for. From the homepage, you can click on the people icon to see a list of people. There you can also add another person by taking their photo, adding their name and Twitter handle. The app also allows you to add additional photos to help train the face list for a person further.

![People](/images/2020/01/ShowTheirTweets-People.jpg)
![Add Person](/images/2020/01/ShowTheirTweets-AddPerson.jpg)
![Add Person Face](/images/2020/01/ShowTheirTweets-AddPersonFace.jpg)

Want to see a live demo?

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">I promised at <a href="https://twitter.com/hashtag/MSIgniteTheTour?src=hash&amp;ref_src=twsrc%5Etfw">#MSIgniteTheTour</a> in London yesterday a new <a href="https://twitter.com/hashtag/PowerApp?src=hash&amp;ref_src=twsrc%5Etfw">#PowerApp</a> out - didn&#39;t quite manage it then but finished it off this morning. Using FaceAPI, match the person to their Twitter profile and show their tweets. Writing up for blog soon! Thanks to 2yr old for co-commentary... <a href="https://t.co/fSKqUrtBAH">pic.twitter.com/fSKqUrtBAH</a></p>&mdash; Kevin McDonnell #MSIgniteTheTour London (@kevmcdonk) <a href="https://twitter.com/kevmcdonk/status/1218533436572545026?ref_src=twsrc%5Etfw">January 18, 2020</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

## So how does it actually work?

In a simple summary, the app stores a list of people in a SharePoint list, the photos are uploaded to Azure Blob Storage and a Power Automate Flow is used to process the photos using Azure Cognitive Services. It would be great not to need the Blob Storage as that pushes the need up to the more expensive tier but the Face API Connector requires a public facing URL holding the image to be processed - strangely, the Face API itself can be called with a streamed image but that capability is not available in the Connector.

The Face API requires a Person Group to hold a list of people that can be matched against. An image can be processed to detect faces that are then added to a Person Group Person. Each of those Persons can then have a face compared with them to identify the likelihood that the face matches one of those. This is a little complex at times and using the [Face API documentation](https://westeurope.dev.cognitive.microsoft.com/docs/services/563879b61984550e40cbbe8d/operations/563879b61984550f30395236) to test the different calls can really help. This is especially true during testing as the Power Apps and Flow connectors don't allow you to delete a Person Group or Person.

## What's next?

There are still areas that need improving. Most notably, there is little error handling and support for things like the photo not detecting a face or the API calls failing for whatever reason. The list of people should also set up checks against the Person Group Persons to ensure that they exist and how many trained faces have been set.

It would also be interesting to try and pull out photos of someone from their Twitter handle so it could learn from Twitter rather than live photos. It would need a mechanism to pick whether the person was in the photo but that is possible. A little more work will be needed to check the media URLs held for the tweet which is why it hasn't happened yet.

This post has been kept as a high level overview but I will spend a bit of time to run through some of the details such as how to upload a photo as a blob, how to call detect face on that and how to link it to a Flow in later posts.

Finally, it's always nice to hear some feedback so let me know what you think. The PowerApp and Flows have been exported to GitHub at [https://github.com/kevmcdonk/ShowTheirTweetsApp](https://github.com/kevmcdonk/ShowTheirTweetsApp). 

 Image by [Song Zhen](https://www.flickr.com/photos/songzhen/) from [Flickr](https://www.flickr.com/photos/songzhen/16983146399)
 