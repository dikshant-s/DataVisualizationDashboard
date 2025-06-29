const mongoose = require("mongoose");
const fs = require("fs");
const Data = require("../models/Data");

mongoose.connect("mongodb://localhost:27017/dashboardDB", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(async () => {
        const rawData = fs.readFileSync("./data/jsondata.json");
        const jsonData = JSON.parse(rawData);
        await Data.deleteMany({});
        await Data.insertMany(jsonData);
        console.log("Data loaded");
        mongoose.disconnect();
    });
