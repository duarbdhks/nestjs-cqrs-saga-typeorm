CREATE USER boilerplate WITH PASSWORD 'test123';
CREATE DATABASE boilerplate;
GRANT ALL PRIVILEGES ON DATABASE boilerplate to boilerplate;

CREATE TABLE IF NOT EXISTS users (
  user_id    SERIAL PRIMARY KEY,
  first_name VARCHAR(255)                      DEFAULT NULL,
  last_name  VARCHAR(255)                      DEFAULT NULL,
  email      VARCHAR(255) UNIQUE               DEFAULT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE
);
