const mongoose=require('mongoose');

const connectDB=async()=>{

  try{

    await mongoose.connect(

      'mongodb+srv://admin:admin123@cluster0.6rhxpd3.mongodb.net/?appName=Cluster0'

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