exports.AddBlog=async(req,res)=>{
    try{

         return res.render("Blog/Add-Blog")

    }
    catch(error){
     console.log("error")
        
         return res.redirect("/");
    }

}