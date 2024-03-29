const helper = require("../helpers/mongoose.helper");
const lang = require("../lang/en").lang_en;

module.exports = mongoose => {
    var schema = mongoose.Schema({
        firstname: { type: String, required: true },
        lastname: { type: String, required: true },
        username: {
            type: String,
            required: [true, lang.user.username.required],
            unique: [true, lang.user.username.unique]
        },
        email: {
            type: String,
            required: [true, lang.user.email.required],
        },
        status: { type: Boolean, default: true, }
    }, { timestamps: true });

    const model = mongoose.model("users", schema);
    return model;
};
