import dotenv from "dotenv";
dotenv.config({ path: './env' });

import connectDB from "./db/index.js";
import { app } from "./app.js";

console.log("NODE URL -", process.env.MONGODB_URI);

connectDB()
  .then(() => {
    app.on("error", (error) => {
      console.log("Unable to talk to the database,", error);
      throw error;
    });
    
    app.listen(process.env.PORT || 8000, () => {
      console.log("Server is running at port", process.env.PORT || 8000);
    });
  })
  .catch((error) => {
    console.log("MongoDB connection failed!!", error);
  });