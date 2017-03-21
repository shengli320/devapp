# devapp
## nginx-docker
nginx docker applications

### docker-app
#### nginx-hello
Build  
          docker login  
          docker build -t shengli/nginx-hello .  
          docker push shengli/nginx-hello  
          docker logout  

Run     
          docker run -p 7000:80 shengli/nginx-hello

### nginx-websocket-and-rest-api
nginx demo to support HTTP routing for both websocket and rest api.
