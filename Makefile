#FT_Transcendence 42

COMPOSE_PATH = ./srcs/docker-compose.yml

all:
	-sudo service docker start
	docker compose -f $(COMPOSE_PATH) -p ft_transcendence up --build -d

first-time:
	cd data && mkdir -p BACKEND POSTGRES TR_DB grafana-storage

down:
	docker compose -f $(COMPOSE_PATH) -p ft_transcendence down
	docker network prune -f

backend:
	docker compose ./srcs/requirements/backend -d up

frontend:
	docker compose ./srcs/requirements/frontend -d up

database:
	docker compose ./srcs/requirements/postgres -d up

push:
	git add . && git commit -m fastpush && git push

backup-db:
	docker exec -t postgres pg_dump -U 42firenze -F c transcendenceDB -f ./backup_file.dump
	docker cp postgres:./backup_file.dump .

clean-all: down
	-docker rm $(docker ps -a -q)
	-docker rmi $(docker images -q)
	-docker network prune -f -y
	-docker system prune -a --volumes
	-docker volume rm backend-volume postgres-volume

database:
	docker exec -it postgres psql -U 42firenze -d transcendenceDB
