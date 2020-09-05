const express=require("express");
const router=express.Router();
const {signup,signin,signout,requireSignin}= require('../middleware/auth');
// const {UserSignUpValidator}=require('../validator/index')
const {UserSignUpValidator}=require('../validator');

router.post("/signup" ,UserSignUpValidator,signup);
router.post("/signin" ,signin);
router.post("/signout" ,signout);

// router.get("/hello",requireSignin,(req,res)=>{
//     res.send("hello there")
// });


module.exports=router;