const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const courseworkSchema = mongoose.Schema({
   _id: mongoose.Schema.Types.ObjectId,
    courseworkTitle: {
        type: String,
        required: 'Required'
    },
    moduleTitle: {
        type: String,
        required: 'Required'
    },
    submissionDate: {
        type: Date,
        required: 'Required'
    },
    description: {
        type: String,
        required: 'Required'
    }
});

module.exports = mongoose.model('Coursework', courseworkSchema);



