#### TARGETS ####
# better readability + clearly indicates which targets are not associated with actual files
.PHONY: all build down re remove_image echo own-backend venv check-migrate migrate database_login stop backend debug-backend nginx-reload nginx-rebuild rebuild-backend database_rebuild full-reset clean-all full-clean-all restart-container insert-grafana retrieve-grafana PUSH git-reset remove-gitcache

.SILENT:

### VARIABLES ###
PROJECT_NAME = ft_transcendence
COMPOSE =
COMPOSE_PATH = srcs/docker-compose.yml
USER = shhuang

# detecting OS
UNAME_S := ${shell uname -s}
# adjust based on OS
ifeq (${UNAME_S}, Darwin) # MacOS
    COMPOSE = docker compose
	ADJUST_REQ = cp os-specific/requirements.mac.txt requirements.txt
else ifeq (${UNAME_S}, Linux) # Linux
	ifeq (${shell test -d /nfs/homes/ && echo -n yes},yes)
		COMPOSE = /nfs/homes/${USER}/sgoinfre/bin/docker compose
	else
		COMPOSE = sudo docker compose
	endif
	ADJUST_REQ = cp os-specific/requirements.ubuntu.txt requirements.txt
endif

### RULES ###
all: build
	-@sudo service docker start

build:
	echo "${WHITE}Welcome to ${MAGENTA}${PROJECT_NAME} 🏓${DEF_COLOR}\n"
	sleep 1
	${ADJUST_REQ}
	echo "----------\n"\
	"${RED}Detecting OS...${WHITE} Seems like you're on ${GREEN}${UNAME_S}${WHITE}!\n"\
	"Adjusting Makefile and requirements.txt to make sure everything runs smoothly.\n"\
	"${YELLOW}It'll just take a sec ;P${DEF_COLOR}\n"\
	"----------\n"
	sleep 1
	${COMPOSE} -f ${COMPOSE_PATH} -p ${PROJECT_NAME} up --build -d

down:
	${COMPOSE} -f ${COMPOSE_PATH} -p ${PROJECT_NAME} down
re:
	${COMPOSE} -f ${COMPOSE_PATH} restart redis nginx backend daphne

remove_image:
	docker rmi ${docker images -q}

echo:
	echo ${BACKEND_DIR}

own-backend:
	sudo chown -R $(USER): ~/${PROJECT_NAME}/data/BACKEND

venv:
	source ~/${PROJECT_NAME}/data/BACKEND/venv/bin/activate

check-migrate:
	docker exec -it backend /root/venv/bin/python3 /${BACKEND_DIR}/${PROJECT_NAME}/manage.py makemigrations

migrate:
	docker exec -it backend /root/venv/bin/python3 /${BACKEND_DIR}/${PROJECT_NAME}/manage.py migrate

database_login:
	docker exec -it postgres bash psql -U ft_transcendence -d TRANSCENDENCE

stop:
	docker stop ${docker ps -q}

backend:
	${COMPOSE} -f ./srcs/docker-compose.yml build --progress plain backend &&
	${COMPOSE} -f ./srcs/docker-compose.yml up -d backend

debug-backend:
	docker run -it --entrypoint bash -v ~/$(PROJECT_NAME)/data/BACKEND:/django srcs-backend

nginx-reload:
	docker exec -it nginx nginx -s reload

nginx-rebuild:
	${COMPOSE} -f ${COMPOSE_PATH} stop nginx && \
	${COMPOSE} -f ${COMPOSE_PATH} rm -f nginx && \
	${COMPOSE} -f ${COMPOSE_PATH} build nginx && \
	${COMPOSE} -f ${COMPOSE_PATH} up -d nginx

rebuild-backend:
	${COMPOSE} -f ${COMPOSE_PATH} stop backend && \
	${COMPOSE} -f ${COMPOSE_PATH} rm -f backend && \
	${COMPOSE} -f ${COMPOSE_PATH} build backend && \
	${COMPOSE} -f ${COMPOSE_PATH} up -d backend

database_rebuild:
	docker compose -f ./srcs/docker-compose.yml build --progress plain postgres && docker compose -f ./srcs/docker-compose.yml up -d postgres

full-reset:
	docker system prune -a --volumes

clean-all: down
	-docker rm ${docker ps -a -q}
	-docker network prune -f -y
	-docker volume rm ${DOCKER_VOLUMES}

full-clean-all: down
	-docker rm ${docker ps -a -q}
	-docker network prune -f -y
	-docker system prune -a --volumes
	-docker volume rm ${DOCKER_VOLUMES}

restart-container:
	@read -p "Inserisci il nome del servizio da riavviare: " service_name; \
	if docker compose -f srcs/docker-compose.yml ps --services | grep -qw "$$service_name"; then \
		echo "Riavvio del servizio: $$service_name..."; \
		docker compose -f srcs/docker-compose.yml rm -f $$service_name; \
		docker compose -f srcs/docker-compose.yml up -d --no-deps $$service_name; \
		echo "Servizio $$service_name riavviato con successo."; \
	else \
		echo "Errore: Il servizio '$$service_name' non esiste."; \
	fi

### GRAFANA ###
insert-grafana:
	@echo "Questo comando sovrascriverà il database corrente di Grafana. Scrivi YES per confermare:"
	@read confirmation && [ "$$confirmation" = "YES" ] || (echo "Operazione annullata" && exit 1)
	chmod 777 ./grafana.db
	docker cp ./grafana.db grafana:/var/lib/grafana/grafana.db
	docker restart grafana
	@echo "Database inserito con successo e container riavviato."

retrieve-grafana:
	@GRAFANA_TOKEN=$$(grep GRAFANA_TOKEN ./srcs/.env | cut -d '=' -f2) ;\
	docker cp grafana:/var/lib/grafana/grafana.db ./grafana.db ;\
	echo "Database corrente recuperato e salvato come ./grafana.db" ;\

### GIT ###
push:
	git add . && git commit -m fastpush && git push

git-reset:
	git reset --hard origin/master

remove-gitcache:
	git rm -r --cached .

### COLORS ###
DEF_COLOR = \033[0;39m
BLACK = \033[1;90m
RED = \033[1;91m
GREEN = \033[1;92m
YELLOW = \033[1;93m
BLUE = \033[1;94m
MAGENTA = \033[1;95m
CYAN = \033[1;96m
WHITE = \033[1;97m
