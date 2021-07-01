---
layout: post
title: Problems with retrieving group calendars in PowerApps
date: '2018-01-13 11:01:36'
content_img_path: 'images/2018/01/holzfigur-980784_1920.jpg'
tags:
- technical
- powerapps
- stuck
- help
---

I had a challenge recently where someone wanted to be able to show an Outlook calendar on a board with everyone's assignments on it. It sounded like a common thing to do but while there was the Journal view, that could only show a day or two at a time - they wanted to see what people were up to for that week. We tried a few different ideas but I kept coming back to PowerApps. I knew you could connect to Outlook so it seemed the right place to start and be able to customise without a full development project needed.

I started with pulling back my own calendar and had that showing nicely. I used the [Office365 connector](https://docs.microsoft.com/en-us/connectors/office365/) from the [list of connectors](https://docs.microsoft.com/en-us/connectors/). I added a gallery to show the items and then used ClearCollect to pull the data in to a collection that the gallery was linked to:

ClearCollect(CalItems, Office365.GetEventsCalendarViewV2("AQMkCDgyOTgxOTFlLWIxYTujNDgwMS04ZmQ0LWUwZmQ4Zjk0YWIzMABGAAAD2RtBjD8Jk0i4KA3NAvHSRAcAnklFNo4RR0yOoHVpIVJ1nQAAAgEGAAAAnklFNo7CC0yOoHVpIVJ1nQAAAhjZAAAA","2018-01-01","2018-02-01",{}).value) 

![](/images/2018/01/Initial-PowerApp-screenshot.JPG)

So this was lovely and all worked. Next I thought, let's try with an Office 365 Group calendar.....hmmm, how would that work? I checked the [Groups preview connector](https://docs.microsoft.com/en-us/connectors/office365groups/) but there was no way to get a calendar. I used the Microsoft Graph Explorer to see if I could get an ID for the calendar in the graph but while I could get a Group ID, there was no way to get a calendar ID. However, in the graph API, I could see that you could return events for a group - bingo! Surely it would be easy to [create a Swagger file for the graph using Postman](https://blogs.msdn.microsoft.com/softwaresimian/2017/10/05/using-postman-to-call-the-graph-api-using-azure-active-directory-aad/) (thanks to Software Simian aka [Ross Smith](https://twitter.com/ross_p_smith)). I did all this and created a custom connector with this in the PowerApps web version. Then I added this connector to my app and I had the events from the Group calendar. I was finished!....

...or so I thought. Because when I tried to filter the items by date to have a gallery per day, I found that it wasn't returning start or end date. With PowerApps now, you can view a collection so I had a look at the one I was returning. 

![](/images/2018/01/PowerApps-created-date-and-end-date.JPG)

Created Date came back fine but the end date was an object so I went deeper:

![](/images/2018/01/PowerApps-blank-end-date.JPG)

The timezone was coming back but no actual date. I went back to the Custom Connector and ran a test against the API:

![](/images/2018/01/Custom-Connector-Response.JPG)

The start dateTime was being returned but I noticed that it was in a different format and that is where I have hit the brick wall. I have tried changing the Swagger file to treat this as text but the schema validation fails saying that it found a datetime format instead. [Marc La Fleur](https://twitter.com/mlafleur) has kindly offered to take a look so this blog is largely for him to take a look but anyone else who has some ideas would be very welcome! Below is the Swagger file I used with the Group ID removed.

```
{
  "swagger": "2.0",
  "info": {
    "version": "1.0.0",
    "title": "ScheduleViewerGraphConnector",
    "description": "ScheduleViewerGraphConnector"
  },
  "host": "graph.microsoft.com",
  "basePath": "/",
  "schemes": [
    "https"
  ],
  "consumes": [],
  "produces": [
    "application/json"
  ],
  "paths": {
    "/v1.0/groups/{GROUPID}/calendarview": {
      "get": {
        "summary": "GetEventsForGroup",
        "description": "GetEventsForGroup",
        "operationId": "GetEventsForGroup",
        "parameters": [
          {
            "name": "startdatetime",
            "default": "2016-11-04T14:03:33.42Z",
            "in": "query",
            "type": "string",
            "required": true,
            "x-ms-summary": "startdatetime"
          },
          {
            "name": "enddatetime",
            "default": "2017-12-03T14:03:33.42Z",
            "in": "query",
            "type": "string",
            "required": true,
            "x-ms-summary": "enddatetime"
          }
        ],
        "responses": {
          "200": {
            "description": "200",
            "schema": {
              "type": "object",
              "properties": {
                "@odata.context": {
                  "type": "string",
                  "description": "@odata.context",
                  "x-ms-summary": "@odata.context"
                },
                "value": {
                  "type": "array",
                  "items": {
                    "type": "object",
                    "properties": {
                      "@odata.etag": {
                        "type": "string",
                        "description": "@odata.etag",
                        "x-ms-summary": "@odata.etag"
                      },
                      "id": {
                        "type": "string",
                        "description": "id",
                        "x-ms-summary": "id"
                      },
                      "createdDateTime": {
                        "type": "string",
                        "format": "date-time",
                        "description": "createdDateTime",
                        "x-ms-summary": "createdDateTime"
                      },
                      "lastModifiedDateTime": {
                        "type": "string",
                        "format": "date-time",
                        "description": "lastModifiedDateTime",
                        "x-ms-summary": "lastModifiedDateTime"
                      },
                      "changeKey": {
                        "type": "string",
                        "description": "changeKey",
                        "x-ms-summary": "changeKey"
                      },
                      "categories": {
                        "type": "array",
                        "items": {
                          "type": "string"
                        },
                        "description": "categories",
                        "x-ms-summary": "categories"
                      },
                      "originalStartTimeZone": {
                        "type": "string",
                        "description": "originalStartTimeZone",
                        "x-ms-summary": "originalStartTimeZone"
                      },
                      "originalEndTimeZone": {
                        "type": "string",
                        "description": "originalEndTimeZone",
                        "x-ms-summary": "originalEndTimeZone"
                      },
                      "iCalUId": {
                        "type": "string",
                        "description": "iCalUId",
                        "x-ms-summary": "iCalUId"
                      },
                      "reminderMinutesBeforeStart": {
                        "type": "integer",
                        "format": "int32",
                        "description": "reminderMinutesBeforeStart",
                        "x-ms-summary": "reminderMinutesBeforeStart"
                      },
                      "isReminderOn": {
                        "type": "boolean",
                        "description": "isReminderOn",
                        "x-ms-summary": "isReminderOn"
                      },
                      "hasAttachments": {
                        "type": "boolean",
                        "description": "hasAttachments",
                        "x-ms-summary": "hasAttachments"
                      },
                      "subject": {
                        "type": "string",
                        "description": "subject",
                        "x-ms-summary": "subject"
                      },
                      "bodyPreview": {
                        "type": "string",
                        "description": "bodyPreview",
                        "x-ms-summary": "bodyPreview"
                      },
                      "importance": {
                        "type": "string",
                        "description": "importance",
                        "x-ms-summary": "importance"
                      },
                      "sensitivity": {
                        "type": "string",
                        "description": "sensitivity",
                        "x-ms-summary": "sensitivity"
                      },
                      "isAllDay": {
                        "type": "boolean",
                        "description": "isAllDay",
                        "x-ms-summary": "isAllDay"
                      },
                      "isCancelled": {
                        "type": "boolean",
                        "description": "isCancelled",
                        "x-ms-summary": "isCancelled"
                      },
                      "isOrganizer": {
                        "type": "boolean",
                        "description": "isOrganizer",
                        "x-ms-summary": "isOrganizer"
                      },
                      "responseRequested": {
                        "type": "boolean",
                        "description": "responseRequested",
                        "x-ms-summary": "responseRequested"
                      },
                      "seriesMasterId": {
                        "type": "string",
                        "description": "seriesMasterId",
                        "x-ms-summary": "seriesMasterId"
                      },
                      "showAs": {
                        "type": "string",
                        "description": "showAs",
                        "x-ms-summary": "showAs"
                      },
                      "type": {
                        "type": "string",
                        "description": "type",
                        "x-ms-summary": "type"
                      },
                      "webLink": {
                        "type": "string",
                        "description": "webLink",
                        "x-ms-summary": "webLink"
                      },
                      "onlineMeetingUrl": {
                        "type": "string",
                        "description": "onlineMeetingUrl",
                        "x-ms-summary": "onlineMeetingUrl"
                      },
                      "responseStatus": {
                        "type": "object",
                        "properties": {
                          "response": {
                            "type": "string",
                            "description": "response",
                            "x-ms-summary": "response"
                          },
                          "time": {
                            "type": "string",
                            "format": "date-time",
                            "description": "time",
                            "x-ms-summary": "time"
                          }
                        },
                        "description": "responseStatus",
                        "x-ms-summary": "responseStatus"
                      },
                      "body": {
                        "type": "object",
                        "properties": {
                          "contentType": {
                            "type": "string",
                            "description": "contentType",
                            "x-ms-summary": "contentType"
                          },
                          "content": {
                            "type": "string",
                            "description": "content",
                            "x-ms-summary": "content"
                          }
                        },
                        "description": "body",
                        "x-ms-summary": "body"
                      },
                      "start": {
                        "type": "object",
                        "properties": {
                          "dateTime": {
                            "type": "string",
                            "format": "date-time",
                            "description": "dateTime",
                            "x-ms-summary": "dateTime"
                          },
                          "timeZone": {
                            "type": "string",
                            "description": "timeZone",
                            "x-ms-summary": "timeZone"
                          }
                        },
                        "description": "start",
                        "x-ms-summary": "start"
                      },
                      "end": {
                        "type": "object",
                        "properties": {
                          "dateTime": {
                            "type": "string",
                            "format": "date-time",
                            "description": "dateTime",
                            "x-ms-summary": "dateTime"
                          },
                          "timeZone": {
                            "type": "string",
                            "description": "timeZone",
                            "x-ms-summary": "timeZone"
                          }
                        },
                        "description": "end",
                        "x-ms-summary": "end"
                      },
                      "location": {
                        "type": "object",
                        "properties": {
                          "displayName": {
                            "type": "string",
                            "description": "displayName",
                            "x-ms-summary": "displayName"
                          },
                          "address": {
                            "type": "object",
                            "properties": {},
                            "description": "address",
                            "x-ms-summary": "address"
                          }
                        },
                        "description": "location",
                        "x-ms-summary": "location"
                      },
                      "recurrence": {
                        "type": "string",
                        "description": "recurrence",
                        "x-ms-summary": "recurrence"
                      },
                      "attendees": {
                        "type": "array",
                        "items": {
                          "type": "object",
                          "properties": {
                            "type": {
                              "type": "string",
                              "description": "type",
                              "x-ms-summary": "type"
                            },
                            "status": {
                              "type": "object",
                              "properties": {
                                "response": {
                                  "type": "string",
                                  "description": "response",
                                  "x-ms-summary": "response"
                                },
                                "time": {
                                  "type": "string",
                                  "format": "date-time",
                                  "description": "time",
                                  "x-ms-summary": "time"
                                }
                              },
                              "description": "status",
                              "x-ms-summary": "status"
                            },
                            "emailAddress": {
                              "type": "object",
                              "properties": {
                                "name": {
                                  "type": "string",
                                  "description": "name",
                                  "x-ms-summary": "name"
                                },
                                "address": {
                                  "type": "string",
                                  "description": "address",
                                  "x-ms-summary": "address"
                                }
                              },
                              "description": "emailAddress",
                              "x-ms-summary": "emailAddress"
                            }
                          }
                        },
                        "description": "attendees",
                        "x-ms-summary": "attendees"
                      },
                      "organizer": {
                        "type": "object",
                        "properties": {
                          "emailAddress": {
                            "type": "object",
                            "properties": {
                              "name": {
                                "type": "string",
                                "description": "name",
                                "x-ms-summary": "name"
                              },
                              "address": {
                                "type": "string",
                                "description": "address",
                                "x-ms-summary": "address"
                              }
                            },
                            "description": "emailAddress",
                            "x-ms-summary": "emailAddress"
                          }
                        },
                        "description": "organizer",
                        "x-ms-summary": "organizer"
                      }
                    }
                  },
                  "description": "value",
                  "x-ms-summary": "value"
                }
              }
            }
          }
        }
      }
    },
    "/v1.0/me/memberOf": {
      "get": {
        "summary": "GetGroups",
        "description": "GetGroups",
        "operationId": "GetGroups",
        "parameters": [],
        "responses": {
          "default": {
            "description": "default",
            "schema": {
              "type": "string"
            }
          }
        }
      }
    },
    "/v1.0/groups/{GROUPID}/calendar/events": {
      "post": {
        "summary": "CreateEvent",
        "description": "CreateEvent",
        "operationId": "CreateEvent",
        "parameters": [
          {
            "name": "Content-Type",
            "in": "header",
            "required": true,
            "type": "string",
            "default": " application/json",
            "description": "Content-Type",
            "x-ms-summary": "Content-Type"
          },
          {
            "name": "body",
            "in": "body",
            "schema": {
              "type": "object",
              "properties": {
                "subject": {
                  "type": "string",
                  "description": "subject",
                  "x-ms-summary": "subject"
                },
                "isAllDay": {
                  "type": "boolean",
                  "description": "isAllDay",
                  "x-ms-summary": "isAllDay"
                },
                "body": {
                  "type": "object",
                  "properties": {
                    "contentType": {
                      "type": "string",
                      "description": "contentType",
                      "x-ms-summary": "contentType"
                    },
                    "content": {
                      "type": "string",
                      "description": "content",
                      "x-ms-summary": "content"
                    }
                  },
                  "description": "body",
                  "x-ms-summary": "body"
                },
                "start": {
                  "type": "object",
                  "properties": {
                    "dateTime": {
                      "type": "string",
                      "format": "date-time",
                      "description": "dateTime",
                      "x-ms-summary": "dateTime"
                    },
                    "timeZone": {
                      "type": "string",
                      "description": "timeZone",
                      "x-ms-summary": "timeZone"
                    }
                  },
                  "description": "start",
                  "x-ms-summary": "start"
                },
                "end": {
                  "type": "object",
                  "properties": {
                    "dateTime": {
                      "type": "string",
                      "format": "date-time",
                      "description": "dateTime",
                      "x-ms-summary": "dateTime"
                    },
                    "timeZone": {
                      "type": "string",
                      "description": "timeZone",
                      "x-ms-summary": "timeZone"
                    }
                  },
                  "description": "end",
                  "x-ms-summary": "end"
                },
                "location": {
                  "type": "object",
                  "properties": {
                    "displayName": {
                      "type": "string",
                      "description": "displayName",
                      "x-ms-summary": "displayName"
                    }
                  },
                  "description": "location",
                  "x-ms-summary": "location"
                },
                "attendees": {
                  "type": "array",
                  "items": {
                    "type": "object",
                    "properties": {
                      "emailAddress": {
                        "type": "object",
                        "properties": {
                          "address": {
                            "type": "string",
                            "description": "address",
                            "x-ms-summary": "address"
                          },
                          "name": {
                            "type": "string",
                            "description": "name",
                            "x-ms-summary": "name"
                          }
                        },
                        "description": "emailAddress",
                        "x-ms-summary": "emailAddress"
                      },
                      "type": {
                        "type": "string",
                        "description": "type",
                        "x-ms-summary": "type"
                      }
                    }
                  },
                  "description": "attendees",
                  "x-ms-summary": "attendees"
                }
              },
              "default": {
                "subject": "Test",
                "isAllDay": true,
                "body": {
                  "contentType": "HTML",
                  "content": "Test"
                },
                "start": {
                  "dateTime": "2017-12-04T00:00:00",
                  "timeZone": "GMT"
                },
                "end": {
                  "dateTime": "2017-12-05T00:00:00",
                  "timeZone": "GMT"
                },
                "location": {
                  "displayName": "Test"
                },
                "attendees": [
                  {
                    "emailAddress": {
                      "address": "andrew@bcmcd.onmicrosoft.com",
                      "name": "Andrew Chalmers"
                    },
                    "type": "required"
                  }
                ]
              }
            },
            "required": true
          }
        ],
        "responses": {
          "default": {
            "description": "default",
            "schema": {
              "type": "string"
            }
          }
        }
      }
    }
  },
  "definitions": {},
  "parameters": {},
  "responses": {},
  "securityDefinitions": {
    "OAuth": {
      "type": "oauth2",
      "authorizationUrl": "https://login.windows.net/common/oauth2/authorize",
      "tokenUrl": "https://your.token.url/here",
      "flow": "accessCode"
    }
  },
  "security": [
    {}
  ],
  "tags": []
}
```

 
