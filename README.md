# Simple Doctor's orders system

Easy setup doctor's orders full-stack application.

## Prerequisite

Here are the essential tools to run up the application, you can choose to run with docker or not, if you have optional tools locally.

* [docker](https://www.docker.com/)
* [make](https://www.gnu.org/software/make/)
* [node (Optional)](https://nodejs.org/en/) 
* [MongoDB (Optional)](https://www.mongodb.com/)

## Get Started

The file structure show as below:

```
.
├── client
├── docker-compose.yml
├── Makefile
├── nginx
├── README.md
└── server
```

If you are going to run the application with docker, the file you need to run is `Makefile`

### Build and Run

Open the Terminal at the root directory.
Before running the application, you need to build the images.

```
// Build application images
make build
```

After you finished build images, you can start the application with one of two commands as below:
```
// Start the application in the background
make start

// If you want to see the images logs
make up
```

The application will run on in default
```
http://localhost:3050
```



```
// When your server is up, sh into your server
make sh c=jubo-server
```

Shout down the application
```
make down
```


## Makefile commands

#### Build command

- build the image from Dockerfile. In our applications we have a server build on top of Node/Express.js framework, and React frontend binding with Nginx.

```shell
make build            # building all containers
make build c=mongodb # building mongodb mongodb only
make build c=api   # building api server only
make build c=client      # building react app only
```

#### Up command

- Start the containers

```shell
make up            # up all containers
make up c=mongodb # up mongodb only
make up c=api   # up api server only
make up c=client      # up app only
```

#### Start command

- Start the containers in the background. To start only one container for example if I only want to start db container run `make start c=mongodb`

```shell
make start            # starting all containers
make start c=mongodb # starting mongodb only
make start c=api   # starting api server only
make start c=client      # starting app only
```

#### Down command

- To delete specific container use for example if I only want to delete db container run `make down c=mongodb`

```shell
make down            # delete all containers
make down c=mongodb # delete mongodb only
make down c=api   # delete api server only
make down c=client      # delete app only
```

#### Restart command

- To restart specific container use for example if I only want to restart db container run `make down c=mongodb`

```shell
make restart            # restart all containers
make restart c=mongodb # restart mongodb only
make restart c=api   # restart api only
make restart c=client      # restart app only
```

#### Logs command

- To log specific container use for example if I only want to log db container run `make log c=mongodb`

```shell
make log            # log all containers
make log c=mongodb # log mongodb only
make log c=api   # log api server only
make log c=client      # log app only
```

#### Sh command

- Sh command to see sh into containers. To log specific container use for example if I only want to sh server container run `make sh c=jubo-server`

```shell
make sh c=jubo-db       # log mongodb only
make sh c=jubo-server   # sh api server only
make sh c=jubo-app      # log app only
```