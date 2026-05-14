import mongoose from "mongoose";

const connectDB = async () => {
  await mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("Server is connect to DB");
    })
    .catch((err) => {
      console.log(`Database error ${err.message}`);
      process.exit(1);
    });
};

export default connectDB;
