all:
	ps aux | grep -q '[d]ockerd' || sudo service docker start
	docker volume inspect BACKEND > /dev/null 2>&1 || docker volume create --name BACKEND
	docker build -t testing_backend .
	docker run -it -v BACKEND:/django testing_backend /bin/bash

kill:
	docker stop $(docker ps -q --filter "ancestor=testing_backend")
	docker rm $(docker ps -a -q --filter "ancestor=testing_backend")

once:
	sudo usermod -aG docker $(shell whoami)
	echo "$(shell whoami) ALL=(ALL) NOPASSWD: /usr/sbin/service docker start" | sudo tee -a /etc/sudoers
	echo "Permessi instaurati.\nPer applicare il cambiamento bisogna riavviare il sistema.\n"
