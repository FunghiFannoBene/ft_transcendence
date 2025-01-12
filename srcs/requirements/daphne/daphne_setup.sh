#!/bin/bash

# Attivazione ambiente virtuale e installazione dei requisiti

/root/venv/bin/pip install -r /BACKEND/requirements.txt > /dev/null 2>&1

# Creazione e configurazione del file di log
mkdir -p /var/log
touch /var/log/daphne.log
chmod 666 /var/log/daphne.log

# Avvio di Daphne
exec /root/venv/bin/daphne -b 0.0.0.0 -p 8001 elx.omega_main.asgi:application
