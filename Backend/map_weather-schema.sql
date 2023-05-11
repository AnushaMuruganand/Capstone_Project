CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(25) UNIQUE,
  password TEXT NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL
    CHECK (position('@' IN email) > 1)
);

CREATE TABLE weather_reports (
  id SERIAL PRIMARY KEY,
  user_id INTEGER
    REFERENCES users ON DELETE CASCADE,
  city TEXT,
  region TEXT,
  country TEXT
);

CREATE TABLE weather_recents (
  id SERIAL PRIMARY KEY,
  city TEXT,
  region TEXT,
  country TEXT
);

CREATE TABLE location_recents (
  id SERIAL PRIMARY KEY,
  address TEXT
);
