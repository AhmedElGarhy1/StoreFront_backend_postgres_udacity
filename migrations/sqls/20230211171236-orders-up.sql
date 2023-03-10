CREATE TYPE order_status AS ENUM('ACTIVE', 'COMPLETE');

CREATE TABLE orders(
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    status order_status DEFAULT 'ACTIVE'
);