const pool = require('../utils/db_pgsql')

// Send the query for returning the user's favourite movies (id, poster and title)
const getMoviesByUser = async (id) => {
    let client, result;
    try {
        if (!id) { // Id was not provided
            throw new Error("userid is required");
        }
        // Connect to the Postgres db and make the query
        client = await pool.connect();
        const data = await client.query('SELECT movie_id, movie_title, movie_poster FROM favorites WHERE user_id = $1', [id])
        result = data.rows
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release(); // Close the connection
    }
    return result
}

// Add a favourite movie providing title, poster and ids
const postMovieById = async (id, movie_id, movie_title, movie_poster) => {
    let client, result;
    try {
        if (!id) {
            throw new Error("userid is required"); // User's id was not provided
        }
        if (!movie_title) {
            throw new Error("Title is required"); // Movie's title was not provided
        }
        // Connect to the Postgres db and make the query
        client = await pool.connect();
        const data = await client.query('INSERT INTO favorites (user_id, movie_id, movie_title, movie_poster) VALUES ($1, $2, $3, $4)', [id, movie_id, movie_title, movie_poster])
        result = data.rows
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release(); // Close the connection
    }
    return result
};

// Delete a movie from the user's favourite list by movie_id
const deleteMovieById = async (id, movie_id) => {
    let client, result;
    try {
        // Connect to the Postgres db and make the query
        client = await pool.connect();
        const data = await client.query('DELETE FROM favorites AS f WHERE f.user_id=$1 AND f.movie_id=$2', [id, movie_id])
        result = data.rowCount
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release(); // Close the connection
    }
    return result
};

const checkMovieInFavorites = async (id, movie_id) => {
    let client, result;
    try {
        client = await pool.connect();
        const data = await client.query('SELECT * FROM favorites WHERE user_id = $1 AND movie_id = $2', [id, movie_id]);
        result = data.rowCount > 0;
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result;
};

module.exports = {
    getMoviesByUser,
    postMovieById,
    deleteMovieById,
    checkMovieInFavorites
}