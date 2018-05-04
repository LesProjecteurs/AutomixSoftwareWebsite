const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const keys = require("./config/keys");

require("./models/Counter");
require("./models/ReleaseInfo");

mongoose.connect(keys.mongoURI).then(
    () => {
        console.log("Connected to database : " + mongoose.connection.db.databaseName);
    },
    err => {
        console.log(err);
    }
);

const dataManager = require("./services/dataManager");
const app = express();

app.set("port", (process.env.PORT || 5000));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.listen(app.get("port"), function () {
    console.log("Node app is running at localhost:" + app.get("port"));
});

app.use(express.static(__dirname + "/public"));

app.get("/", async (req, res) => {
    const counter = await dataManager.getCounter();
    const releaseInfo = await dataManager.getReleaseInfo();

    const parameters = {
        dlcounter: counter ? counter.downloads : null,
        releaseVersion: releaseInfo ? releaseInfo.versionNumber : null,
        releaseDlUrl: releaseInfo ? releaseInfo.downloadUrl : null
    };

    res.render("pages/index", parameters);
});

app.post("/api/incdlcounter", (req, res) => {
    console.log("+1 download");
    dataManager
        .IncrementDownloadsCounter()
        .then((value) => {
            res.status(200).send({ dlCounter: value });
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(500);
        });
});

//404 handler
app.get("*", function (req, res, next) {
    const err = new Error("Not Found");
    err.statusCode = 404;
    throw err;
});

//error handler
app.use(function (err, req, res, next) {
    if (err && err.statusCode != "404") {
        console.log(err);
    }
    res.status(err.statusCode ? err.statusCode : "500").send(err.message);
});
