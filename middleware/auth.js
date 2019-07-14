const logger=require("./../libs/loggerLib")
const response=require("./../libs/responseLib")


let isAuthenticated=(req,res,next)=>{
    if(req.params.authToken || req.query.authToken || req.header('authToken'))  {
        if(req.params.authToken=="Ashok" || req.query.authToken=="Ashok" || req.header("authToken")) {
            next()
        }
      else {
           logger.captureError('Incorrect authentication token','Authentication MiddleWare',5)
           let apiResponse=response.generate(true,"Incorrect authentication token",403,null)
           res.send(apiResponse)
      }
    }
      else {
          logger.captureError('Authentication Token Missing','Authentication Middleware',5)
          let apiResponse=response.generate(true,"Authentication token Is Missing",403,null)
          res.send(apiResponse)
      }
}
module.exports={
    isAuthenticated:isAuthenticated
}