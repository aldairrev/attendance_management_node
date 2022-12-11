const db = require("../../../models");
// const axios = require('axios').default;
const User = db.users;

exports.get = (req, res) => {
    const user = new User();
    res.send({ "user": user });
};
