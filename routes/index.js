var express = require('express');
var router = express.Router();
const multer = require('multer');
const path = require('path')

//set storage engine

const storage = multer.diskStorage({
  destination:'./public/uploads',
  filename:function(req,file,cb){
    cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
});

const upload = multer({
  storage:storage,
  limits:{fileSize:2097152}, //dos megabyte
  fileFilter:function(req,file,cb){
    checkFileType(file,cb)
  }
}).single('myImage')

//check File Type

function checkFileType(file,cb){
  //extensiones permitidas
  const filetypes = /jpeg|jpg|png|gif/;
  
  //chequeo las extensiones
  const extname = filetypes.test(path.extname(file.originalname).toLocaleLowerCase); //devuelve un booleano

  //chequeo MIME
  const mimetype = filetypes.test(file.mimetype); //devuelve un booleano

  console.log(`mimetype: ${mimetype}, extname: ${extname}` )
  if(mimetype){
    return cb(null,true);
  }else{
    cb('Error: Images Only!!')
  }
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/upload',function(req,res){
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
