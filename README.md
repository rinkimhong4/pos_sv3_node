# POS SV3 API

A Point of Sale (POS) system API built with Node.js, Express.js, and Sequelize ORM for MySQL database management.

## Project Overview

This project provides a RESTful API for managing a Point of Sale system. It includes functionalities for user authentication, product management, category organization, order processing, and order details tracking.

## Technologies Used

- **Backend Framework**: Express.js
- **Database**: MySQL
- **ORM**: Sequelize
- **Authentication**: bcrypt for password hashing
- **Templating**: Jade (Pug)
- **Middleware**: Morgan (logging), CORS, Cookie Parser
- **Development**: Nodemon for hot reloading

## Project Structure

```
pos_sv3_api/
├── app.js                 # Main application file
├── bin/
│   └── www                # Server startup script
├── configs/
│   └── database.js        # Database configuration
├── controllers/           # Business logic controllers
│   ├── category.controller.js
│   ├── order.controller.js
│   ├── orderdetail.controller.js
│   ├── product.controller.js
│   └── user.controller.js
├── models/                # Sequelize models
│   ├── category.model.js
│   ├── order.detail.model.js
│   ├── order.model.js
│   ├── product.model.js
│   └── user.model.js
├── routes/                # API route definitions
│   ├── category.route.js
│   ├── index.js
│   ├── order.detail.route.js
│   ├── order.route.js
│   ├── product.route.js
│   └── users.route.js
├── services/
│   └── DBContext.js       # Database context and model initialization
├── views/                 # Jade templates
│   ├── error.jade
│   ├── index.jade
│   └── layout.jade
├── public/                # Static files
│   ├── images/
│   ├── javascripts/
│   └── stylesheets/
├── package.json           # Dependencies and scripts
├── database.sql           # Database schema (currently empty)
└── README.md              # This file
```

## Database Schema

The application uses the following main entities:

### User

- UserID (Primary Key, Auto Increment)
- Username (Unique, Not Null)
- Password (Hashed with bcrypt)
- Status (Default: 'active')

### Category

- CategoryID (Primary Key, Auto Increment)
- CategoryName (Not Null)

### Product

- ProductID (Primary Key, Auto Increment)
- ProductName (Not Null)
- Qty (Quantity, Not Null)
- Price (Decimal 10,2, Not Null)
- ProductImage (String)
- Discount (Decimal 5,2, Default 0)
- CategoryID (Foreign Key to Category)

### Order

- OrderID (Primary Key, Auto Increment)
- OrderDate (Date Only, Not Null)
- OrderNo (Unique Integer, Not Null)
- UserID (Foreign Key to User)

### OrderDetail

- Odid (Primary Key, Auto Increment)
- ProductID (Foreign Key to Product, Not Null)
- OrderID (Foreign Key to Order, Not Null)
- Qty (Quantity, Not Null)
- Discount (Decimal 5,2, Default 0)

## API Endpoints

### User Management

- `GET /api/user` - Get all users
- `GET /api/user/:id` - Get user by ID
- `GET /api/user/search/:name` - Search user by username
- `POST /api/user/create` - Create new user
- `POST /api/user/login` - User login
- `PUT /api/user/update/:id` - Update user
- `DELETE /api/user/delete/:id` - Delete user

### Categories

- Routes defined in `routes/category.route.js`

### Products

- Routes defined in `routes/product.route.js`

### Orders

- Routes defined in `routes/order.route.js`

### Order Details

- Routes defined in `routes/order.detail.route.js`

## Installation and Setup

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd pos_sv3_api
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Database Setup**

   - Ensure MySQL is running
   - Create database named `pos_sv3`
   - Update database credentials in `configs/database.js` if necessary

4. **Run the application**
   - Development mode: `npm run dev`
   - Production mode: `npm start`

The server will start on the port defined in `bin/www` (default is 3000).

## Configuration

Database configuration is located in `configs/database.js`. Update the following as needed:

- host
- user
- password
- database
- port

## Authentication

User authentication is handled via bcrypt for password hashing. The login endpoint compares hashed passwords.

Note: Password hashing hooks in the User model are currently commented out. Uncomment them in `models/user.model.js` for automatic hashing on create/update.

## Development Notes

- The project uses Sequelize ORM for database operations
- Error handling is implemented in controllers
- CORS is enabled for cross-origin requests
- Static files are served from the `public` directory
- Jade templating is set up but primarily used for error pages

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is private and not licensed for public use.
