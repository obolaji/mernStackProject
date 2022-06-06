const mongoose = require('mongoose');

var courseSchema = new mongoose.Schema({
    moduleName: {
        type: String,
        required:'Required'
    },
    noOfCoursework: {
        type: Number,
        required:'Please insert numerical figure'
    },
    description: {
        type: String,
        required: 'Required'
        
    },
    moduleLeadsEmail: {
        type: String,
        required:'Required'
    }

});
 mongoose.model('Course', courseSchema);
