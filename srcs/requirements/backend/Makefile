all:
	ps aux | grep -q '[d]ockerd' || sudo service docker start
	#Se esiste già l'immagine attivalo senno ribuilda il Dockerfile
	if [ "$$(docker ps -aq -f name=backend_testing)" ]; then \
		docker start backend_testing; \
		docker exec -it backend_testing /bin/bash; \
	else \
		docker build -t testing_backend .; \
		docker run --name backend_testing -it -v ${HOME}/ft_transcendence/data/BACKEND:/django testing_backend /bin/bash; \
	fi

kill:
	docker stop "$$(docker ps -q --filter "ancestor=testing_backend")"
	docker rm "$$(docker ps -a -q --filter "ancestor=testing_backend")"
	docker container prune

once:
	sudo usermod -aG docker $(shell whoami)
	echo "$(shell whoami) ALL=(ALL) NOPASSWD: /usr/sbin/service docker start" | sudo tee -a /etc/sudoers
	echo "Permessi instaurati.\nPer applicare il cambiamento bisogna riavviare il sistema.\n"

status:
	docker ps -la
