const pool = require('../utils/db_pgsql')

// CREATE USER
const createUser = async (email, hashPassword, role, google_id = null) => {
    let client, result;
    try {
        client = await pool.connect();
        let data = await client.query('INSERT INTO users (password, email, role, google_id) VALUES ($1, $2, $3, $4)', [hashPassword, email, role, google_id])
        if (google_id !== null) {
            data = await client.query(`UPDATE users SET logged_in='true' WHERE email=$1`, [email]);
        }
        result = data.rowCount
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result
}

//LOG USER
const getUserData = async (email) => {
    let client, result;
    try {
        client = await pool.connect();
        const data = await client.query('SELECT user_id, password, role, google_Id FROM users WHERE email = $1', [email])
        result = data.rows;
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result
}

// Comprobar si el usuario de Google existe
const checkGoogleUser = async (google_id) => {
    let client, result;
    try {
        client = await pool.connect();
        const data = await client.query('SELECT * FROM users WHERE google_id = $1', [google_id])
        result = data.rows;
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result
}

const changeStatusToTrue = async (email) => {
    let client, result;
    try {
        client = await pool.connect();
        const data = await client.query(`UPDATE users SET logged_in='true' WHERE email=$1`, [email])
        result = data.rows;
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result
}

const changeStatusToFalse = async (email) => {
    let client, result;
    try {
        client = await pool.connect();
        const data = await client.query(`UPDATE users SET logged_in='false' WHERE email=$1`, [email])
        result = data.rows;
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result
}

const getRole = async (email) => {
    let client, result;
    try {
        client = await pool.connect();
        const data = await client.query(`SELECT role, logged_in FROM users WHERE email = $1`, [email])
        result = data.rows;
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result
}

module.exports = {
    createUser,
    getUserData,
    checkGoogleUser,
    changeStatusToTrue,
    changeStatusToFalse,
    getRole
}