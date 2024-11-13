FROM debian:bookworm

RUN apt-get update && apt-get install -y bash
RUN mkdir -p /django
RUN apt-get install -y python3 python3-venv python3-pip
RUN python3 -m venv /root/venv
ENV PATH="/venv/bin:$PATH"
ARG UID=1000
ARG GID=1000
RUN groupadd -g $GID user && useradd -m -u $UID -g $GID user
RUN chown -R 1000:1000 /django

# PYTHON INSTALL
COPY requirements.txt .
RUN /root/venv/bin/pip install -r requirements.txt

# Comando per avviare il server Django
CMD ["/root/venv/bin/python3", "/django/drf/manage.py", "runserver", "0.0.0.0:8000"]
