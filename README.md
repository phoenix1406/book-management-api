# Book Management API

This is a simple API for managing books. It uses JSON Web Tokens (JWT) for authentication , brcypt for password hashing and body parser for parsing the incoming requests .

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You need to have Node.js and npm installed on your machine. 

### Installing

1. Clone the repository: `git clone https://github.com/yourusername/book-management-api.git`
2. Navigate into the project directory: `cd book-management-api`
3. Install the dependencies: `npm install`

## Running the application

To start the server, run: `node index.js`

As this is using my local storage so i haven't integrate it with using mongo db cluster but it performs all the functionalities.So you have to go thorugh series of steps inorder to test the api.


First perform registration of the user it will  register you then you need to login your user by providing your credentials(`username` and `password`)  this will perform your authentication and then it will provide you the `token` for your user so for testing other api's please use that `token` you can use to test other routes as well 
## API Endpoints

* `POST /register`: Register a new user. The body of the request should be a JSON object with `username` and `password` fields.
* `POST /login`: Log in a user. The body of the request should be a JSON object with `username` and `password` fields. The response will be a JWT token.
* `GET /books`: Get a list of all books. This endpoint requires authentication. The JWT token should be included in the `Authorization` header of the request.
*  `GET /books/:id`: Get a book by its id. This endpoint requires authentication. The JWT token should be included in the `Authorization` header of the request. The `id` parameter should be the id of the book.
*  `POST /books` : Add a new book. This endpoint requires authentication. The JWT token should be included in the `Authorization` header of the request. The body of the request should be a JSON object with `title` and `author` and `publicationYear` fields.
*  `PUT /books/:id` : Update a book. This endpoint requires authentication. The JWT token should be included in the `Authorization` header of the request. The `id` parameter should be the id of the book. The body of the request should be a JSON object with `title` and `author` and `publicationYear` fields.
*  `DELETE /books/:id` : Delete a book. This endpoint requires authentication. The JWT token should be included in the `Authorization` header of the request. The `id` parameter should be the id of the book.
*  `GET/books/author/:author` : Get a list of books by author. This endpoint requires authentication. The JWT token should be included in the `Authorization` header of the request. The `author` parameter should be the author of the book.
* `GET/books/year/:year` : Get a list of books by year. This endpoint requires authentication. The JWT token should be included in the `Authorization` header of the request. The `year` parameter should be the year of the book.


These are all the routes prepared in order to depict the fucntionality of basic prototype of book management system 


** As it is the basic implementation a prototype of book management system so it is not having any security features like `CORS` and `helmet` and `xss-clean` and `express-rate-limit` and also mongo db atlas cluster is not integrated in this project. But I can build all those functionalities and make it a complete more advanced project but still it will support all the requirements which were asked by me to design this project **

## Built With

* [Node.js](https://nodejs.org/)
* [Express](https://expressjs.com/)
* [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
* [bcrypt](https://www.npmjs.com/package/bcrypt)

## Authors

* **Chirag Varshney** - *Initial work* - [phoenix1406](https://github.com/phoenix1406)

