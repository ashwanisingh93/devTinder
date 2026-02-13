

const mongoose = require('mongoose');

const connectionRequest = new mongoose.Schema({
    fromUserId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User", //refrence to the user collection
        required : true,
       
    },
    toUserId :{
        type: mongoose.Schema.Types.ObjectId,
        ref : "User",
        required: true
    },
    status:{
        type: String,
        required: true,
        enum : {
            values: ["ignored","interested","accepted","rejected"],
            message: `{VALUE} is incorrect status type`,
        }
    },
},{
    timestamps: true,
});

connectionRequest.index({fromUserId:1,toUserId:1});

connectionRequest.pre('save',function(next){
    const connectionRequest = this;
  //check if fromUserId is same as toUserId
  if(connectionRequest.fromUserId.equals(connectionRequest.toUserId) ){
    throw new Error("fromUserId and toUserId cannot be same");
  }
  next();

});

const connectionRequestModel = new mongoose.model('connectionRequest', connectionRequest);

module.exports = connectionRequestModel;

