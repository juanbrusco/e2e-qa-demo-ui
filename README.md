# DemoUI to show how Reac web application works

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Requirements

1. [yarn](https://classic.yarnpkg.com/en/docs/install)

## Steps

### `yarn install`
### `yarn start`

Runs the app in the _*development mode*_.<br />
Open [http://localhost:8888](http://localhost:8888) to view it in the browser.

## Docker       
This allows us to run the build in a node image and server the app using an nginx image.        
The final Docker image will just contain the build folder and nothing else      
(the project files were only used by to build the project in the builder layer, which then gets thrown away)      
it's just an intermmediary step.        

- files: *Dockerfile*, *nginx.conf*, *.dockerignore*      
- `docker build . -t e2e-qa-demo-ui-image`       
- `docker run -p 8082:82 -d --name e2e-qa-demo-ui-container e2e-qa-demo-ui-image`              
    - **8082** -> public port to access     
    - **82** -> container expose port       
    - **-container** -> container name        
    - **-image** -> image name        

- stop container: `docker stop  e2e-qa-demo-ui-container`        
- remove container: `docker rm e2e-qa-demo-ui-container`     
- remove image: `docker rmi e2e-qa-demo-ui-image`        
