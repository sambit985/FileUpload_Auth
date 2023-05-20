# Project Content

** File upload after authentication **
* Signup with name, mail, password and isSeller (https//localhost:1331/api/signup)
* Signin after the signup with mail and password (https//localhost:1331/api/v1/sigin)
* After successful signin, JWT Token will generate
* Then Token send and store as cookie
* After successful signin only user can create product
* When any api call (https://localhost:1331/api/v1/product/create), cookie send bearer token for Authorization
* then validate and create product with name, price and content:file

** Used Technologies **
> * Node.js
> * Express.js
> * Sqlite

** Used Packages **
> * bcrypt
> * jsonwebtoken
> * multer
> * Sequelize
> * sqlite3


