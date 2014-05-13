#HN-Heartbeat

A 'heartbeat' web application for Hacker News members' karma.

##Overview

This is a Backbone.js/Marionette application with Python/Django backend and  
REST-ful API which depends on Django REST Framework. Grunt.js and Twitter's  
Bower are used for automation via JavaScript and frontend library/package  
management.

The app follows a custom RequireJS + Marionette architecture for modular view  
style, behaviors, and JavaScript resources. Effectively, "apps" (modules)  
reveal modular views for re-use and lazily loaded resources.

##MVP Spec

1. On the landing page, user enters their HN ID
2. On the main page, user is presented with a line chart showing their Karma  
   score over time (3 lines - 1 for karma from submissions, 1 for karma from  
   comments, and the combined total).
3. Then just display out below the chart a nicely displayed list of each  
   submission, comment, date, and karma points.

###Future Goals

Enable a broader definition of "user" to include all popular social networks,  
fitting content to a "karma" model. Concepts such as "liking" can be treated  
analogously as an "upvote"; and these can be applied to any type of content, 
where it is a "comment", "post". 

A singular post can be treated as a simple Hypermedia object which may have  
various interaction handles depending on the type of post that it is, which  
exposes a content type: text, image, etc.

A user can be given a time series graph which exposes over time the behavior  
of their posting habits in terms of the implied Hypermedia Persona, given the  
coupling of second-order content ("post", etc.) to first-order content  
("image", etc.).

##Development

Please review ``Gruntfile.js`` for available tasks.

###Run-down

1. ``bower update`` and ``grunt update`` are your friends.
2. ``bower install [library_name] --save-dev`` for new frontend components/packages.
3. ``grunt install; grunt watch`` to watch LESS and CoffeeScript directories.

##Official HN API (or the "blessed" API)

See ``https://www.hnsearch.com/api``.

    Canonical: http://api.thriftdb.com/api.hnsearch.com/[items|users]/_search?
    Date Range: http://api.thriftdb.com/api.hnsearch.com/items/_search?username=yog&filter[fields][create_ts]=[2013-05-01T00:00:00Z%20+%20TO%20+%20*]&pretty_print=true

##Admins

1. nerdfiles (nerdfiles@gmail.com)
2. mjhea0 (on gun.io)

##Requirements

See ``requirements.txt``.

    $ pip install -r requirements.txt

###For OS X

####Pillow

    $ export CPPFLAGS=-Qunused-arguments
    $ export CFLAGS=-Qunused-arguments

####PostgreSQL

    $ brew install postgresql
