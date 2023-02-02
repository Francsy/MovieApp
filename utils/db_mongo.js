const mongoose = require("mongoose");
require('dotenv').config();

const url = process.env.ATLAS_ADMIN_CONNECTION //||"mongodb://localhost:27017/test";
mongoose.set('strictQuery', false);

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;

// Eventos
db.on("error", error => console.log(error));
db.once("open", () => console.log("connection to db established"));

module.exports = mongoose;