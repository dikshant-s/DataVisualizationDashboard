const express = require("express");
const router = express.Router();
const Data = require("../models/Data");

router.get("/", async (req, res) => {
    const filters = req.query;
    try {
        const query = {};
        for (const key in filters) {
            if (filters[key]) query[key] = filters[key];
        }
        const data = await Data.find(query).limit(1000);
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get("/filters/:field", async (req, res) => {
    try {
        const values = await Data.distinct(req.params.field);
        res.json(values.filter(v => v !== ""));
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
