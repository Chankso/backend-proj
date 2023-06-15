Project setup:

npm install in root, server and frontend folders.

create database in MySQL workbench, name:testdb, password:123456789

In server folder, npx knex migrate:latest --knexfile src/db/knexfile.ts

npm run start in frontend folder, which should load up on localhost:3333

npm run start in server folder, which should load up on localhost:3000

