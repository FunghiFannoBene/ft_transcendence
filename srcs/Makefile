all:
	docker-compose up -d postgres backend

backup-db:
	docker exec -t postgres pg_dump -U 42firenze -F c transcendenceDB -f ./backup_file.dump
	docker cp postgres:./backup_file.dump .
