FROM debian:bookworm

# Installazione di base
RUN apt-get update && apt-get install -y bash python3 python3-venv python3-pip openssl

# Creazione ambiente virtuale
RUN python3 -m venv /root/venv

RUN mkdir -p /var/log && \
    touch /var/log/daphne.log && \
    chmod 666 /var/log/daphne.log

COPY daphne_setup.sh .
RUN chmod +x daphne_setup.sh
# Creazione directory per il progetto
RUN echo "source /root/venv/bin/activate" >> /root/.bashrc
RUN mkdir -p /BACKEND
WORKDIR /BACKEND
ENV PYTHONPATH="/BACKEND:$PYTHONPATH"

# Entrypoint per avviare Daphne
CMD ["/daphne_setup.sh"]
