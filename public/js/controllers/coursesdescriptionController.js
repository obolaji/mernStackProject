const express = require('express');
const { title } = require('process');

var router = express.Router();

const mongoose = require('mongoose');
const Course = mongoose.model('Course');


router.post('/',(req,res) =>{
    if(req.body._id == '')
    insertRecord(req, res);
    else
    updateRecord(req, res);
});

function insertRecord(req, res){
    var courses = new Course();
    courses.moduleName = req.body.moduleName;
    courses.noOfCoursework = req.body.noOfCoursework;
    courses.description = req.body.description;
    courses.moduleLeadsEmail = req.body.moduleLeadsEmail;
    courses.save((err, doc) => {
        if (!err)
         res.redirect('/course');
        else {
            if (err.name === 'ValidationError' ){
                handleValidationError(err,req.body);
                res.render("coursework/coursesdescription.hbs",{
                    courses : req.body
                });
                } else
            console.log('Error : ' + err);
        }

    });

}
function updateRecord(req, res)  {
    Course.findOneAndUpdate({_id: req.body._id}, req.body, {new: true}, (err,doc) =>{
        if(!err){res.redirect('/course'); }
        else{
            if(err.name == 'ValidationError'){
                handleValidationError(err, req.body);
                res.render("coursework/coursesdescription.hbs",{
                    courses: res.body
                });
            }
            else
            console.log('Error : ' + err);
        }

    });

}

router.get('/', (req, res) => {
    Course.find((err, docs) =>{
        if(!err){
            res.render("coursework/courselist.hbs", {
                courselist: docs
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
             case 'moduleName': 
             body['moduleNameError'] = err.errors[field].message;
             break;
             case  'noOfCoursework':
            body['noOfCourseworkError'] = err.errors[field].message;
            break;
            case  'description':
            body['descriptionError'] = err.errors[field].message;
            break;
            case  'moduleLeadsEmail':
            body['moduleLeadsEmailError'] = err.errors[field].message;
            break;
            default:
                break;


         }

     }
 }

router.get('/:id', (req, res) => {
    Course.findById(req.params.id, (err, doc)=>{
        if (!err){
            res.render("coursework/coursesdescription.hbs", {
                courses: doc
            });
        }

    });
});

router.get('/delete/:id', (req, res) => {
    Course.findByIdAndRemove(req.params.id, (err, doc)=>{
        if (!err){
            res.redirect('/course');
        }
        else{
            console.log('Error in deleting:' + err);
        }

    });
});


module.exports = router;
