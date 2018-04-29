const mongoose = require("mongoose");
const { Schema } = mongoose;

const Counter = new Schema({
    downloads: { type: Number, default: -1 }
});

mongoose.model("counter", Counter);
