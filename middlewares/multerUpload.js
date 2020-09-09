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
  
    if(mimetype){
      return cb(null,true);
    }else{
      console.log("Error: solo imagenes")
      return cb(null,false)
    }
  }
module.exports = upload