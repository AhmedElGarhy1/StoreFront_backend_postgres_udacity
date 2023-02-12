CREATE TABLE users(
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    username VARCHAR(150) UNIQUE,
    password VARCHAR,
    id SERIAL PRIMARY KEY
);