const axios = require("axios");
const cheerio = require("cheerio");

const db = require("../models");
const router = require("./htmlController.js");

router.get("/api/article/scrape", (req, res) => {
    axios.get("http://www.theringer.com").then(response => {

        const $ = cheerio.load(response.data, {xml: {xmlMode: true}});

        $(".c-entry-box--compact").each(async function(i, element) {
            let result = {};

            result.title = $(this)
                .find(".c-entry-box--compact__title")
                .text();
            result.link = $(this)
                .children("a")
                .attr("href");
            result.ringerId = $(this)
                .data("chorus-optimize-id");
            result.blurb = $(this)
                .find(".p-dek")
                .text();
            result.image_url = $(this)
                .find("noscript img")
                .attr("src");

            console.log("\nindex: " + i,
                        "title: " + result.title,
                        "image: " + result.image_url + "\n\n");

            await db.Article.create(result)
                .then( dbArticle => {
                    console.log(dbArticle);
                })
                .catch(err => {
                    console.log(err)
                    if(err.message === 'Path `image_url` is required.')
                        console.log(JSON.stringify(err, 2, null));
                });
        });
        res.status(200).send("back");
    });
});

router.post("/api/article/:id/notes", (req, res) => {

    console.log(req.body.note);

    db.Note.create({ content: req.body.note, active: true }).then(noteResult => {

        console.log(noteResult);

        db.Article.findOne( { ringerId: req.params.id } ).then(articleResult => {

            let notesArr = articleResult.notes;
            notesArr.push(noteResult._id);

            db.Article.findOneAndUpdate( {ringerId: req.params.id}, 
                                         { $set: { notes: notesArr, lastUpdated: Date.now() } }, 
                                         { new: true }).then(final => res.send(noteResult));
        });
    });


});

router.delete("/api/article/notes/:id", (req, res) => {

    const noteId = req.params.id;

    db.Note.findOneAndUpdate({ _id: noteId }, { active: false })
        .then(response => res.send(response))
        .catch(console.log)
});

router.delete("/api/articles/all", (req, res) => {
    db.Article.deleteMany({}).then(response => res.status(200).send("back"));
});

router.post("/api/article/save", (req, res) => {
    console.log(req.body);
    db.Article.findOneAndUpdate( req.body, { $set: { saved: true, lastUpdated: Date.now() } } ).then(result => res.status(200).send(result));
});

router.post("/api/article/unsave", (req, res) => {
    console.log(req.body);
    db.Article.findOneAndUpdate( req.body, { $set: { saved: false, lastUpdated: Date.now() } } ).then(result => res.status(200).send(result));
});


module.exports = router;