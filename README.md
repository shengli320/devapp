# devapp
## docker-apps
### hello-docker-nodejs-webapp

#### Steps
    1. create a new directory for all files
    2. create package.json: describe app and dependencies
    3. create server.js: using the Express.js framework
       Do a quick test: npm install && npm start

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

