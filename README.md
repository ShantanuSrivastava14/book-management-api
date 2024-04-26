# Book Management API Documentation

## Introduction

Welcome to the Book Management API documentation. This API allows users to manage books, including creating, retrieving, updating, and deleting book entries. It also provides endpoints to filter books by author or publication year. Additionally, the API supports user authentication for accessing protected routes.

## Setting up the project

To get started with the Book Management API, follow these steps to download the repository and set it up on your local system:

1. **Download Repository:**
   - Click on the "Code" button and select "Download ZIP".
   - Extract the downloaded ZIP file to your desired location on your system.

2. **Setup Local Environment:**
   - Ensure that you have Node.js and npm (Node Package Manager) installed on your system. You can download them from [here](https://nodejs.org/).
   - Open a terminal or command prompt and navigate to the extracted repository folder using the `cd` command.

3. **Install Dependencies:**
   - Run the following command to install the required dependencies:
     ```
     npm install
     ```

4. **Start the Server:**
   - After installing dependencies and setting up environment variables, start the server by running the following command:
     ```
     npm start
     ```

5. **Accessing the API:**
   - Once the server is running, you can access the API endpoints using a tool like Postman

---

These steps will help you download the repository, set it up on your local system, and start using the Book Management API.

## Authentication

To access protected routes, users must authenticate using JSON Web Tokens (JWTs). After signing up or logging in, users will receive a token that must be included in the `Authorization` header of requests.

### Signup

- **URL:** `/user/signup`
- **Method:** `POST`
- **Description:** Register a new user.
- **Request Body:**
  ```json
  {
    "email": "example@example.com",
    "password": "yourpassword"
  }
  ```
- **Response:** 
  - `201 Created` if the user is successfully registered.
  - `400 Bad Request` if the request body is invalid.
  - `500 Internal Server Error` if an unexpected error occurs.

### Login

- **URL:** `/user/login`
- **Method:** `POST`
- **Description:** Log in an existing user.
- **Request Body:**
  ```json
  {
    "email": "example@example.com",
    "password": "yourpassword"
  }
  ```
- **Response:** 
  - `200 OK` if the user is successfully logged in. The response includes the user's email and a JWT token.
  - `400 Bad Request` if the credentials are incorrect.
  - `500 Internal Server Error` if an unexpected error occurs.

Steps to add a Bearer token in the Authorization header using Postman:

1. **Open Postman:**
   Launch the Postman application on your computer.

2. **Select Request:**
   Choose the request you want to send to your Book Management API. This could be any endpoint that requires authentication.

3. **Open Authorization Tab:**
   In the request builder area, locate the "Authorization" tab. Click on it to open the authorization settings.

4. **Choose Type:**
   In the "Type" dropdown menu, select "Bearer Token". This tells Postman that you will be using a Bearer token for authentication.

5. **Enter Token:**
   In the "Token" input field, paste the JWT token you received after logging in or signing up to your Book Management API. Make sure to remove any extra spaces before or after the token.

6. **Send Request:**
   Once you have added the token, you can send the request by clicking on the "Send" button. Postman will include the Bearer token in the Authorization header when sending the request to the API server.

By following these steps, you can add a Bearer token in the Authorization header using Postman and authenticate your requests to the Book Management API.

## Books

### Create Book

- **URL:** `/books`
- **Method:** `POST`
- **Description:** Create a new book entry.
- **Authentication:** Required
- **Request Body:**
  ```json
  {
    "title": "Book Title",
    "author": "Author Name",
    "publicationYear": 2022
  }
  ```
- **Response:** 
  - `200 OK` if the book is successfully created. The response includes the newly created book object.
  - `400 Bad Request` if the request body is invalid.
  - `401 Unauthorized` if authentication is required.
  - `500 Internal Server Error` if an unexpected error occurs.

### Get Books

- **URL:** `/books`
- **Method:** `GET`
- **Description:** Retrieve all books.
- **Authentication:** Required
- **Response:** 
  - `200 OK` with an array of book objects.
  - `401 Unauthorized` if authentication is required.
  - `500 Internal Server Error` if an unexpected error occurs.

### Update Book

- **URL:** `/books/:id`
- **Method:** `PUT`
- **Description:** Update an existing book entry.
- **Authentication:** Required
- **Request Body:** JSON object with fields to update
- **Response:** 
  - `200 OK` with the updated book object.
  - `400 Bad Request` if the request body is invalid.
  - `401 Unauthorized` if authentication is required.
  - `404 Not Found` if the book with the given ID is not found.
  - `500 Internal Server Error` if an unexpected error occurs.

### Delete Book

- **URL:** `/books/:id`
- **Method:** `DELETE`
- **Description:** Delete a book entry.
- **Authentication:** Required
- **Response:** 
  - `200 OK` with a success message.
  - `401 Unauthorized` if authentication is required.
  - `404 Not Found` if the book with the given ID is not found.
  - `500 Internal Server Error` if an unexpected error occurs.

### Filter Books by Author

- **URL:** `/books/author/:name`
- **Method:** `GET`
- **Description:** Retrieve books by a specific author.
- **Authentication:** Required
- **Response:** 
  - `200 OK` with an array of book objects written by the specified author.
  - `400 Bad Request` if the author name is missing from the params.
  - `401 Unauthorized` if authentication is required.
  - `404 Not Found` if no books are found for the given author.
  - `500 Internal Server Error` if an unexpected error occurs.

### Filter Books by Publication Year

- **URL:** `/books/PubYear/:year`
- **Method:** `GET`
- **Description:** Retrieve books published in a specific year.
- **Authentication:** Required
- **Response:** 
  - `200 OK` with an array of book objects published in the specified year.
  - `400 Bad Request` if the publication year is missing from the params.
  - `401 Unauthorized` if authentication is required.
  - `404 Not Found` if no books are found for the given publication year.
  - `500 Internal Server Error` if an unexpected error occurs.

---

This documentation covers the endpoints, authentication, request/response formats, and error handling for the Book Management API.
