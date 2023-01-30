CREATE TABLE users (
	user_id serial PRIMARY KEY,
	username VARCHAR ( 50 ) UNIQUE NOT NULL,
	password VARCHAR ( 50 ) NOT NULL,
	email VARCHAR ( 255 ) UNIQUE NOT NULL
);
CREATE TABLE roles(
    role_id serial PRIMARY KEY,
    role_name VARCHAR (255) UNIQUE NOT NULL
);
CREATE TABLE user_roles (
    user_id INT NOT NULL,
    role_id INT NOT NULL,
    PRIMARY KEY (user_id, role_id),
    FOREIGN KEY (role_id)
        REFERENCES roles (role_id),
    FOREIGN KEY (user_id)
        REFERENCES users (user_id)
);
CREATE TABLE favorites (
    movie_title VARCHAR ( 255 ) PRIMARY KEY
);
CREATE TABLE user_favorites (
    user_id INT NOT NULL,
    movie_title VARCHAR ( 255 ) NOT NULL,
    PRIMARY KEY (user_id, movie_title),
    FOREIGN KEY (movie_title)
        REFERENCES roles (movie_title),
    FOREIGN KEY (user_id)
        REFERENCES users (user_id)
    date_added TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);