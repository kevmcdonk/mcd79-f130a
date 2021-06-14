---
layout: post
title: Building a bot to link to all your internal bots
date: '2017-05-11 18:37:19'
feature_image: '/assets/images/2017/05/spray.jpg'
tags:
- technical
- bots
- sharepoint-framework
---

Following on from my [last post about building components for your Digital Workplace](https://www.mcd79.com/why-you-should-build-components-and-connectors-for-your-intranet-not-a-gargangtuan-beast/) and not just one big project, I looked in to how you could use bots to help find information across the workplace. The problem is that there are already a plethora of different bots out there and different teams will want to create different bots for their specific scenarios. While internal governance can help this, updating a single bot to deal with every scenario is just not sustainable. Microsoft Teams has addressed this by allowing you to side-load multiple bots and use @ mentions to chat with them. What I was looking for was to use this on a Digital Workplace hub page (aka Intranet homepage).

####Getting bots on to the homepage

The first step was investigating how bots could interact on a web page. From the fantastic bot framework documentation, I found details of the [Web chat](https://docs.microsoft.com/en-us/bot-framework/embed-chat-control-web-page) tool (full details on [Github](https://github.com/Microsoft/BotFramework-WebChat)) that allowed you to embed the a bot on to any site with some simple html. This worked well with a single bot but there was no way to extend this and dynamically change the bot that was in use.

![Web chat](https://docs.microsoft.com/en-us/bot-framework/media/chatwidget-client.png)


####Back Channel to the rescue
That's when my love of a good technical podcast kicked in. I was listening to [Richard diZerega](https://twitter.com/richdizz) on the [Office 365 Developer podcast](https://dev.office.com/podcasts) talking about Contextual Bots in SharePoint (episode 118). He referred to a [blog post](https://blogs.msdn.microsoft.com/richard_dizeregas_blog/2017/02/15/sharepoint-framework-and-contextual-bots-via-back-channel/) that he had done on the subject and the Back Channel was the perfect route for a bot to be able to talk back to the bot channel and change details accordingly. This extended from the webchat project but allowed me to change the bot dynamically.

As this was going to be in SharePoint, I started off with a basic SPFX app in React. I chose React due to the larger number of samples available for SPFX, even though I was more comfortable in Angular. I also referred to the [React-bot-framework sample](https://github.com/SharePoint/sp-dev-fx-webparts/tree/master/samples/react-bot-framework) from the SharePoint repo in a few cases when things went a little wonky!

####Creating the SPFX app

I am intending to create a set of webparts that could be used in a Digital Workplace Hub page so set up the initial webpart under my [Hollis project](https://github.com/kevmcdonk/Hollis). Currently the webpart is called TheHubBot but I'm working on renaming that - who needs more things called TheHub...

The code makes use of [Direct Line](https://docs.botframework.com/en-us/restapi/directline3/#navtitle) to handle the calls to the Bot in a secure way so you will need to enable the DirectLine bot for any you use. The list of bots is held in the webpart configuration with the DirectLine ID for each used to talk to it.

    PropertyFieldCustomList('botList', {
                  label: 'Bots',
                  value: this.properties.botList,
                  headerText: 'List of bots that can be queried',
                  fields: [
                    { id: 'Title', title: 'Title', required: true, type: CustomListFieldType.string },
                    { id: 'DirectLineId', title: 'DirectLineId', required: true, type: CustomListFieldType.string }
                  ],
                  onPropertyChange: this.onPropertyPaneFieldChanged,
                  properties: this.properties,
                  context: this.context,
                  key: "botListField"
                })

The botConnection object is then subscribed for each of the bots configured in the list to listen to events from the bot itself. These events are filtered to look for any with an @ mention that matches the name of one of the bots. If these match, then it re-intialises the chat app with the new DirectLine Id.

    this.properties.botList.forEach((item, index) => {
    
      var botItem:IBotItem = this.properties.botList[index];
      botItem.InstanceId = this.context.instanceId;
      debugger;
      
      botConnection.activity$
      .filter(activity => activity.type == "message" && activity.from.id == "thehubbot" && activity.text.indexOf('@' + botItem.Title) > -1)
      .subscribe(a => {
          debugger;
        var act: any = a;
        var messageText = act.text;
        var botConnection = new DirectLine({
          secret: botItem.DirectLineId
        });
        
        var user = { id: "userid", name: "unknown" };
        var bot = { id: "userid", name: "unknown" };

        document.getElementById(botItem.InstanceId).innerHTML = '<div>loading</div>';
        // Initialize the BotChat.App with basic config data and the wrapper element
        App({
          user: user,
          bot: bot,
          botConnection: botConnection
        }, document.getElementById(botItem.InstanceId));
        console.log('Need to change the direct line bot');

        // Call the bot backchannel to give it user information
        botConnection
          .postActivity({ type: "event", name: "initializeBot", value: messageText, from: user })
          .subscribe(id => console.log("success initializing bot"));
        }
      );

####Writing the bot

I started off writing the bot in NodeJS as I had written bots in this before but I found a few too many challenges when it came to having multiple bots hosted on the same website. This wasn't essential to the overall architecture but it meant that I could limit the number of Azure Web Apps I was going to spin up. If anyone has a solution for this with NodeJS hosted bots, I would certainly love to hear from you.

I built the bot using the Bot Builder SDK and following the [Getting Started guidance](https://docs.microsoft.com/en-us/bot-framework/dotnet/bot-builder-dotnet-quickstart) in the Bot Framework documentation. All the code is available at https://github.com/kevmcdonk/HollisBots. 

I started with the main Messages Controller which would act as the inital bot to call. This would take the initial queries and then root them through to the relevant bot. As this would need to be natural language so that people did not need to use a specific syntax, I used the LUIS service that is part of the Microsoft's Cognitive Services. LUIS stands for Language Understanding Intelligence Services and is the engine that takes a phrase and detects what the intention for that is. You define a set of "intents" for it such as "How do I book leave" or "Where is the security policy" and extracts that as a common query. This means that it can understand "book holidays", "how do I book holidays" or "how to book hols" all as the same intent and route the bot to the appropriate answer. It can also extract entities from that so you could use it with Wikis to pull out the name of an application and send it to the right area within that, e.g. "How do I log in to Phoenix". It would recognise Phoenix as an entity and pass that to your bot logic.

You can read more about [Luis](https://azure.microsoft.com/en-gb/services/cognitive-services/language-understanding-intelligent-service/) and even try it out yourself without any programming.

I used the Luis service at https://luis.ai to set up intents for each of my core bots:

![Intents](/assets/images/2017/05/intents.PNG)

I have taken an export of these and placed in the [github repo](https://github.com/kevmcdonk/HollisBots/blob/master/HollisBots/The%20Hub%20Bot.json) if you want to use or just review. There isn't much detail right now but I will be adding further stuff.

I followed the Bot Framework documentation and had working a simple bot which matched the Intents and matched them to different bots:

    [LuisIntent("SearchPerson")]
        public async Task SearchPersonTask(IDialogContext context, LuisResult result)
        {
            await context.PostAsync("I will ask the @HubPersonBot: " + context.Activity.AsMessageActivity().Text);
            context.Wait(MessageReceived);
        }

        [LuisIntent("SearchInformation")]
        public async Task SearchInfoTask(IDialogContext context, LuisResult result)
        {
            await context.PostAsync("I will ask the @HubInfoBot: " + context.Activity.AsMessageActivity().Text);
            context.Wait(MessageReceived);
        }
        
        [LuisIntent("")]
        public async Task None(IDialogContext context, LuisResult result)
        {
            string message = "Sorry I did not understand.";
            IntentRecommendation bestBet =  this.BestIntentFrom(result);
            await context.PostAsync(message);
            context.Wait(MessageReceived);
        }

Anything that doesn't match get the default response at the end there. You will see that each matching intent returns a message saying that it will ask one of the bots with an @ mention. This is the mechanism that triggers the back channel. It could be asked directly if anyone knows how e.g. "@HubInfoBot how do I book leave?" but I wanted to make sure that people could use it without having to know the names of the different bots.

Each bot has its own Controller. They are fairly standard though with the main difference being the RoutePrefix - I will definitely be looking in to reducing the amount of code repeat in these.

    [RoutePrefix("/api/HubInfoMessages")]

Currently, the individual bots are very simple but will be extended to talk back and forth with the various SharePoint APIs to pull information, especially the search API - that will be something for a future blogpost.

This was the core of the bots and it was not too much trouble to pull this together once the core elements were worked out. So what was harder then?

####Working out the security and hiding my keys

Where I hit a lot of problems was how to add my code to Github without exposing the various keys involved. Much of the sample code has the Luis keys held in a LuisModel Attribute such as below from the bot framework documentation:

    [LuisModel("c413b2ef-382c-45bd-8ff0-f76d60e2a821", "6d0966209c6e4f6b835ce34492f3e6d9")]
    [Serializable]
    public class SimpleAlarmDialog : LuisDialog<object>
    {
        ...
    }

For the multi-authentication, I found a [great thread](https://github.com/Microsoft/BotBuilder/issues/2258#issuecomment-280506334) in the BotBuilder issues that supplied a way to use a MultiCredentialProvider. This allowed you to supply multiple keys in the class and would then try and match each bot against these. I [extended this class](https://github.com/kevmcdonk/HollisBots/blob/master/HollisBots/MultiCredentialProvider.cs) so that the list of bots was held in web.config. 

        public static Dictionary<string, string> GetBotList()
        {
            NameValueCollection section =
        (NameValueCollection)ConfigurationManager.GetSection("BotList");
            Dictionary<string, string> botList = new Dictionary<string, string>();
            foreach(string botName in section.AllKeys)
            {
                botList.Add(botName, section[botName]);
            }
            return botList;
        }

I then removed the config from web.config in to its own file named web.botlist.config which I added to .gitignore so that it was not exposed. I have added comments to the web.config file to explain the correct format:

    <BotList file="Web.botlist.config">
    <!--
    Add an entry for each Bot in a file named     web.botlist.config
    <add key="BotKey" value="BotPassword"/>
    -->
    </BotList>

This allowed each of the bots to be set up securely.

For the Luis config, I found this very hard due to my limited knowledge of Autofac. I read several threads that said this needed to be set up in the Autofac config but none of the examples worked outright. The best example I had to go on was the [AlarmBot sample](https://github.com/Microsoft/BotBuilder/tree/master/CSharp/Samples/AlarmBot) from the BotBuilder repo. This mostly worked although I found that with my own custom intents, this didn't work consistently.

After many iterations, the version that I found worked was mostly around the code in the controller:

    if (activity.Type == ActivityTypes.Message)
                {
                    //await Conversation.SendAsync(activity, () => new Dialogs.RootHubInfoDialog());
                    using (var scope = DialogModule.BeginLifetimeScope(this.scope, activity))
                    {
                        //var postToBot = scope.Resolve<IPostToBot>();
                        //await postToBot.PostAsync(activity, token);

                        await Conversation.SendAsync(activity, () => scope.Resolve<IDialog<object>>());
                    }
                }


The original version from AlarmBot is commented out and never worked for me. Resolving around the IDialog<object> was the key change. Also, in the HubModule.cs, it register each of the Luis attributes from the config file:

    NameValueCollection section = (NameValueCollection)ConfigurationManager.GetSection("LuisList");
            foreach (string luisId in section.AllKeys)
            {
                builder.Register(c => new LuisModelAttribute(luisId, section[luisId])).AsSelf().AsImplementedInterfaces().SingleInstance();
            }


For the Luis objects, they are registered in Autofac as:

    builder.RegisterType<RootHubInfoDialog>().As<IDialog<object>>().InstancePerDependency();
            builder.RegisterType<RootHubNewsDialog>().As<IDialog<object>>().InstancePerDependency();
            builder.RegisterType<RootHubPersonDialog>().As<IDialog<object>>().InstancePerDependency();

This gave a nice working version that you can chat to. I will update this post with a video shortly.


####So what is next?

The biggest work is to build out each of these bots with some sample content and get the bot searching SharePoint. However, first I would like to look at how I could integrate this in with the [PNP Intranet Starter](https://github.com/SharePoint/PnP/tree/master/Solutions/Business.StarterIntranet). This is a sample starter for an Intranet solution that I think could be extended further with more support.

For the main SPFX app, I would like to show a list of the bots configured on the screen and make it more obvious which bot you are talking to as well. 

There are lots of updates coming out with Build 2017 so it will be interesting to see if any of those can be built in as well.







