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

<details>
  <summary> My Tree </summary>

```
.
├── app.js
├── routes
│   ├── authApi.js                  # Authentication endpoints
│   ├── brandApi.js                 # Brand endpoints
│   ├── cartApi.js                  # Cart management endpoints
│   ├── categoryApi.js              # Category endpoints
│   ├── index.js                    # Dry Principle endpoints For All
│   ├── orderApi.js                 # Order management endpoints
│   ├── productApi.js               # Product endpoints
│   ├── reviewApi.js                # Review management endpoints
│   ├── subCategoryApi.js           # SubCategory management endpoints
│   ├── userApi.js                  # User-related  endpoints
│   ├── wishListApi.js              # WishList management endpoints
├── config
│   ├── db.js                       # Database connection
├── controllers
│   ├── authControllers.js          # Authentication logic
│   ├── brandControllers.js         # Brand CRUD operations
│   ├── cartControllers.js          # Cart CRUD operations
│   ├── categoryControllers.js      # Category CRUD operations
│   ├── dontRepeatYourSelf.js       # Dry Principle CRUD operations For All
│   ├── orderControllers.js         # Order CRUD operations
│   ├── productControllers.js       # Product CRUD operations
│   ├── reviewControllers.js        # Review CRUD operations
│   ├── subCategoryControllers.js   # SubCategory CRUD operations
│   ├── userControllers.js          # User-related operations
│   ├── wishListControllers.js      # WishList CRUD operations
├── middleware
│   ├── errorMiddleware.js          # Global error handling
│   ├── uploadImage.js              # uploading Image Handler
│   ├── validatoryMiddleware.js     # Validation Errors Handler
├── models
│   ├── brandModel.js               # Brand schema/model
│   ├── cartModel.js                # Cart schema/model
│   ├── categoryModel.js            # Category schema/model
│   ├── orderModel.js               # Order schema/model
│   ├── productModel.js             # Product schema/model
│   ├── reviewModel.js              # Review schema/model
│   ├── subCategoryModel.js         # SubCategory schema/model
│   ├── userModel.js                # User schema/model
├── utils
│   ├── validators
    │   ├── authValidator.js        # Authentication Validator
    │   ├── brandValidator.js       # Brand CRUD operations Validators
    │   ├── categoryValidator.js    # Category CRUD operations Validators
    │   ├── productValidator.js     # Product CRUD operations Validators
    │   ├── reviewValidator.js      # Review CRUD operations Validators
    │   ├── subCategoryValidator.js # SubCategory CRUD operations Validators
    │   ├── userValidator.js        # User CRUD operations Validators
│   ├── apiError.js                 # Predicted Errors Handler
│   ├── apiFeatures.js              # APIs features
│   ├── createToken.js              # Creating token object
├── .gitignore                      # Ignoring sensitive files (node_modules, .env)
├── package.json                    # Project dependencies & scripts
├── package-lock.json               # Project dependencies & scripts
│   .env                            # Environment variable file
├── README.md                       # Documentation
```

</details>

---

## 🛠️ Installation & Setup

### 1️⃣ Prerequisites

- Node.js installed
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

# 🔥 API Endpoints

<details>
  <summary><h2 style="display: inline">Endpoints</h2></summary>

## 📌 Authentication (`/api/v1/auth`)

| **Method** | **Endpoint** | **Description**          |
| ---------- | ------------ | ------------------------ |
| `POST`     | `/signup`    | Register a new user      |
| `POST`     | `/login`     | User login (returns JWT) |

---

## 👤 Users (`/api/v1/users`)

| **Method** | **Endpoint**        | **Description**                |
| ---------- | ------------------- | ------------------------------ |
| `GET`      | `/getMe`            | Get logged-in user profile     |
| `PUT`      | `/updateMe`         | Update logged-in user data     |
| `PUT`      | `/updateMyPassword` | Update logged-in user password |
| `DELETE`   | `/deactivateMe`     | Deactivate logged-in user      |
| `GET`      | `/`                 | Get all users (Admin/Manager)  |
| `POST`     | `/`                 | Create a new user (Admin)      |
| `GET`      | `/:id`              | Get a user by ID (Admin)       |
| `PUT`      | `/:id`              | Update user details (Admin)    |
| `DELETE`   | `/:id`              | Delete a user (Admin)          |

