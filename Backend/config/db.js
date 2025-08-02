const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/Linkdin");
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }
};

module.exports = connectDB;