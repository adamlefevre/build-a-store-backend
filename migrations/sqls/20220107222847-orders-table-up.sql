CREATE TABLE orders (
    id integer primary key generated always as identity,
    userid integer,
    status varchar(50)
);