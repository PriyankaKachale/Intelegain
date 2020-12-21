const util = require('util')

module.exports = (req, res, next) =>{
    console.log(util.inspect(req, {showHidden: false, depth: null}))
    var isAuthenticated = true;//req.isAuthenticated();
    console.log(isAuthenticated);
    if(isAuthenticated){
        return next();
    }else{
       // res.redirect("/")
       console.log("now in isAuth else");
         res.json({success:false,message:"You need to login first", tologin:true})
    }
}
