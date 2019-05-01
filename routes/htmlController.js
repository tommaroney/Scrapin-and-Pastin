const express = require("express");
const db = require("../models");

const router = express.Router();

router.get("/", (req, res) => {
    db.Article
        .find()
        .sort({ringerId: 'descending'})
        .populate("notes")
        .then(results => res.render("index", { articles: results }));
});


router.get("/saved", (req, res) => {
 
    db.Article
        .find()
        .sort({lastUpdated: 'descending'})
        .populate("notes")
        .then(results => res.render("saved", { articles: results }));
});

module.exports = router;