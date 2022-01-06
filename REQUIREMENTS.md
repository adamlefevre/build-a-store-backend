# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index: 'products/' [GET]
- Show: 'products/:id' [GET]
- Create [token required]: 'products/' [POST]
- [OPTIONAL] Top 5 most popular products: 'popular/' [GET]
- [OPTIONAL] Products by category (args: product category) 'product/:category' [GET]

#### Users
- Index [token required]: 'users/' [GET]
- Show [token required]: 'users/:id' [GET]
- Create N[token required]: 'users/' [POST]

#### Orders
- Current Order by user (args: user id)[token required]: 'orders/:id' [GET]
- [OPTIONAL] Completed Orders by user (args: user id)[token required]: 'orders/:id/completed/' [GET]

## Data Shapes
#### Product
-  id: varchar
- name: varchar
- price: number
- [OPTIONAL] category: varchar

#### User
- id: varchar
- firstName: varchar
- lastName: varchar
- password: varchar

#### Orders
- id: varchar
- id of each product in the order: varchar (fk relationship)
- quantity of each product in the order: number
- user_id: varchar
- status of order (active or complete): varchar

## DATA TABLES
#### Products
-  id: varchar
- name: varchar
- price: number
- [OPTIONAL] category: varchar

#### User
- id: varchar
- firstName: varchar
- lastName: varchar
- password: varchar

#### Orders
- id: varchar
- user_id: varchar
- status of order (active or complete): varchar

#### Product_Orders
- id: varchar
- orderid: varchar (fk relationship)
- productid: varchar (fk relationship)
