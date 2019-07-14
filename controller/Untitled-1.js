

app.get('/users',(req,res)=>{
    userModel.find()
    .exec((err,result)=>{
        if(err){
          let apiresponse=responseLib.generateResponse(true,500,err,null) ;
          res.send(apiresponse);
        }
        else if(result===undefined || result===null || result===""){
              let apiresponse=responseLib.generateResponse(true,500,err,null) ;
          res.send(apiresponse);
        }
        else {
            let apiresponse=responseLib.generateResponse(false,200,null,result);
            res.send(apiresponse);
        }
    });
});

app.get('/users/:userId',(req,res)=>{
  userModel.findOne({"userId":req.params.userId},(err,result)=>{
      if(err){
          let apiresponse=responseLib.generateResponse(true,500,err,null) ;
          res.send(apiresponse);  
        }
        else if(result===undefined || result===null || result===""){
             let apiresponse=responseLib.generateResponse(true,500,err,null) ;
          res.send(apiresponse);
        }
        else {
             let apiresponse=responseLib.generateResponse(false,200,null,result);
            res.send(apiresponse);
        }
     }); 
});


module.exports = app;