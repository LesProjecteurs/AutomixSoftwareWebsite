const mongoose = require("mongoose");
const Counter = mongoose.model("counter");
const ReleaseInfo = mongoose.model("releaseinfo");

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

exports.getCounter = async function () {
    return await getData(Counter);
};

exports.getReleaseInfo = async function () {
    return await getData(ReleaseInfo);
};


async function getData(model) {

    let data = null;

    try {
        data = await model.findOne();
    }
    catch (error) {
        console.log(error);
        return null;
    }

    return data;
};