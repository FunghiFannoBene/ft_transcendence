#FT_Transcendence 42

COMPOSE_PATH = ./srcs/docker-compose.yml

all:
	docker-compose -f $(COMPOSE_PATH) -p ft_transcendence up --build
down:
	docker-compose -f $(COMPOSE_PATH) down
