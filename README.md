# 🐾 Pet Store Backend API

Welcome to the **Pet Store Backend API**! 🐶🐱🐟 This is a backend-only project built to manage a pet store's data. It includes functionalities like managing users, products, and more. This API is designed to help you explore RESTful APIs while learning backend development.

---

## 🌟 Features

- Manage users (create, update, delete).
- Manage products for pets (cats, dogs, fish, etc.).
- Simple and clean API for interacting with the database.
- Beginner-friendly codebase.

---

## 🛠️ Technologies Used

- **Node.js**: JavaScript runtime for the server.
- **Express**: Web framework for building REST APIs.
- **MySQL**: Database for storing data.
- **Postman**: API testing and interaction.

---

## 🚀 Installation and Setup

Follow these steps to get the project running on your machine:

### 1️⃣ Prerequisites

- Install [Node.js](https://nodejs.org/).
- Install [MySQL](https://dev.mysql.com/downloads/).
- Have a code editor (like VS Code) with WSL configured.

### 2️⃣ Clone the Repository

```bash
git clone https://github.com/yourusername/pet-store-backend.git
cd pet-store-backend
```

### 3️⃣ Install Dependencies

```bash
npm install
```

### 4️⃣ Set Up the Database

1. Open the `database/schema.sql` file.
2. Create the database by running:

```bash
mysql -u root -p < database/schema.sql
```

### 5️⃣ Add Environment Variables

Create a `.env` file in the root directory and include:

```
DB_HOST=localhost
DB_USER=your_mysql_username
DB_PASSWORD=your_mysql_password
DB_NAME=petstore
```

### 6️⃣ Run the Server

Start the server using Node.js or nodemon:

```bash
npm start
# OR
npx nodemon app.js
```

The server will start at **http://localhost:3000**.

---

## 📋 API Endpoints

Here are some basic routes to get started:

### Users

- **GET /users**: Get all users.
- **POST /users**: Add a new user.
- **GET /users/:id**: Get a user by ID.

### Products

- **GET /products**: Get all products.
- **POST /products**: Add a new product.

### Example Request (Using Postman)

1. Open Postman.
2. Make a **POST** request to `http://localhost:3000/users` with the following JSON body:

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

3. You should receive a response like:

```json
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com"
}
```

---

## 🔧 Future Improvements

- Add authentication (e.g., JWT).
- Include user roles and permissions.
- Improve database queries with Promises.
- Add product categories.

---

## 🙏 Credits

This project was built as part of a learning journey into backend development. Special thanks to the tutorials, documentation, and community resources that helped make this possible!

---

## 📜 License

This project is open-source and available under the [MIT License](LICENSE).
