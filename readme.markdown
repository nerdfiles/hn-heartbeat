#HN-Heartbeat

A 'heartbeat' web application for Hacker News members' karma.

##API Key

    API key: 0334ee90bff64f228d4a02bbec774289

###Examples

See http://hndroidapi.appspot.com/.

    Canonical: http://hndroidapi.appspot.com/news/format/json/page/?appid=&callback=&guid=0334ee90bff64f228d4a02bbec774289
    Submitted: http://hndroidapi.appspot.com/submitted/format/json/user/qhoxie?appid=&callback=&guid=0334ee90bff64f228d4a02bbec774289

##Requirements

See ``requirements.txt``.

###Overview

Grab the points received from user's submissions - https://news.ycombinator.com/submitted?id=neilkelty - and from their comments - https://news.ycombinator.com/threads?id=neilkelty - and then graph the data out.

###Expected Views

1. On the landing page, user enters their HN ID
2. On the main page, user is presented with a line chart showing their Karma score over time (3 lines - 1 for karma from submissions, 1 for karma from comments, and the combined total).
3. Then just display out below the chart a nicely displayed list of each submission, comment, date, and karma points.

##Admins

1. nerdfiles (nerdfiles@gmail.com)
2. mjhea0 (on gun.io)

##Seed Notes

Seeded from https://github.com/BeshoyLouka/Zincify.
