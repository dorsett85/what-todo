## WhatTodo!

Live demo at https://what-todo.cphillipsdorsett.com

Basic todo app created with the MERN stack (mongodb, express, react, node).  Frontend state management provided by the react context api.

#### Getting started

Requires running local mongodb connection on port 27017.

```bash
git clone git@github.com:dorsett85/what-todo
cd what-todo/
npm install
npm run seed

###### Run with webpack-dev-server #####
npm run server

# Open new terminal in the same directory
npm start

##### Run with production build #####
npm run build
npm run server # Open browser at localhost:4000
```

#### Design

Backend:

To keep code modular and maintainable, the backend architecture splits the REST api into several layers:
* routes: dispatch incoming requests to controllers
* controllers: handle request and response objects passing in data to services
* services: objects providing related functionality
* models: objects providing direct integration with the database
* utils: pure functions and constants to share throughout the api

The services and controllers utilize factory functions for injecting dependencies and the util functions are all pure, so eventual unit testing could be easily implemented with mocks.  With increasing service layer complexity, the static only functions on those objects would eventually include instantiation to execute multiple commands on them. 

Frontend:

Similar to the backend, the react frontend is structured for modularity:
* api: pre-packaged ajax requests to the backend
* common: shared css, js, and files (images, fonts, etc.)
* components: flat folder containing single components inside their own folder with specific helpers and styling
* context: state management store, actions, and reducers
* routes: general components that are unique to their url path

This structure allows for more straightforward development as it is clear where everything goes.  For example, the parent component for a distinct url path is always found in "routes". All application state is handled in "context"; a new api request is created in "api"; any styling used across multiple components goes in "common"; etc.  As the app grows, it may be useful to put smaller shareable components into structured sub folders (e.g., "forms", "buttons", etc.) with defined naming conventions.

#### If I had more time
* Code splitting / lazy loading
* Staging env / deploying with Docker
* General custom frontend style
* Unit testing
* Pagination on the todo list
* More todo functionality (email alerts, multiple todolists with subtasks, etc.)

Let me know what you think!
claytonphillipsdorsett@gmail.com
