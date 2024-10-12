FROM debian:bookworm

RUN apt-get update && apt-get install -y bash
RUN mkdir -p /django
RUN apt-get install -y python3 python3-venv python3-pip
RUN python3 -m venv /root/venv
#PYTHON INSTALL
RUN /root/venv/bin/pip install -r requirements.txt
#####

CMD ["/root/venv/bin/python", "manage.py", "runserver", "0.0.0.0:8000"]
