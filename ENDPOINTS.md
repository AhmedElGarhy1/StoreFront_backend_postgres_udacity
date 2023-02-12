# API Endpoints:

## Users

- `GET  - /api/users/` get all users (token Required)
- `POST - /api/users/` create a user
- `GET  - /api/users/:id` get a user (token Required)

## products

- `GET  - /api/products/` get all products
- `POST - /api/products/` get all products (token Required)
- `GET  - /api/products/:id` get all one Product
- `GET  - /api/products/category/:category` get all products in the category
- `GET  - /api/products/popular` get Most popular products

## orders

- `GET  - /api/orders/` get all product on the active order (token Required)
- `POST - /api/orders/` add product to the order (token Required)
- `GET  - /api/orders/complete` get all completed orders (token Required)
- `PATCH- /api/orders/complete` update order status (token Required)
- `GET  - /api/orders/active` get current active order (token Required)
