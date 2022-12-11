const helper = require("../helpers/mongoose.helper");

module.exports = mongoose => {
    var schema = mongoose.Schema({
        firstname: String,
        lastname: String,
        email: String,
        username: String,
        created_at: Number,
        updated_at: Number,
    });

    schema.method("toJSON", helper.toJson);
    schema.method("setTimestamps", helper.setTimestamps);

    const model = mongoose.model("users", schema);
    return model;
};
