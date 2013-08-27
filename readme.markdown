#HN-Heartbeat

A 'heartbeat' web application for Hacker News members' karma.

##MVP Spec

1. On the landing page, user enters their HN ID
2. On the main page, user is presented with a line chart showing their Karma score over time (3 lines - 1 for karma from submissions, 1 for karma from comments, and the combined total).
3. Then just display out below the chart a nicely displayed list of each submission, comment, date, and karma points.

##Development

Please review ``Gruntfile.js`` for available tasks.

###Run-down

1. ``bower update`` and ``grunt update`` are your friends.
2. ``bower install [library_name] --save-dev`` for new frontend components/packages.
3. ``grunt watch`` to watch LESS and CoffeeScript directories.

##Official HN API (or the "blessed" API)

See ``https://www.hnsearch.com/api``.

    Canonical: http://api.thriftdb.com/api.hnsearch.com/[items|users]/_search?
    Date Range: http://api.thriftdb.com/api.hnsearch.com/items/_search?username=yog&filter[fields][create_ts]=[2013-05-01T00:00:00Z%20+%20TO%20+%20*]&pretty_print=true

##Admins

1. nerdfiles (nerdfiles@gmail.com)
2. mjhea0 (on gun.io)

##Requirements

See ``requirements.txt``.

##Seed Notes

Seeded from https://github.com/BeshoyLouka/Zincify.
