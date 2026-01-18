const mongoose  = require("mongoose")
const MONGO_DB_CONNECTION_STRING = process.env.MONGO_DB_CONNECTION_STRING;


const connectDB = async ()=>{
    try {
        await mongoose.connect(MONGO_DB_CONNECTION_STRING , {})
        console.log("connected to mongoDB.")
    } catch (error) {
        console.log("Error : failed to connect to mongoDB : ",error)
        process.exit(1)
    }
}

module.exports = connectDB;
