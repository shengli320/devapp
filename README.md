# devapp
## docker-apps

### proj: hello-docker-nodejs-webapp

#### Steps
    1. create a new directory for all files
    2. create package.json: describe app and dependencies
    3. create http-server.js: using the Express.js framework
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

#### Reference
* [Dockerizing a Node.js web app](https://nodejs.org/en/docs/guides/nodejs-docker-webapp/)

### proj: hello-docker-nodejs-http-and-websocket

#### Description
  A super simple example of how regular http and websocket work together

#### Steps
  1. create a typical express app, except that we do not start the server with app.listen().
     * file: http-http-server.js  
        a) GET  /: return index.html  
        b) POST /: handle JSON request from index.html, and return a response  
     * file: index.html (html5)  
        a) Use Fetch to POST json data (JSON.stringify)  
        b) Parse response in JSON and display  
     * quick test  
        a) server: npm install && npm start  
        b) browser: http://<ip>:8080

  2.  

#### Reference
* [Express and WebSocket listening on the same port](http://stackoverflow.com/questions/34808925/express-and-websocket-listening-on-the-same-port)
* [Using Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)
* [Fetch: POST json data](http://stackoverflow.com/questions/29775797/fetch-post-json-data)

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

