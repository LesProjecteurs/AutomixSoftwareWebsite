var express = require("express");
const path = require("path");
var app = express();

app.set("port", (process.env.PORT || 5000));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.listen(app.get("port"), function () {
    console.log("Node app is running at localhost:" + app.get("port"));
});

app.use(express.static(__dirname + "/public"));