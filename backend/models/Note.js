const mongoose = require('mongoose');
const { Schema } = mongoose;

const NotesSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    name: {
        type: String,
        required: true
    },
    roll_no: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    depertment: {
        type: String,
        required: true,
    },
    sem: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('notes', NotesSchema);
