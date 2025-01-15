# 🐾 Pet Store Backend API

Welcome to the **Pet Store Backend API**! 🐶🐱🐟 This is a backend-only project built to manage a pet store's data. It includes functionalities like managing users, products, and more. This API is designed to help you explore RESTful APIs while learning backend development.

---

## 🌟 Features

- **User Management**: Create, update, delete, and retrieve user information.
- **Product Management**: Manage a variety of pet products.
- **Order Management**: Handle customer orders and track purchases.
- **Enhanced User Model**: The user model includes attributes like name, email, password, address, and phone for a comprehensive profile.
- **Improved Error Handling**: Recent updates have addressed previous errors for a more robust experience.

---

## Technologies Used

- **Node.js**: JavaScript runtime for the server.
- **Express**: Web framework for building REST APIs.
- **MongoDB**: Database for storing data.
- **Mongoose**: ODM for MongoDB.
- **Postman**: API testing and interaction.

---

## 🚀 Installation and Setup

Follow these steps to get the project running on your machine:

### 1️⃣ Prerequisites

- Install [Node.js](https://nodejs.org/).
- Install [MongoDB](https://www.mongodb.com/).
- Have a code editor (like VS Code).

### 2️⃣ Clone the Repository

```bash
git clone https://github.com/GhaaZaaal/PetStore.git
cd PetStore
```

### 3️⃣ Install Dependencies

```bash
npm install
```

### 4️⃣ Set Up the Database

Ensure MongoDB is running on your machine. You can start it using:

```bash
mongod
```
Alternatively, you can use **MongoDB Atlas** for cloud storage instead of running MongoDB locally. See Step 5 for details on configuring the connection string.


### 5️⃣ Add Environment Variables

Create a `.env` file in the root directory and include:

```env
DB_URI=mongodb://localhost:27017/petstore
PORT=3000
JWT_SECRET=your_jwt_secret
```

If you're using MongoDB Atlas for cloud storage, replace the `DB_URI` in the `.env` file with your MongoDB Atlas connection string. Example:

```env
DB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/petstore?retryWrites=true&w=majority
```
Make sure to replace <username> and <password> with your actual MongoDB Atlas credentials.

### 6️⃣ Run the Server

Start the server using Node.js or nodemon:

```bash
npm start
# OR
npx nodemon app.js
```

The server will start at **http://localhost:5000**.

---

## 📋 API Endpoints

Here are some basic routes to get started:

### Users

- `GET /users`: Get all users.
- `POST /users`: Add a new user.
- `GET /users/:id`: Get a user by ID.
- `PUT /users/:id`: Update a user by ID.
- `DELETE /users/:id`: Delete a user by ID.

### Products

- `GET /products`: Get all products.
- `POST /products`: Add a new product.
- `GET /products/:id`: Get a product by ID.
- `PUT /products/:id`: Update a product by ID.
- `DELETE /products/:id`: Delete a product by ID.

### Categories

- `GET /categories`: Get all categories.
- `POST /categories`: Create a new category.
- `GET /categories/:id`: Get an category by ID.
- `PUT /categories/:id`: Update an category by ID.
- `DELETE /categories/:id`: Delete an category by ID.

### Example Request (Using Postman)

1. Open Postman.
2. Make a **POST** request to `http://localhost:3000/users` with the following JSON body:

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "address": "123 Pet Street",
  "phone": "01234567890"
}
```

3. You should receive a response like:

```json
{
  "id": "60c72b2f9b1d8e6f88f8e8b7",
  "name": "John Doe",
  "email": "john@example.com",
  "address": "123 Pet Street",
  "phone": "01234567890"
}
```

---

## 🔧 Future Improvements

- **Authentication**: Implement JWT-based authentication.
- **User Roles**: Introduce roles and permissions.
- **Advanced Search**: Add search and filtering for products and orders.
- **Order Tracking**: Enhance order tracking and history features.
- **Enhanced Validation**: Improve error handling and data validation.

---

## 🙏 Credits

This project is part of a learning journey at **ALX Software Engineering** Program into backend development. Special thanks to the tutorials, documentation, and community resources that made this possible!
