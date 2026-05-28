const mongoose = require("mongoose");

const connectDB = async () => {
  try {

    await mongoose.connect(
      "mongodb+srv://koushik:Koushik123@cluster0.6rhxpd3.mongodb.net/smart-access-portal?retryWrites=true&w=majority"
    );

    console.log("MongoDB Connected 😎");

  } catch (error) {

    console.log("Mongo Error:", error);

  }
};

module.exports = connectDB;
