const pool = require('../utils/db_pgsql')

// GET
// const getMoviesById = async (userid) => {
//     let client, result;
//     try {
//         client = await pool.connect(); // Espera a abrir conexion
//         const data = await client.query('SELECT f.movie_title FROM favorites AS f WHERE f.user_id = $1', [userid])
//         result = data.rows
//     } catch (err) {
//         console.log(err);
//         throw err;
//     } finally {
//         client.release();
//     }
//     return result
// }

// Envia la query para retornar las pelis favoritas (id, imagen y titulo)

const getMoviesById = async (userid) => {
    let client, result;
    try {
        if (!userid) {
            throw new Error("userid is required");
        }
        client = await pool.connect();
        const data = await client.query('SELECT movie_title FROM favorites WHERE user_id = $1', [userid])
        result = data.rows
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        // client.release();
    }
    return result
}

// Añade un favorito introduciendo titulo, imagen e id 

const postMovieById = async (userid, movie_title, movie_poster) => {
    let client, result;
    try {
        if (!userid) {
            throw new Error("userid is required");
        }
        if (!movie_title) {
            throw new Error("Title is required");
        }
        client = await pool.connect();
        const data = await client.query('INSERT INTO favorites (user_id, movie_title, date_added, movie_poster) VALUES ($1, $2, $3, $4)', [userid, title, "CURRENT_TIMESTAMP", movie_poster])
        result = data.rows
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        // client.release();
    }
    return result
};

module.exports = {
    getMoviesById, 
    postMovieById 
}