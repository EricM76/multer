var express = require('express');
var router = express.Router();

const upload = require('../middlewares/multerUpload')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/upload',upload,function(req,res){
  upload(req,res,function(error){
    if(error){
      res.render('index',{
        msg:error
      })
    }else{
     if(req.file == undefined){
       res.render('index',{
         msg:"Error: No File Selected!!"
       })
     }else{
       console.log(req.file.filename)
       res.render('index',{
         msg: req.file.filename + ".File Uploaded!!",
         img: req.file.filename
       })
     }
  }
})
})

module.exports = router;
