#FT_Transcendence 42

COMPOSE_PATH = ./srcs/docker-compose.yml

all:
	-sudo service docker start
	docker-compose -f $(COMPOSE_PATH) -p ft_transcendence up --build -d

down:
	docker-compose -f $(COMPOSE_PATH) down

backend:
	docker-compose ./srcs/requirements/backend -d up

frontend:
	docker-compose ./srcs/requirements/frontend -d up

database:
	docker-compose ./srcs/requirements/postgres -d up

push:
	git add . && git commit -m fastpush && git push

clean-all:
	-docker rm $(docker ps -a -q)
	-docker rmi $(docker images -q)
	-docker volume rm $(docker volume ls -q)
	-docker network prune -f -y
	-docker system prune -a --volumes
