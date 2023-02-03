CREATE TABLE users (
	user_id serial PRIMARY KEY,
	username VARCHAR ( 50 ) UNIQUE NOT NULL,
	password VARCHAR ( 50 ) NOT NULL,
	email VARCHAR ( 255 ) UNIQUE NOT NULL,
    role VARCHAR ( 50 ) UNIQUE NOT NULL
);

CREATE TABLE favorites (
    user_id INT NOT NULL,
    movie_title VARCHAR ( 255 ) NOT NULL,
    date_added TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, movie_title),
    FOREIGN KEY (user_id),
        REFERENCES users (user_id)
);
