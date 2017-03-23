# devapp
## docker-apps
### hello-docker-nodejs-webapp

#### Steps
    1. create a new directory for all files
    2. create package.json: describe app and dependencies
    3. create server.js: using the Express.js framework
       Do a quick test: npm install && npm start
    4. create Dockerfile
    5. create .dockerignore: prevent local modules and debug logs from 
       being copied on to Dockerimage
    6. build docker image
          docker build -t shengli/hello-docker-nodejs-webapp .
    7. run the image
          docker run -p 8080:8080 --name testapp -d shengli/hello-docker-nodejs-webapp
          docker logs -f testapp
          curl localhost:8080

    8. cleanup docker containers
          docker rm -f testapp

#### Reference:
* [Dockerizing a Node.js web app](https://nodejs.org/en/docs/guides/nodejs-docker-webapp/)

## nginx-docker
nginx docker applications

### app
#### nginx-hello
  Build  
  ``` bash
  docker login
  docker build -t shengli/nginx-hello .
  docker push shengli/nginx-hello
  docker logout
  ```
  
  Run     
     ``` bash
     docker run -p 7000:80 shengli/nginx-hello
     ```

### nginx-websocket-and-rest-api
nginx demo to support HTTP routing for both websocket and rest api.
* build docker image

  ``` bash
  build.sh
  ```
  
* deploy in Docker Swarm mode

  ```bash
  cd deployment
  docker deploy -c docker-compose.yml N  
  ```
  
* check logs
  ```bash
  docker service logs -f N_rest-app
  ```

