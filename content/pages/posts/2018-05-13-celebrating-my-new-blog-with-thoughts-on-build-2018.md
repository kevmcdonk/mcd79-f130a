---
layout: post
title: Celebrating my new blog with thoughts on Build 2018
date: '2018-05-13 21:13:01'
feature_image: '/assets/images/2018/05/kinect.jpeg'
---

After a year with a Delve based theme to my blog, I thought that it was time for a change, adding a little more to the template. And what better way to show that off than with my thoughts from the recent Build conference.

## Another year of evolution instead of revolution
I wouldn't say that I was completely disappointed but there was nothing that really surprised me this year. Lots of interesting updates appeared but nothing truly earth shattering. Many of the announcements had been trailed beforehand so while it was good to see the details, it was not a shock.

## AI for the masses is here to stay
While Microsoft are still going to continue with their machine learning tools, they see that where the real benefits lie is with making it easy for developers to use the services. There were more announcements around Cognitive Services at Build but also the open sourcing of Azure IoT Edge Runtime. The announcements around IoT were designed to make it easier to run the AI and machine learning on smaller devices and to bring the power to where it is needed. The partnership announced with DJI shows that Microsoft is taking the drone world seriously - Future Decoded showed an example of this last year where drones were being used to detect problems with power lines and there is much more opportunity for similar scenarios.

Read more at https://venturebeat.com/2018/05/07/microsoft-open-sources-azure-iot-edge-runtime-embraces-more-kubernetes-partners-with-dji-and-qualcomm/ and https://azure.microsoft.com/en-us/blog/what-s-new-with-azure-iot-edge/. 

Also evolving is the ability to run custom machine learning models on Windows 10 having built them in Azure. This opens up the possibility of running huge processing on massive volumes of data (whether it be documents, images or videos) and run much smaller models on lower power devices. Using powerful GPU or even FGPA driven servers in the cloud, you will be able to process large volumes of data for your models and then run them on a Raspberry Pi, building in image detection or text scanning. 

Read more at https://azure.microsoft.com/en-us/blog/azure-ai-platform-announcements-new-innovations-for-developers/.

## Kinect is back
This was a real surprise to me as I thought that Microsoft had decided to kill off the Kinect brand which I found a real shame. I played around with Kinect development a few years ago and found it very powerful so I am excited to see it return. It is backed now by the Azure AI cloud tools to offload much of the processing of what it sees. I expect to see far fewer games but far more useful gesture based applications being build from it.

Read more at https://www.linkedin.com/pulse/introducing-project-kinect-azure-alex-kipman/?irgwc=1 or https://developer.microsoft.com/en-us/perception.

![kinect](/assets/images/2018/05/kinect.jpeg)

## Mixed Reality Apps
HoloLens isn't going away any time soon and while it has not yet truly found its way as a mass market device, it is forming useful niches. The focus from Microsoft on Firstline Workers makes the benefits of handsfree collaborative working more important and HoloLens will form a key part of this, either in its current guise or in future versions as they evolve.

Build announced two new apps to support this:
* Layout - import 3-D models in to the app and use them to lay out in a real world scenario e.g. see how new stands could appear in a shop.
* Remote Assist - allows firstline workers to easily reach out to experts and share issues using the HoloLens video sharing e.g. an engineer struggling with a task could ask for help from a centrally located specialist team immediately instead of waiting for them to travel in.

These apps are interesting but it is more important to see new capabilities being developed with HoloLens as a tool - keep watching this space.

Read more at https://blogs.windows.com/windowsexperience/2018/05/07/introducing-two-new-mixed-reality-business-applications-microsoft-remote-assist-and-microsoft-layout/

## Collaborative coding with Visual Studio Live Share
One service announced at Build and now available is the ability to live collaborate on code using not only Visual Studio 2017 but also Visual Studio Code. Similar to using Skype for Business screen sharing where you can work on the same code at the same time but with the added benefit that any party connected can view other areas, not just the one the person is sharing. With pair programming still being popular, this will allow pairs to do the same tasks while not necessarily being physically located together.

It is hard to say how much I can see this being used. I often do code reviews and discuss work done on code with others, both others and my own code. Will I use this for it? I'm still not sure if this really adds more benefit than a simple screen sharing session but will certainly be giving it a try.

Read more at https://www.visualstudio.com/services/live-share/. 
![visual-studio-live-share-screen-1200x458](/assets/images/2018/05/visual-studio-live-share-screen-1200x458.jpg)

## .Net Core 3.0
We are finally seeing .Net Core take the jump to the UI rather than just being backend or web code. While it won't be live until 2019 (with a preview in 2018), it will offer UWP, WPF and Windows Forms implementation for Windows desktops, increasing performance and allowing much easier deployment - no need to have to install a full .Net framework first before running the application, it will all be rolled in to the app itself.

What is disappointing with this at the moment is that the UI will only work on Windows, breaking one of the major benefits of .Net Core being cross platform. This may change later down the line but it feels like a kick in the teeth as Electron and other frameworks which make it easier to create Progressive Web Apps that work on many platforms.

Read more at https://blogs.msdn.microsoft.com/dotnet/2018/05/07/net-core-3-and-support-for-windows-desktop-applications/. 

## Modern Meetings
Meetings feel like they haven't changed much since the advent of video conferencing took hold but thankfully Microsoft has given a sign of things hopefully to come. Being able to automatically transcribe meetings and assign actions to be tracked afterwards will help remove much of the unnecessary overhead of meetings. The technology is all now there and hopefully it can be harnessed together effectively and productively for all.

View more at https://www.youtube.com/watch?v=ddb3ZgAp9TA. 

## Openshift on Azure
While not an area that I have touched on much, the big news here is that Azure is the only cloud platform with the partnership with Red Hat to offer a fully managed and engineered version of OpenShift. I'm sure Google and Amazon won't rest on their laurels but it is great to see yet more signs of the new Microsoft opening itself up to new areas.

Read more at https://azure.microsoft.com/en-us/blog/openshift-on-azure-the-easiest-fully-managed-openshift-in-the-cloud/.

## Wrap up
I may have sounded negative at the start about Build but it was an indication that Microsoft are still travelling in the right direction. Opening up to many platforms, embracing the potential of AI and Machine Learning, supporting developers to deliver on requirements and preparing for an augmented reality explosion all help developers in the Microsoft space feel pretty confident right now.

