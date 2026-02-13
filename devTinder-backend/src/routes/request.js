const express = require('express');
const requestRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require('../models/user');

// Send connection request
requestRouter.post("/request/send/:status/:toUserId", userAuth, async (req, res) => {
  try {
    const fromUserId = req.user._id; // Authenticated user's ID
    const toUserId = req.params.toUserId; 
    const status = req.params.status;

    const allowedStatuses = ["ignored", "interested"];
    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status value : "  + status });
    }

  
      
    const toUser = await User.findById(toUserId);
    if (!toUser) {
      return res.status(400).json({ message: "User not found" });
    }

    

      
    const existingConnectionRequest = await ConnectionRequest.findOne({ 
      $or : [
        { fromUserId, toUserId },
        { fromUserId: toUserId, toUserId: fromUserId },
      ],
     });
     if(existingConnectionRequest){
        throw new Error("Connection request already exists");
      }


  
    // Create a new connection request
    const connectionRequest = new ConnectionRequest({
      fromUserId,
      toUserId,
      status,
    });

    const data = await connectionRequest.save();

    return res.json({
      message: req.user.firstName+" is "+status+" in "+ toUser.firstName,
      data,
    });
  } catch (err) {
    return res.status(400).json({
      error: "Failed to send connection request",
      details: err.message,
    });
  }
});

requestRouter.post("/request/review/:status/:requestId",userAuth, async (req, res) => {

  try{
      const loggedInuser = req.user;
      const {status,requestId} = req.params;

      const allowedStatus = ["accepted", "rejected"];
      if(!allowedStatus.includes(status)){
        return res.status(400).json({message: "Invalid status value : " + status});
      }
const connectionRequest = await ConnectionRequest.findOne({
  _id: requestId,
  toUserId: loggedInuser._id,
  status: "interested",
});
if(!connectionRequest){
  return res.status(404).json({message: "connection request not found"});
}
    connectionRequest.status = status;
  const data = await connectionRequest.save();
  res.json({
    message: "Connection request has been " + status,data});


  

      //validate the request id



  }
  catch(err){
    return res.status(400).json({
      error: "Failed to review request",
      details: err.message,
    });
  }
});



module.exports = requestRouter;