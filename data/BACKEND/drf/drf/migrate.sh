#!/bin/bash

docker exec -it backend /root/venv/bin/python3 /django/drf/manage.py migrate