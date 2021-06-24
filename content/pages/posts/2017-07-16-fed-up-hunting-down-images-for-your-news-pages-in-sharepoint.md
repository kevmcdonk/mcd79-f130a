---
layout: post
title: Fed up hunting down images for your news pages in SharePoint?
date: '2017-07-16 15:50:10'
content_img_path: 'images/2017/07/megaphone.jpg'
tags:
- technical
- stay-productive
- sharepoint
- sharepoint-framework
---

This may be a shock to many people but SharePoint is starting to get beautiful. After many years of large lists on a page, never ending documents or acres of white space, SharePoint is focussing more on images. Not just that but it is now easier to upload an image without having to move between different libraries as you often did before.

With [Communication Sites](https://www.youtube.com/watch?v=WEnQKzzbvfo), all this is changing. Large images are the way forward and easy to edit site layouts so most users can make a site look beautiful with some great examples on the [#CommSiteGallery](https://twitter.com/hashtag/CommSiteGallery?src=hash) hashtag on Twitter. However, if you don't have access to a great set of stock photos, how do you find the right content? That's where the Mcd79FindANewsImage webpart comes in - first though, here's the manual way.

> Not got Communications Site on your tenant yet? Check out [Marc Anderson's great blog](http://sympmarc.com/2017/06/29/want-to-get-a-look-at-the-new-communication-sites-heres-a-trick/) to find a trick to enable it for some people. Or if you want to understand a bit about them, check out the [Sharegate blog](https://en.share-gate.com/blog/sharepoint-online-communication-sites-explained).

## Finding images for news pages

I have tended to use three main sources for finding images - Bing, Google and Flickr. This is pretty simple to find specific things but it is important that you consider the licensing options for images. Below are three screenshots of how to set filters on the image search to ensure that you can re-use the license - make sure you read some of the details, depending on whether it is for commercial use or not.

![Bing filtering](/images/2017/07/Bing-filtering.JPG)
![Google filtering](/images/2017/07/Google-filtering.JPG)
![Flickr filtering](/images/2017/07/Flickr-filtering.JPG)

However, I have never found it quite as simple as that. For example, searching for collaboration brings all sorts of random things back. My favourite of the sources is Flickr as you get far more photos of real people that are more generic. Instead of just searching for collaboration, search around similar phrases like "working together" or "togetherness". These less specific phrases tend to bring out more images and more options.

Also, use the filters to help get the right size and orientation for the image that you want. Landscape and panorama photos work best for a news page.

Susan Hanley also identified the following stock photo sites on her very useful 8 tips to get started with SharePoint Communication sites post.

- Pexels.com
- Pixabay.com
- Unsplash.com
- Everypixel.com
- Stocksnap.io

This does still require you to download the image somewhere and then upload it to the site. In this world of automation, we should be able to do better than that.

## The Mcd79 Find a News Image web part

The initial version is quite simple. Edit the webpart and you can open a search box to select an image. By default, it will search for the page title and bring back the first image. Once you choose the image and publish the page, it will also use this as the roll up image on the news listing page as well. 

<iframe width="560" height="315" src="https://www.youtube.com/embed/IymUSZcnzCM" frameborder="0" allowfullscreen></iframe>

It is a first version and plenty more that can be done with it. Currently, the Azure Function only uses Bing to search for images. I'd like to expand this to Google and Flickr as well. More filters should be added so that you can select specific orientations and sizes and further details on the licensing. Finally, it would be great if it saved the image to SharePoint and referenced that to reduce cross site warnings.

You can take a look at the code on my [Github page](https://github.com/kevmcdonk/Mcd79FindNewsImage) and I will be covering it in detail over the next few blogs. Feel free to use as it is now and feedback on [Twitter](https://twitter.com/kevmcdonk) for any problems or suggestions.
