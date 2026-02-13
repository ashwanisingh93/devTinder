const express = require('express');
const profileRouter = express.Router();
const {userAuth} = require("../middlewares/auth");

const {validateEditProfileData} = require("../utils/validation");

profileRouter.get("/profile/view",userAuth,async(req,res)=>{
    try{
    const user = await req.user;
   res.send(user);
    }
    catch(err){
         res.status(400).send("Invalid token" + err.message);
     }
   });

   profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
    try {
      if (!validateEditProfileData(req)) {
        throw new Error("Invalid edit fields");
      }
  
      const loggedInuser = req.user;
      
      Object.keys(req.body).forEach(
      (key)=>(loggedInuser[key]=req.body[key]));

      await loggedInuser.save();
  res.json({
    message: `${loggedInuser.firstName}'s profile updated successfully`,
    data: loggedInuser,
  });
    } catch (err) {
      res.status(400).send("Error: " + err.message);
    }
  });
  
   
   module.exports = profileRouter;