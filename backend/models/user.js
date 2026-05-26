const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({

  customId:{
    type:Number,
    required:true,
    unique:true
  },

  name:{
    type:String,
    required:true
  },

  role:{
    type:String,
    required:true
  },

  status:{
    type:String,
    default:'Active'
  }

});

module.exports=

  mongoose.model(
    'User',
    userSchema
  );