module.exports = (app, endpoint) => {
    const user = require("../../../controllers/api/v1/user.controller");
    var router = require("express").Router();

    router.get(user.get);

    app.use(endpoint, router);
};
