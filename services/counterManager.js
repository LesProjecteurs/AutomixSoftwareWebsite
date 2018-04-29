const mongoose = require("mongoose");
const Counter = mongoose.model("counter");

exports.getCounter = async function () {

    let counter = null;

    try {
        counter = await Counter.findOne();
    }
    catch (error) {
        console.log(error);
        return null;
    }

    return counter;
};

exports.IncrementDownloadsCounter = function () {
    return new Promise(async (resolve, reject) => {

        const counter = await this.getCounter();

        if (!counter) {
            return reject("Error while searching counter");
        }

        counter.downloads += 1;
        counter.save();

        return resolve(counter.downloads);
    });
};