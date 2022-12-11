module.exports = (app, endpoint) => {
    const user = require("../../../controllers/api/v1/user.controller");
    var router = require("express").Router();

    router.get("/", user.get);
    router.post("/", user.post);
    router.get("/:id", user.getById);
    router.put("/:id", user.update);
    router.delete("/:id", user.delete);

    app.use(endpoint, router);
};
