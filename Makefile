build: ## build the image from Dockerfile. In our applications we have a server build on top of Node.js/Express.js framework, MongoDB and React frontend binding with Nginx
	docker-compose -f docker-compose.yml build $(c)
			
up: ## Start all or c=<name> containers in foreground
	docker-compose -f docker-compose.yml up $(c)	 

start: ## Start all or c=<name> containers in background
	docker-compose -f docker-compose.yml up -d $(c)

restart: ## Is used to restart containers. To restart specific container use for example if I only want to restart mongodb container run `make down c=mongodb`
	docker-compose -f docker-compose.yml stop $(c)
	docker-compose -f docker-compose.yml up -d $(c)

down: ## Is used to stop and shutdown containers. To shutdown specific container use for example if I only want to shutdown mongodb container run `make down c=mongodb`
	docker-compose -f docker-compose.yml down $(c)

destroy: ## Is used to destroy containers. To destroy specific container use for example if I only want to destroy mongodb container run `make destroy c=mongodb` 
				docker-compose -f docker-compose.yml down -v $(c)
stop: ## Stop all or c=<name> containers
	docker-compose -f docker-compose.yml stop $(c)

status: ## Show status of containers
	docker-compose -f docker-compose.yml ps

restart: ## Restart all or c=<name> containers
	docker-compose -f docker-compose.yml stop $(c)
	docker-compose -f docker-compose.yml up $(c) -d

logs: ## Show logs for all or c=<name> containers
	docker-compose -f docker-compose.yml logs --tail=100 -f $(c)

clean: ## Clean all data
	docker-compose -f docker-compose.yml down

sh: ## Is used to see sh into containers. To sh specific container use for example if I only want to sh server container run `make sh c=jubo-server`
	docker exec -it $(c) sh
