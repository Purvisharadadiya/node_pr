exports.getBlog= async(req,res)=>{
    try {
        
       return res.render("dasbord")

    } catch (error) {

        console.log("error")
        
         return res.redirect("/");
    }

}
exports.loginpage= async(req,res)=>{
    try {
        
       return res.render("loginpage")

    } catch (error) {

        console.log("error")
        
         return res.redirect("/");
    }

}