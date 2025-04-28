import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      console.error("MONGODB_URI is not defined in environment variables");
      process.exit(1);
    }

    const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`\nMongoDB connected! DB Host: ${connectionInstance.connection.host}`);
  } catch (error) {
    console.error("Error while connecting to the database:", error.message);
    process.exit(1);
  }
};

export default connectDB;