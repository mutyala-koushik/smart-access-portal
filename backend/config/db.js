const mongoose = require('mongoose');

const connectDB = async () => {

  try {

    await mongoose.connect(
      'mongodb+srv://admin1:cQnIvf9BTxZ2g47b@cluster0.6rhxpd3.mongodb.net/smart-access-portal?retryWrites=true&w=majority&appName=Cluster0'
    );

    console.log('MongoDB Connected 😎');

  } catch(error) {

    console.log(error);

  }

};

module.exports = connectDB;
