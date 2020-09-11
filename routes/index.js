var express = require('express');
var router = express.Router();

const upload = require('../middlewares/multerUpload')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/upload',upload.any(),function(req,res){

        res.render('index',{
         msg: req.files[0].filename + ".File Uploaded!!",
         img: req.files[0].filename
       })
     })

module.exports = router;
