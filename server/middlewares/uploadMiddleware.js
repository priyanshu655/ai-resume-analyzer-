const multer=require('multer');

const storage=multer.memoryStorage();

const upload= multer({
    storage:storage,
    fileFilter:function(req,file,cb){
        if(file.mimetype==="application/pdf"){
            cb(null,true);
        }else{
            cb(new error("only pdfs are allowed!"),false);
        }
    }
});

module.exports=upload;