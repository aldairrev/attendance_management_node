const dbConfig = require("../config/db.config");

const mongoose = require("mongoose");
mongoose.set("debug", true);
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.users = require("./user.model")(mongoose);

module.exports = db;
