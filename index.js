const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const counterManager = require("./services/counterManager");
const keys = require("./config/keys");

mongoose.connect(keys.mongoURI);

const app = express();

require("./models/Counter");

app.set("port", (process.env.PORT || 5000));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.listen(app.get("port"), function () {
    console.log("Node app is running at localhost:" + app.get("port"));
});

app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
    const counter = counterManager.getCounter();
    res.render("pages/index", { dlcounter: counter ? counter.downloads : null });
});

app.get("/api/incdlcounter", (req, res) => {
    counterManager
        .IncrementDownloadsCounter()
        .then(() => {
            res.sendStatus(200);
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(500);
        });
});

//404 handler
app.use(function (req, res, next) {
    const err = new Error("Not Found");
    err.statusCode = 404;
    next(err);
});

//error handler
app.use(function (err, req, res) {
    console.error(err.message);

    if (!err.statusCode) {
        err.statusCode = 500;
    }

    res.status(err.statusCode).send("ERROR " + err.statusCode);
});