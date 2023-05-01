module.exports = {
    adminProtection: function(req,res,next){
        if(req.isAuthenticated() && req.user.isstaff == 1){
            return next()
        }
        req.flash("error_msg","Acesso negado!")
        res.redirect("/")
    }
}