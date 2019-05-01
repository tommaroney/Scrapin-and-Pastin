const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const NoteSchema = new Schema({

    content: {
        type: String,
        required: true
    },

    active: {
        type: Boolean,
        default: false
    },

    created: {
        type: Date,
        default: Date.now()
    }

}, { useFindAndModify: false });

const Note = mongoose.model("Note", NoteSchema);

module.exports = Note;