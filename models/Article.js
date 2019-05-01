const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Note = require('./Note');

const articleSchema = new Schema({

    ringerId: {
        type: String,
        required: true,
        unique: true
    },

    lastUpdated: {
        type: Date,
        default: Date.now()
    },
    
    title: {
        type: String,
        required: true
    },

    blurb: {
        type: String,
        required: true
    },

    link: {
        type: String,
        required: true
    },

    image_url: {
        type: String,
        required: true
    },

    saved: {
        type: Boolean,
        default: false
    },

    notes: [{
        type: Schema.Types.ObjectId,
        ref: "Note"
    }]

}, { useFindAndModify: false });

articleSchema.pre('deleteMany', async () => Note.deleteMany({}));

const Article = mongoose.model("Article", articleSchema);

module.exports = Article;