import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useFindAndModify: false,
});

const db = mongoose.connection;
db.on("error", (error) => {
  console.log(`failed to conntect to Data Base: ${error}`);
});

db.once("open", () => {
  console.log("connect to Data Base successfully!");
});
