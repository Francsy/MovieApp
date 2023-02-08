const pool = require('../utils/db_pgsql')

// Create a new user to the Postgres db
const createUser = async (email, hashPassword, role, google_id = null) => {
    let client, result;
    try {
         // Connect to the Postgres db and make the query
        client = await pool.connect();
        let data = await client.query('INSERT INTO users (password, email, role, google_id) VALUES ($1, $2, $3, $4)', [hashPassword, email, role, google_id])
        // If the user used Google to authenticate, set the logged_in status to true because Google users don´t go through the login route 
        if (google_id !== null) {
            data = await client.query(`UPDATE users SET logged_in='true' WHERE email=$1`, [email]);
        }
        result = data.rowCount
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release(); // Close the connection
    }
    return result
}

// Get the user data 
const getUserData = async (email) => {
    let client, result;
    try {
        // Connect to the Postgres db and make the query
        client = await pool.connect();
        const data = await client.query('SELECT user_id, password, role, google_Id FROM users WHERE email = $1', [email])
        result = data.rows;
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release(); // Close the connection
    }
    return result
}

// Check if a Google user exists
const checkGoogleUser = async (google_id) => {
    let client, result;
    try {
        // Connect to the Postgres db and make the query
        client = await pool.connect();
        const data = await client.query('SELECT * FROM users WHERE google_id = $1', [google_id])
        result = data.rows;
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release(); // Close the connection
    }
    return result
}

// Change the user's logged_in status to true
const changeStatusToTrue = async (email) => {
    let client, result;
    try {
        // Connect to the Postgres db and make the query
        client = await pool.connect();
        const data = await client.query(`UPDATE users SET logged_in='true' WHERE email=$1`, [email])
        result = data.rows;
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();  // Close the connection
    }
    return result
}

// Change the user's logged_in status to false
const changeStatusToFalse = async (email) => {
    let client, result;
    try {
        // Connect to the Postgres db and make the query
        client = await pool.connect();
        const data = await client.query(`UPDATE users SET logged_in='false' WHERE email=$1`, [email])
        result = data.rows;
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();  // Close the connection
    }
    return result
}

// Get the user's role
const getRole = async (email) => {
    let client, result;
    try {
        // Connect to the Postgres db and make the query
        client = await pool.connect();
        const data = await client.query(`SELECT role, logged_in FROM users WHERE email = $1`, [email])
        result = data.rows;
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release(); // Close the connection
    }
    return result
}

// Set a new password to the user
const setNewPassword = async (email, newPassword) => {
    let client, result;
    try {
        // Connect to the Postgres db and make the query
        client = await pool.connect();
        const data = await client.query(`UPDATE users SET password=$1 WHERE email=$2`, [newPassword, email])
        result = data.rows;
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release(); // Close the connection
    }
    return result
}

module.exports = {
    createUser,
    getUserData,
    checkGoogleUser,
    changeStatusToTrue,
    changeStatusToFalse,
    getRole,
    setNewPassword
}