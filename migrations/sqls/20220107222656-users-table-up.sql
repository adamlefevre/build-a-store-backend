CREATE TABLE users (
    id integer primary key generated always as identity,
    firstname varchar(100),
    lastname varchar(100),
    password varchar(50)
);