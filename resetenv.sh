#!/bin/zsh
psql -h localhost -U nerdfiles -d postgres << EOF
DROP DATABASE hn_heartbeat;
CREATE DATABASE hn_heartbeat;
EOF
python manage.py syncdb --all
