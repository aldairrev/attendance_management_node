module.exports = (app, endpoint) => {
    const user = require("../controllers/user.controller");
    var router = require("express").Router();

    router.get(user.get);

    app.use(endpoint, router);
};
