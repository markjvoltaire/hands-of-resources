-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`

DROP TABLE IF EXISTS hats;

CREATE TABLE hats (
    id BIGINT GENERATED ALWAYS AS IDENTITY,
    kind TEXT NOT NULL,
    color TEXT NOT NULL
);


DROP TABLE IF EXISTS pants;

CREATE TABLE pants (
    id BIGINT GENERATED ALWAYS AS IDENTITY,
    kind TEXT NOT NULL,
    color TEXT NOT NULL
);


DROP TABLE IF EXISTS shoes;

CREATE TABLE shoes (
    id BIGINT GENERATED ALWAYS AS IDENTITY,
    kind TEXT NOT NULL,
    color TEXT NOT NULL
);

DROP TABLE IF EXISTS shirts;

CREATE TABLE shirts (
    id BIGINT GENERATED ALWAYS AS IDENTITY,
    kind TEXT NOT NULL,
    color TEXT NOT NULL
);

DROP TABLE IF EXISTS socks;

CREATE TABLE socks (
    id BIGINT GENERATED ALWAYS AS IDENTITY,
    kind TEXT NOT NULL,
    color TEXT NOT NULL
);

INSERT INTO hats (kind, color) VALUES ('snapback', 'black');

INSERT INTO pants (kind, color) VALUES ('jeans', 'red');

INSERT INTO shirts (kind, color) VALUES ('jersey', 'yellow');

INSERT INTO shirts (kind, color) VALUES ('button-up', 'red');

INSERT INTO shoes (kind, color) VALUES ('nike', 'red');