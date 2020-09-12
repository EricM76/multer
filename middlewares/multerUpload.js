const multer = require('multer');
const path = require('path')
//set storage engine

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + '.' + path.extname(file.originalname))
  }
})

  const upload = multer({
    storage:storage,
    limits:{fileSize:2097152}, //dos megabyte
    fileFilter:function(req,file,cb){
      console.log(file)
      let ext = path.extname(file.originalname);
      if(ext == '.jpg'){
        cb(null,true);
      }else{
        let err = new Error("only images")
        cb(err,false);
      }

      /*if(ext != '.jpg'){
        let err = new Error("only images")
        cb(err,false);
        //return err

      }else{
        cb(null,true);
      }*/

      }
    })

module.exports = upload;