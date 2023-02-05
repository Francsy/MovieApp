const pool = require('../utils/db_pgsql')

// CREATE USER
const createUser = async (email, hashPassword, role) => {
    let client, result;
    try {
        client = await pool.connect();
        const data = await client.query('INSERT INTO users (password, email, role) VALUES ($1, $2, $3)', [hashPassword, email, role])
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
const getUserPassword = async (email) => {
    let client, result;
    try {
        client = await pool.connect();
        const data = await client.query('SELECT password, role FROM users WHERE email = $1', [email])
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

const getRole = async (email ) => {
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

const setNewPassword = async (email, newPassword) => {
    let client, result;
    try {
        client = await pool.connect(); 
        const data = await client.query(`UPDATE users SET password=$1 WHERE email=$2`, [newPassword, email])
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
    getUserPassword,
    changeStatusToTrue,
    getRole,
    setNewPassword
}