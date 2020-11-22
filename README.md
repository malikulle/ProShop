
# Getting started

To get the Node server running locally:
- Clone this repo
- `npm install` to install all required dependencies
- `cd frontend npm install` to install all front end required dependencies
- Create MongoDb Cluster and Get Connection MongoDb URI
- Set environment variables in `.env` 
  * Set `MONGO_URI = <YOUR_MONGO_URI>`
  * Set `JWT_SECRET = <YOUR_SECRET_KEY>`
  * Set `PAYPAL_CLIENT_ID = <YOUR_PAYPAL_CLIENT_ID`
- `npm run data:import` to load dummy data to database
- `npm run data:destroy` to destroy dummy data to database
- `npm run server` to start the local server 
- `npm run client` to start the client side
- `npm run dev` to start the local server and client side

# Code Overview

## Dependencies

### Server Side
- [expressjs](https://github.com/expressjs/express) - The server for handling and routing HTTP requests
- [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) - For generating JWTs used by authentication
- [mongoose](https://github.com/Automattic/mongoose) - For modeling and mapping MongoDB data to JavaScript 
- [bcryptjs](https://github.com/dodo/node-slug) - Hashing Password
- [dotenv](https://github.com/motdotla/dotenv) - Zero-Dependency module that loads environment variables
- [multer](https://github.com/expressjs/multer) - Node.js middleware for uploading files
- [cors](https://github.com/expressjs/cors) - Node.js middleware for enable cors
- [express-async-handler](https://github.com/Abazhenov/express-async-handler) - For Default Try Catch
- [morgan](https://github.com/expressjs/morgan) - For Request Log

### Client Side

- [alertifyjs](https://github.com/MohammadYounes/AlertifyJS) - For Notification Alert
- [axios](https://github.com/axios/axios) - For HTTP Request from server side
- [react-moment](https://github.com/headzoo/react-moment) - For format Dates.
- [react-paypal-button-v2](https://github.com/Luehang/react-paypal-button-v2) - For Payment
- [react-redux](https://github.com/reduxjs/react-redux) - For Global State
- [react-router-bootstrap](https://github.com/ReactTraining/react-router) - Bootstarp


## Application Structure

### Backend

- `server.js` - The entry point to our application. This file defines our express server and connects it to MongoDB using mongoose. It also includes the routes we'll be using in the application.
-`seeder.js` - This file helps us to import dummy data.
- `routers/` - This folder contains the route definitions for our API.
- `models/` - This folder contains the schema definitions for our Mongoose models .
- `controllers/` - This folder contains controllers for our API.
- `public/` - This folder contains static files for our API.
- `middleware/` - This folder contains middlewares for our API.
- `utils/` - This folder contains helper functions for adapting 3rd party libraries for our API.
- `data/` - Example data json.

### Authentication

Requests are authenticated using the `Authorization` header and value `Bearer: {{token}}`. with a valid JWT. 
- `auth.js and adminAuth.js` - These are files to authetication.

### Error

-`middleware/error.js` - Global Error JavaScript file.

### Frontend

-`src/screens` - This folder contains Screens.
-`src/components` - This folder contains Helper components to use Screens.
-`src/store` - This folder contains our store to have global state.
-`src/reducers` - This folder contains our reducers.
-`src/constants` - This folder contains our constants to use reducers.
-`src/api` - This folder contains our api BaseUrl.
-`src/Routers.js` - This folder contains Frontend Routers.

## Pictures From App
![Image of HomePage](https://github.com/malikulle/ProShop/blob/master/images/1.png?raw=true)