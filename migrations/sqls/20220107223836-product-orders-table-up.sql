CREATE TABLE product_orders (
    id integer primary key generated always as identity,
    orderid integer,
    productid integer
);