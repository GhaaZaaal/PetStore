# 🐾 PetStore API

PetStore API is a **RESTful** e-commerce backend service built with **Node.js**, **Express.js**, and **MongoDB** using **Mongoose** as the ODM. This project provides functionalities to manage users, products, authentication, and orders while implementing best practices such as **JWT authentication**, **input validation**, **error handling**, and **logging**.

---

## 🚀 Features

- **User Authentication & Authorization** (JWT-based)
- **Product Management** (CRUD operations)
- **Order Processing** (Cart & Purchase flow)
- **Secure Routes & Role-based Access**
- **Input Validation with Joi**
- **Logging with Morgan**
- **Error Handling & Global Error Middleware**
- **Environment Variables Support**
- **Nodemon for Development**
- **RESTful API Design**
- **Modular Code Structure**
- **Version Control Best Practices**

---

## 📂 Project Structure

```
.
├── app.js
├── config
│   ├── db.js               # Database connection
│   ├── env.example         # Environment variable example file
├── controllers
│   ├── authController.js   # Authentication logic
│   ├── productController.js # Product CRUD operations
│   ├── userController.js   # User-related operations
│   ├── orderController.js  # Order management
├── middleware
│   ├── authMiddleware.js   # Authentication & role protection
│   ├── errorMiddleware.js  # Global error handling
├── models
│   ├── User.js             # User schema/model
│   ├── Product.js          # Product schema/model
│   ├── Order.js            # Order schema/model
├── routes
│   ├── authRoutes.js       # Authentication endpoints
│   ├── productRoutes.js    # Product endpoints
│   ├── userRoutes.js       # User management endpoints
│   ├── orderRoutes.js      # Order management endpoints
├── utils
│   ├── validators.js       # Input validation functions
│   ├── errorHandler.js     # Error handler utility
│   ├── logger.js           # Logging utility
├── .gitignore              # Ignoring sensitive files (node_modules, .env)
├── package.json            # Project dependencies & scripts
├── README.md               # Documentation
```

---

## 🛠️ Installation & Setup

### 1️⃣ Prerequisites

- Node.js installed (v16+ recommended)
- MongoDB installed or use a cloud database like **MongoDB Atlas**
- Postman (or any API testing tool)

### 2️⃣ Clone the Repository

```sh
git clone https://github.com/GhaaZaaal/PetStore.git
cd PetStore
```

### 3️⃣ Install Dependencies

```sh
npm install
```

### 4️⃣ Setup Environment Variables

1. Create a `.env` file in the project root:
2. Add the following variables:

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
```

### 5️⃣ Run the Server

```sh
npm start        # Start in production mode
npm run dev      # Start with Nodemon (for development)
```

---

## 🔥 API Endpoints

### Authentication (`/api/v1/auth`)

| Method | Endpoint  | Description              |
| ------ | --------- | ------------------------ |
| POST   | `/signup` | Register new user        |
| POST   | `/login`  | User login (returns JWT) |

### Products (`/api/v1/products`)

| Method | Endpoint | Description            |
| ------ | -------- | ---------------------- |
| GET    | `/`      | Get all products       |
| POST   | `/`      | Add new product        |
| GET    | `/:id`   | Get a product by ID    |
| PUT    | `/:id`   | Update product details |
| DELETE | `/:id`   | Delete a product       |

### Users (`/api/v1/users`)

| Method | Endpoint        | Description                |
| ------ | --------------- | -------------------------- |
| GET    | `/getMe`        | Get logged-in user profile |
| PUT    | `/updateMe`     | Update user profile        |
| DELETE | `/deactivateMe` | Delete user account        |

### Orders (`/api/v1/orders`)

| Method | Endpoint   | Description         |
| ------ | ---------- | ------------------- |
| POST   | `/:cartId` | Create a new order  |
| GET    | `/:id`     | Get order details   |
| GET    | `/`        | Get all user orders |

---

## ✅ Best Practices Followed

- **Code Modularization**: Separated concerns into **controllers, routes, middleware, and utilities**.
- **Security Enhancements**:
  - **JWT Authentication** for protected routes.
  - **Input Validation** using Joi.
  - **Secure Password Hashing** with bcrypt.
- **Efficient Logging**: Morgan is used to track API requests.
- **Proper Error Handling**: Global error middleware.

---

## 🛠️ Tools & Technologies Used

- **Node.js** & **Express.js** 🚀
- **MongoDB** & **Mongoose** 🛢️
- **JWT Authentication** 🔑
- **Postman** (for testing API) 🧪
- **Morgan** (Logging) 📝
- **Nodemon** (Auto-restart for dev) 🔄

---

## 🏗️ Future Improvements

- ✅ Add **unit testing** with Jest & Supertest.
- ✅ Implement **pagination** for product listing.
- ✅ Improve API documentation with **Swagger/OpenAPI**.
- ✅ Implement **role-based access control (RBAC)** for admins.

---

## 🏁 Contributing

Contributions are welcome! Feel free to fork, create issues, or open PRs.

## 🙏 Credits

This project is part of a learning journey at **ALX Software Engineering** Program into backend development. Special thanks to the tutorials, documentation, and community resources that made this possible!

## 📞 Contact

- **GitHub**: [GhaaZaaal](https://github.com/GhaaZaaal)
- **Email**: ahmed.alx.ghazal@gmail.com
