---
layout: post
title: Tracking actions from meetings just got much easier thanks to Microsoft's To-Do
  and One-Note
date: '2017-05-07 21:07:37'
---

I have a confession to make. I don't hate meetings. Most conversations and reading that I have done suggests that I'm in the minority here. Wasted time, lack of follow up and running round in circles are the common problems I hear. So why don't I find these time wasters so bad?

There are plenty of detailed posts out there on how to ensure that you set an agenda for a meeting correctly, pushing a focused meeting that doesn't deviate and ending a meeting when that aim is met, not using up time for the sake of it. For me, it's the time needed afterwards to get the most out of it that gets me. Discussion on the right topics and making sure that everyone is thinking a similar way is so important but if you end the meeting and that is the end of it, then it is time wasted. Those good ideas discussed are just ideas and without any follow up, then they are gone.

####Taking notes that you can do something with

This blog appears to becoming a confession blog. I confess that I am a OneNote addict. For about four years now, I have used OneNote mostly on my Surface tablet and phone. Why? Mostly because I like the freedom of scribbled notes that act as enough of a reminder for me to remember what I needed. Paper notebooks are still great at this as you don't need to have a set format and can let the topic evolve as you see fit. They can be artistic, simplistic, scientific or just basic. What they don't offer though is the searchability and findability that a digital solution can offer and for me, that is where OneNote meets all that I need. With my Surface and pen, I can scribble notes as I do on paper, creating a page for each meeting but then quickly reference back either to that meeting through different notebooks or by searching for my scribbled text.

If you need to add more, such as when you need to take a photo from the screen, you can easily embed that photo in to your notes. When you realise that the order you wrote things is wrong, then you can quickly re-order the written notes. This is something I do regularly at talks and conferences to save time copying out exactly what is said. OneNote makes it easy to capture what you need and get back to it. So that's it, right?

####Following up on actionable tasks

OK, that heading is a little tongue in cheek for fans of buzzword bingo. But the reality is that it has always been easy to take notes but to turn these in to things that you can track and make sure happen has always been harder. Some projects and teams set someone to track minutes for each meeting but this is not always natural for people and is easy to let slip. Someone takes the notes but then doesn't capture those tasks in to your task tracking tool.

####Did you know that in OneNote, you can now track an item as an Outlook task? 

Slightly confusingly, there are two versions of Outlook for Windows users - the core desktop version (OneNote 2016) and the Windows Store version (OneNote for Windows 10). If you are using OneNote 2016, then you have the option to set a to-do item and have this as an Outlook Task. Under the Home Menu, you can mark a line as being a To-Do task and then you can right click on that line to have it added as an Outlook task.

![Adding an Outlook task in OneNote](/assets/images/2017/05/Outlook-tasks-in-OneNote.PNG)

Many people will see this and say that they don't like using Outlook but that is where To-Do comes in. Outlook tasks from Office 365 are now synced back to To-Do where it will be appear as a suggested task for that day. Tag it in OneNote and it will appear in your mobile app as your daily to-do!

![Showing the task in To-Do](/assets/images/2017/05/MS-To-Do.jpg)

I had a great chat at the last #SUGUK session in London with Bill Ayers and Chris O'Brien about capturing tasks in meetings and that spurned an idea to take a look at the OneNote API to pull through tasks given a specific notation. What I love is that it wasn't anywhere near as hard as that!

With the tasks in Outlook and To-Do, you can also set up a daily schedule in Flow for any items assigned to you for anyone who is more comfortable with using email for tracking items. I have also set up a Flow which picks up certain codes from a task and assigns it in to SharePoint to track actions rather than just having generic tasks for each person.

####So what is missing?

While you can assign tasks to a SharePoint list, if you are a fan of Microsoft Teams and using Planner with it, there is currently not a way to trigger that using Flow. I think with the benefits of Teams integration, Planner will become more popular as a task tracking tool and I hope this will expand to be more available through Flow and Custom APIs. You could also use other tools such as Jira with Flow already if you are using them.

Given this, I think it would be great to have OneNote tasks pushing straight to Planner or other task tracking tools directly. Maybe this is where the API will kick in and could even be a future blog post...