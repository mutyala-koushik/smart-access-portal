const mongoose=require('mongoose');

const connectDB=async()=>{

  try{

    await mongoose.connect(

      'mongodb://127.0.0.1:27017/smart-access-portal'

    );

    console.log(

      'MongoDB Connected 😎'

    );

  }

  catch(error){

    console.log(error);

  }

};

module.exports=connectDB;