Nodejs version : v24.11.0
PostgreSQL version : v18.0.2
Postgres : https://www.enterprisedb.com/downloads/postgres-postgresql-downloads
How to clone the nodejs project : 
Step-by-step setup instructions:
    1- Git clone https://github.com/mileddd/backend-ideas.git
    2- After cloning the repository, checkout to the master branch : git checkout master
    3- Install the dependecies : npm install
    4- Create .env file like .env.example
    4- To install the tables, run : npx knex migrate:latest 
    5- To setup seeds run : npx knex seed:run
    6- Run the app in terminal following this command : node index.js or by installing nodemon to restart the server automatically during changes.
    to install nodemond : npm install -g nodemon
    7- node index.js to run the app and the app will run on localhost:3000 by default

List of completed bonus features
    1- Include JWT authentication.
    2- Create middleware to protect routes.
    3- Create login API.
