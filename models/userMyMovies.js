const pool = require('../utils/db_pgsql')

// GET
const getMoviesById = async (userid) => {
    let client, result;
    try {
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query('SELECT f.movie_title FROM favorites AS f WHERE f.user_id = $1', [userid])
        result = data.rows
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result
}

const entries = {
    getMoviesById
}

module.exports = entries;