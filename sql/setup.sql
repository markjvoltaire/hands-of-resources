-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`

DROP TABLE IF EXISTS hats;

CREATE TABLE hats (
    id BIGINT GENERATED ALWAYS AS IDENTITY,
    kind TEXT NOT NULL,
    color TEXT NOT NULL
);