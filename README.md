# threadit
## Introduction
This is the reddit clone assignment. This project uses NodeJS and MongoDB to demonstrate a simple Reddit clone application.

## Linux Installation

1. Clone this repository to your preferred directory.
2. Start the MongoDB daemon in the terminal using `sudo mongod`.
3. Install dependencies using `npm install`.
4. Run the application using `npm start`.

**Note:** This application is a demo and uses Nodemon which is not typically compatible with productions servers. Nodemon is used for development purposes to automatically rebuild the application whenever it detects a change in one of the project files. Typically this is uncessesary and insecure for production environments.

## Running Tests
Unit tests are located in the `test` directory and can be run by using the command `npm run test`.

## Repository Layout

## Server Configuration
The application is initiated from the `server.js` file. This file loads and configures all application dependencies, database connections, middleware, controllers, and the templating engine.

### Controllers
Express is used to simplify the code involved with handling requests from clients trying to access the application. It allows for easily adding middleware (such as user authentication, cookie and field parsing), sets public directories, and configures the server side templating engine. The controllers are located in the `controllers` folder and are loaded from `server.js`. Due to the age of this project not all of the available routes have been moved to their own controller files and many still exist within `server.js`.

### Middleware
Express allows for easily adding middleware to your application. Middleware is code that runs on every request to and from the server.

Middleware runs before and after your controller logic runs and allows for user authentication, cookie and field parsing, serverside rendering logic, and much more. 
User Request -> ExpressJS -> Middleware -> Controller -> Middleware -> Response to client.

### Templating Engine
This project uses handlebars to render templates on the server and output the resulting html to the user. Handlebars' templates are located in the `views` directory.


### Models
This project uses Mongoose as an ORM to facilitate data transferal between Express and MongoDB. Mongoose uses schemas to model the database in the project code. These are located in the `models` directory.

## Author
This software was written and is maintained by Justin Sitter.

## License MIT
Copyright 2022 Justin Sitter

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
