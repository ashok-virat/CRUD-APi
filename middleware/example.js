

let examplemiddleware=(req,res,next)=>{
    req.users={'fisrname':'ashok','lastname':'virat'}
    next()
}

module.exports={
    examplemiddleware:examplemiddleware
}