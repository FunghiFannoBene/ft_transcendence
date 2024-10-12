FROM debian:bookworm

RUN apt-get update && apt-get install -y bash
RUN mkdir -p /django
RUN apt-get update && apt-get install -y python3 python3-pip
RUN apt-get update && apt-get install -y python3.11-venv
#VIRTUAL ENV PYTHON3
RUN python3 -m venv /root/venv
RUN /root/venv/bin/pip install django

##NON IN USO ANCORA
RUN /root/venv/bin/pip install gunicorn
#####

#CMD ["python", "./django/main.py", "runserver"]
