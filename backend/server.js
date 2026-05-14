import dotEnv from "dotenv";
dotEnv.config();

import app from "./src/app.js";
import connectDB from "./src/config/db.config.js";

app.listen(3000, () => {
  connectDB();
  console.log("Server is running port 3000");
});
