const multer = require('multer');
const path = require('path')
//set storage engine

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
})

  const upload = multer({
    storage:storage,
    limits:{fileSize:2097152}, //dos megabyte
    fileFilter:function(req,file,cb){
      console.log(file)
      if(path.extname(file.originalname)!= '.jpg'){
        cb(null,false);
        return cb(new Error('Solo imagenes'))
      }else{
        cb(null,true);
      }
      }
    })

module.exports = upload;