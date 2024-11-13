FROM debian:bullseye

RUN apt-get update && apt-get upgrade && apt-get clean -y

RUN apt install -y nginx openssl

RUN mkdir -p /etc/nginx/ssl

RUN mkdir -p /etc/nginx/certs

RUN openssl req \
    -x509 \
    -nodes \
    -days 365 \
    -newkey rsa:2048 \
    -keyout /etc/nginx/ssl/Inception.key \
    -out /etc/nginx/certs/Inception.crt \
    -subj "/C=IT/ST=Italy/L=Padova/O=42Firenze/OU=1/CN=shhuang.42.fr"

RUN echo "ssl_certificate /etc/nginx/certs/Inception.crt;\nssl_certificate_key /etc/nginx/ssl/Inception.key;" > /etc/nginx/snippets/certificate.conf

#RUN openssl ecparam -genkey -name secp384r1 -out /etc/nginx/ssl/ecdhe.key

RUN openssl dhparam -out /etc/nginx/dhparam.pem 2048
COPY ./conf/ssl-params.conf /etc/nginx/snippets/

RUN if [ -f /etc/nginx/sites-available/default ]; then rm /etc/nginx/sites-available/default; fi

RUN if [ -L /etc/nginx/sites-enabled/default ]; then rm /etc/nginx/sites-enabled/default; fi

COPY ./conf/default    /etc/nginx/sites-available/

RUN ln -s /etc/nginx/sites-available/default /etc/nginx/sites-enabled/

CMD ["nginx", "-g", "daemon off;"]
#-g configurazione globale che permette di passsare comandi
#daemon off per non avviare nginx in background perchè il container lo vuole attivo
