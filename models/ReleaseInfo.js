const mongoose = require("mongoose");
const { Schema } = mongoose;

const ReleaseInfo = new Schema({
    versionNumber: { type: String },
    downloadUrl: { type: String }
});

mongoose.model("releaseinfo", ReleaseInfo, "releaseinfo");