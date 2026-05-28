const mongoose = require("mongoose");

const connectDB = async () => {
  try {

    const conn = await mongoose.connect(
      "mongodb+srv://admin1:cQnIvf9BTxZ2g47b@cluster0.6rhxpd3.mongodb.net/smart-access-portal?retryWrites=true&w=majority"
    );

    console.log(`MongoDB Connected: ${conn.connection.host}`);

  } catch (error) {

    console.error("MongoDB Error:", error.message);

    process.exit(1);
  }
};

module.exports = connectDB;
