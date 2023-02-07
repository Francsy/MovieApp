CREATE TABLE users (
	user_id serial PRIMARY KEY,
	password VARCHAR ( 255 ),
	email VARCHAR ( 255 ) UNIQUE NOT NULL,
    role VARCHAR ( 50 ) NOT NULL,
    logged_in BOOLEAN DEFAULT false,
    google_id VARCHAR (255)
);

CREATE TABLE favorites (
    user_id INT NOT NULL,
    movie_id VARCHAR ( 255 ),
    movie_title VARCHAR ( 255 ) NOT NULL,
    date_added TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    movie_poster VARCHAR ( 255 ) NOT NULL,
    PRIMARY KEY (user_id, movie_id),
    FOREIGN KEY (user_id)
        REFERENCES users (user_id)
);
