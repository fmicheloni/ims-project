# ims-project

Project for the course Internet and Mobile Services, UNIBZ, 2016/2017.

## Backend

You will need Docker, Maven, Node, npm, gulp, bower and Java8 installed to run this project.

RUNNING THE BACKEND<br/>
You should be in the root folder of the project.
```bash
./build-script/build.sh -mongo -s
```
#### Env
Modify your hosts file adding the following lines (/private/etc/hosts for Mac):

\# IMS PROJECT<br/>
127.0.0.1 registry.unibz.com<br/>
127.0.0.1 authentication.unibz.com<br/>
127.0.0.1 rabbitmq.unibz.com<br/>
127.0.0.1 mongodb-auth.unibz.com<br/>
127.0.0.1 mail.unibz.com<br/>
127.0.0.1 www.theexcursioner.com<br/>

At this point the project will be fully built.
To run it
```bash
docker-compose -f docker-compose/docker-compose-ims.yml up -d
```
To see the logs
```bash
docker-compose -f docker-compose/docker-compose-ims.yml logs -f
```
To stop it
```bash
docker-compose -f docker-compose/docker-compose-ims.yml down
```

**The exposed port of the API Gateway is 3000.**

#### Methods

Method	| Path	| Description | Example Body
------------- | ------------------------- | ------------- | ------------- 
POST	| /authentication/registration	| Register a new account. | {"username":"Richard012","email":"asdasd@gmail.com","password":"ciao1234"}
POST	| /authentication/auth	| Login | {"username":"Richard012","password":"ciao1234"}
POST	| /authentication/validate	| Validate a token | eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJSaWNoYXJkMDEyIiwiY3JlYXRlZCI6MTQ4MTU4NDA5ODE1NywiZXhwIjoxNDg0MTc2MDk4fQ.0-cTOpZXwz7FewssjHpfXbWnr6JDUYX7B1ZbT3OPU6ude3MzA21obWA6VRtfysAwFSwIYXtSDINqDRM1EbTFJw

**Default user is: fmicheloni - ciao1234**

## Frontend

RUNNING THE FRONTEND (located in frontend folder)<br/>

Go in the frontend directory.

```bash
tsd install
sudo gulp
```

The default task has a nodemon watching for changes.<br/>
To just run server: `gulp serve`<br/>
**Application runs on port 80 for http, 443 for https.**