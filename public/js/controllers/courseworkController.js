const express = require('express');
const { title } = require('process');

var router = express.Router();

const mongoose = require('mongoose');
const Coursework = mongoose.model('Coursework');



router.post('/',(req,res) =>{
    if(req.body._id == '')
    insertRecord(req, res);
    else
    updateRecord(req, res);
});

function insertRecord(req, res){
    var courseworks = new Coursework();
    courseworks.courseworkTitle = req.body.courseworkTitle;
    courseworks.moduleTitle = req.body.moduleTitle;
    courseworks.submissionDate = req.body.submissionDate;
    courseworks.description = req.body.description;
    courseworks.save((err, doc) => {
        if (!err)
         res.redirect('/coursework');
         else {
           if (err.name === 'ValidationError' ){
                handleValidationError(err, req.body);
                res.render("coursework/courseworkdescription.hbs",{
                    courseworks : req.body
                });
                } else
            console.log('Error : ' + err);
        }

    });
    

}

function updateRecord(req, res)  {
    Coursework.findOneAndUpdate({_id: req.body._id}, req.body, {new: true}, (err,doc) =>{
        if(!err){res.redirect('/coursework'); }
        else{
            if(err.name == 'ValidationError'){
                handleValidationError(err, req.body);
                res.render("coursework/courseworkdescription.hbs",{
                    courseworks : res.body
                });
            }
            else
            console.log('Error : ' + err);
        }

    });

}


router.get('/', (req, res) => {
    Coursework.find((err, docs) =>{
        if(!err){
            res.render("coursework/courseworklist.hbs", {
                courseworklist: docs
            });
        }
        else {
            console.log('Error : ' + err);
        }

    });

})

function handleValidationError(err, body){
    for(field in err.errors){
        switch (err.errors[field].path){
            case 'courseworkTitle': 
            body['moduleNameError'] = err.errors[field].message;
            break;
            case  'moduleTitle':
           body['moduleTitleError'] = err.errors[field].message;
           break;
           case  'submissionDate':
           body['submissionDateError'] = err.errors[field].message;
           break;
           case  'description':
           body['descriptionError'] = err.errors[field].message;
           break;
           default:
               break;


        }

    }
}
router.get('/:id', (req, res) => {
    Coursework.findById(req.params.id, (err, docs)=>{
        if (!err){
            res.render("coursework/courseworkdescription.hbs", {
                courseworks: docs
            });
        }

    });
});

router.get('/delete/:id', (req, res) => {
    Coursework.findByIdAndRemove(req.params.id, (err, doc)=>{
        if (!err){
            res.redirect('/coursework');
        }
        else{
            console.log('Error in deleting:' + err);
        }

    });
});


module.exports = router;