---

## 🛒 Products (`/api/v1/products`)

| **Method** | **Endpoint**           | **Description**           |
| ---------- | ---------------------- | ------------------------- |
| `GET`      | `/`                    | Get all products          |
| `POST`     | `/`                    | Add a new product (Admin) |
| `GET`      | `/:id`                 | Get product by ID         |
| `PUT`      | `/:id`                 | Update product (Admin)    |
| `DELETE`   | `/:id`                 | Delete product (Admin)    |
| `GET`      | `/:productsId/reviews` | Get product reviews       |
| `POST`     | `/:productsId/reviews` | Add product review (User) |

---

## 🏷 Brands (`/api/v1/brands`)

| **Method** | **Endpoint** | **Description**               |
| ---------- | ------------ | ----------------------------- |
| `GET`      | `/`          | Get all brands                |
| `POST`     | `/`          | Add new brand (Admin/Manager) |
| `GET`      | `/:id`       | Get brand by ID               |
| `PUT`      | `/:id`       | Update brand (Admin/Manager)  |
| `DELETE`   | `/:id`       | Delete brand (Admin)          |

---

## 📂 Categories (`/api/v1/categories`)

| **Method** | **Endpoint**                 | **Description**                 |
| ---------- | ---------------------------- | ------------------------------- |
| `GET`      | `/`                          | Get all categories              |
| `POST`     | `/`                          | Add new category (Admin)        |
| `GET`      | `/:id`                       | Get category by ID              |
| `PUT`      | `/:id`                       | Update category (Admin)         |
| `DELETE`   | `/:id`                       | Delete category (Admin)         |
| `GET`      | `/:categoryId/subCategories` | Get subcategories of a category |
| `POST`     | `/:categoryId/subCategories` | Add subcategory (Admin)         |

---

## 🔖 Subcategories (`/api/v1/subCategories`)

| **Method** | **Endpoint** | **Description**             |
| ---------- | ------------ | --------------------------- |
| `GET`      | `/`          | Get all subcategories       |
| `POST`     | `/`          | Add new subcategory (Admin) |
| `GET`      | `/:id`       | Get subcategory by ID       |
| `PUT`      | `/:id`       | Update subcategory (Admin)  |
| `DELETE`   | `/:id`       | Delete subcategory (Admin)  |

---

## 🛍 Cart (`/api/v1/cart`)

| **Method** | **Endpoint** | **Description**            |
| ---------- | ------------ | -------------------------- |
| `GET`      | `/`          | Get logged-in user's cart  |
| `POST`     | `/`          | Add product to cart (User) |
| `DELETE`   | `/`          | Clear entire cart (User)   |
| `PUT`      | `/:itemId`   | Update cart item quantity  |
| `DELETE`   | `/:itemId`   | Remove specific cart item  |

---

## 📦 Orders (`/api/v1/orders`)

| **Method** | **Endpoint**   | **Description**                         |
| ---------- | -------------- | --------------------------------------- |
| `GET`      | `/`            | Get all user orders                     |
| `POST`     | `/:cartId`     | Create a new order (User)               |
| `GET`      | `/:id`         | Get order details                       |
| `PUT`      | `/:id/pay`     | Mark order as paid (Admin/Manager)      |
| `PUT`      | `/:id/deliver` | Mark order as delivered (Admin/Manager) |

---

## ❤️ Wishlist (`/api/v1/wishList`)

| **Method** | **Endpoint**  | **Description**                |
| ---------- | ------------- | ------------------------------ |
| `GET`      | `/`           | Get logged-in user's wishlist  |
| `POST`     | `/`           | Add product to wishlist (User) |
| `DELETE`   | `/:productId` | Remove product from wishlist   |

---

## ⭐ Reviews (`/api/v1/reviews`)

| **Method** | **Endpoint** | **Description**            |
| ---------- | ------------ | -------------------------- |
| `GET`      | `/`          | Get all reviews            |
| `POST`     | `/`          | Add a new review (User)    |
| `GET`      | `/:id`       | Get review details         |
| `PUT`      | `/:id`       | Update review (User)       |
| `DELETE`   | `/:id`       | Delete review (User/Admin) |

---

</details>

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
