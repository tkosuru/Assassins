PRAGMA foreign_keys = ON;

CREATE TABLE players (
    user_id INTEGER PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    target_user_id INTEGER
);