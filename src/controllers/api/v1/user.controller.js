const db = require("../../../models");
// const axios = require('axios').default;
const lang = require("../../../lang/en").lang_en;
const User = db.users;

exports.get = (req, res) => {
    let { page, limit } = req.query;
    page = Number(page ?? 1);
    limit = Number(limit ?? 10);
    limit = limit > 100 ? 100 : limit;
    const offset = (page - 1) * limit;

    User.find({}).skip(offset).limit(limit + 1).then((users) => {
        let pagination = {};
        if (users.length) {
            if (page > 1) pagination.previous = page - 1;
            pagination.current = page;
            if (users.length == limit + 1) pagination.next = page + 1;
        }

        if (users.length == limit + 1) {
            users.pop();
        }

        pagination.count = users.length;
        return res.send({
            "data": users,
            pagination
        });
    }).catch(err => {
        return res.status(500).send({
            errors: {
                message: lang.server_error
            }
        });
    });
};

exports.post = async (req, res) => {
    const {
        firstname,
        lastname,
        email,
        username
    } = req.body;
    if (!(firstname && lastname && email && username)) {
        return res.send({
            errors: {
                message: lang.user.missingFieldRequireds
            }
        });
    }

    if (await User.exists({ username })) {
        return res.send({
            errors: {
                message: lang.user.username.unique
            }
        });
    }
    const user = new User({ firstname, lastname, email, username });
    user.save().then((new_user) => {
        res.send({ "data": new_user });
    }).catch((resp) => {
        res.send({
            errors: {
                message: lang.server.error
            },
            resp
        });
    });
};

exports.getById = (req, res) => {
    const {
        id
    } = req.params;

    if (!db.mongoose.Types.ObjectId.isValid(id)) {
        return res.status(403).send({
            errors: {
                message: lang.user.notFound
            }
        });
    }

    User.findById(id).then(user => {
        res.send({ data: user });
    }).catch((err) => {
        res.status(500).send({
            errors: {
                message: lang.user.error
            },
        });
    });
};

exports.update = async (req, res) => {
    const {
        id
    } = req.params;
    const {
        firstname,
        lastname,
        email,
        username
    } = req.body;

    if (!db.mongoose.Types.ObjectId.isValid(id)) {
        return res.status(403).send({
            errors: {
                message: lang.user.notFound
            }
        });
    }

    const user = await User.findById(id);
    if (!user) {
        return res.status(403).send({
            errors: {
                message: lang.user.notFound
            }
        });
    }

    if (await User.exists({ username }) && username != user.username) {
        return res.send({
            errors: {
                message: lang.user.username.unique
            }
        });
    }

    if (firstname) user.firstname = firstname;
    if (lastname) user.lastname = lastname;
    if (username) user.username = username;
    if (email) user.email = email;

    user.save().then((new_user) => {
        res.send({ "data": new_user });
    }).catch((resp) => {
        res.send({
            errors: {
                message: lang.server.error
            }
        });
    });
};

exports.delete = async (req, res) => {
    const {
        id
    } = req.params;

    if (!db.mongoose.Types.ObjectId.isValid(id)) {
        return res.status(403).send({
            errors: {
                message: lang.user.notFound
            }
        });
    }

    const user = await User.findById(id);
    if (!user) {
        return res.status(403).send({
            errors: {
                message: lang.user.notFound
            }
        });
    }

    User.deleteOne({ _id: user._id }).then(deleted_user => {
        res.send({ data: user });
    }).catch(err => {
        return res.status(500).send({
            errors: {
                message: lang.user.error
            }
        });
    });
};
