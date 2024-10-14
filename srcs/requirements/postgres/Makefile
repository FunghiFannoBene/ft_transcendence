
all:
	if [ "$$(docker ps -q -f name=postgres_database)" ]; then \
		echo "Il container è già attivo."; \
	else \
		docker run --env-file ../../.env --name postgres_database -v ${HOME}/ft_transcendence/data/POSTGRES:/var/lib/postgresql/data -d postgres:latest; \
	fi
	$(MAKE) status

kill:
	docker stop postgres_database
	docker rm postgres_database

status:
	@echo "PostgreSQL è attivo. Comandi:" && \
	echo "Per entrare in SQL: docker exec -it postgres_database psql -U $$(grep POSTGRES_USER ../../.env | cut -d '=' -f2) -d $$(grep POSTGRES_DB ../../.env | cut -d '=' -f2)" && \
	echo "Indirizzo IP:" && \
	docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' postgres_database
	@docker ps -la

exec:
	docker exec -it postgres_database psql -U 42firenze -d transcendenceDB

