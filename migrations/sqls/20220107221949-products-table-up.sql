CREATE TABLE products (
    id integer primary key generated always as identity,
    name varchar(100),
    price numeric,
    category varchar(50)
);