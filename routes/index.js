var express = require('express');
var router = express.Router();
const multer = require('multer');


const upload = require('../middlewares/multerUpload')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

  router.post('/upload',upload.single('avatar'),function(req,res){
    if(typeof err == undefined){
      res.render('index',{
        error: err
      })
    }else{
      res.render('index',{
        msg: req.file.filename + ".File Uploaded!!",
        img: req.file.filename
      })
    }
  })

  /*router.post('/upload',upload.any(),function(req,res){

    res.render('index',{
      msg: req.files[0].filename + ".File Uploaded!!",
      img: req.files[0].filename
    })
  })*/ //forma TRADICIONAL CON any() y files

module.exports = router;
