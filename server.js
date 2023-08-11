require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

var corsOptions = {
    origin: "*"
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = require("./src/models");

db.mongoose
    .connect(db.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("🍃 MongoDB Connected");
    })
    .catch(err => {
        console.log("Cannot connect to Mongo!", err);
        global.process.exit();
    });

app.get("/", (req, res) => {
    res.json({
        message: "Hello!"
    });
});

require("./src/routes/api/v1/user.route")(app, "/api/v1/users");

const PORT = global.process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
