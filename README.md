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
     * file: http-server.js  
        a) GET  /: return index.html  
        b) POST /: handle JSON request from index.html, and return a response  
        c) export the module  
           ``` javascript
              module.exports = app;
           ```  
     * file: index.html (html5)  
        a) Use Fetch to POST json data (JSON.stringify)  
        b) Parse response in JSON and display  
     * quick test  
        a) server: npm install && npm start  
        b) browser: http://<ip>:8080

  2. create WebSocket server on top of a regular http server
     * ws-server.js  
        a) create WebSocket server from a node native http.createServer()   
        b) import 'app' exported by http-server.js
        c) create WebSocket server on top of a regular http server 
```javascript
            var wsServer = require('ws').Server;
            var dualStackServer = require('http').createServer();
            var app = require('./http-server');
            
            const PORT = 8080;
            
            // create WebSocket server on top of a regular http server
            var wss = new wsServer({server: dualStackServer});
            
            // Also mount the app here
            dualStackServer.on('request', app);
            
            wss.on('connection', function connection(ws) {
            });
            
            dualStackServer.listen(PORT);
            console.log('http/ws server listening on port: ' + PORT);            
```

  3. test
    a) start node server: node install && node start  
    b) open a browser, and input url: http://<ip>:8080  
       Example page:   
```html
          NodeJS HTTP and WebSocket example
          
          WebSocket message response:
          
          {
            "answer": 32
          }
          HTTP POST message response:
          
          {
            "answer": 42
          }
```

#### Reference
* [Express and WebSocket listening on the same port](http://stackoverflow.com/questions/34808925/express-and-websocket-listening-on-the-same-port)
* [Using Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)
* [Fetch: POST json data](http://stackoverflow.com/questions/29775797/fetch-post-json-data)
* [WebSocket RFC6455](https://tools.ietf.org/html/rfc6455)

### docker: docker-redis
  * basic docker command
```bash
    docker run --name redis -p 6379:6379 -d redis
    
    docker exec -it redis /bin/bash
        /data# redis-cli
            127.0.0.1:6379> keys *
                (empty list or set)
            127.0.0.1:6379> set hello world
                OK
            127.0.0.1:6379> get hello
                world
            127.0.0.1:6379> flushall
            127.0.0.1:6379> exit
```

  * Docker Swarm mode

```bash
    # deploy
    docker deploy -c swarm-mode-redis.yml R
    
    # remove
    docker service rm R_redis-app
    
    # check
    ss -plnt | grep 6379
        LISTEN     0      128         :::6379                    :::*             

    # check inside
    docker exec -it R_redis-app.1.r55w82vcl093v1qqtgvatdqcm /bin/bash
        /data# redis-cli
            127.0.0.1:6379> keys *
                (empty list or set)
            127.0.0.1:6379> set hello world
                OK
            127.0.0.1:6379> get hello
                world
```

  * DCOS
      master      : 10.220.202.61
      public-agent: 10.220.202.82
      
```bash
    # deploy
    curl -X POST http://10.220.202.61/marathon/v2/apps -d @marathon-redis.json -H "Content-type: application/json"

    # test
    redis-cli -h 10.220.202.82 -p 6379
        10.220.202.82:6379> keys *
            (empty list or set)
        10.220.202.82:6379> set hello world
            OK
        10.220.202.82:6379> get hello
            "world"
```  

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

