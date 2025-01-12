.PHONY: rebuild

build:
	-@sudo service docker start
	@read -p "Input Rebuild: " input; \
	docker compose stop $$input && \
	docker compose build $$input && \
	docker compose up $$input -d

backend:
	docker compose stop backend-transcendence && \
	docker compose build backend-transcendence && \
	docker compose up backend-transcendence -d


daphne:
	docker compose stop daphne && \
	docker compose build daphne && \
	docker compose up daphne -d


re: backend red

lbackend:
	docker exec -it backend	cat /var/log/supervisord/runserver_error.log

lcelery:
	docker exec -it backend cat /var/log/supervisord/celery_worker_error.log

ldaphne:
	docker exec -it daphne cat /var/log/daphne.log

clean-celery:
	docker exec -it backend sh -c 'echo "CLEAN" > /var/log/supervisord/celery_worker_error.log'

clean-daphne:
	docker exec -it daphne sh -c "echo 'SYSTEM: clean' > /var/log/daphne.log"

clean-backend:
	docker exec -it backend-transcendence sh -c 'echo "SYSTEM: clean" > /var/log/supervisord/runserver_error.log'

red: daphne clean-daphne

cred: red clean-daphne
