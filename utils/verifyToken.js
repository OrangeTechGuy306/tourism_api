// const jwt = require("jsonwebtoken")


// module.exports.verifyToken = (req, res, next)=>{
//     const token = req.cookies.access_token
//     if(!token){
//         return next({status:false, msg:"You are not authenticated"})
//     } 

//     jwt.verify(token, process.env.TOKEN_KEY, (err, user)=>{
//         if(err) return console.log(err)
//         req.user = user
//         next()
//     })
        
// }


// module.exports.verifyUser = (req, res, next)=>{
//     verifyToken(req,res, next, ()=>{
//         if(req.user.id === req.params.id){
//             next()
//         } else{
//             return console.log("You are not authenticated")
//         }
//     })
// }


// module.exports.verifyAdmin = (req, res, next)=>{
//     const admintoken = req.cookies.admin_token
//     if(!admintoken) return console.log("no token")

//     jwt.verify(admintoken, process.env.TOKEN_KEY, (err,admin)=>{
//         if(err) ( next({status:false, msg:err}))

//         req.admin = admin
//         next()
//       })
// }


// module.exports.verifyAdminUser = (req, res, next)=>{
//     this.verifyAdmin(req,res, next, ()=>{
//         if(req.admin.id === req.params.id || req.admin.isAdmin){
//             next()
//         }
//         else{
//             return console.log("You are not authenticated")
//         }
//     })
// }