import dotEnv from "dotenv";
dotEnv.config();

import app from "./src/app.js";
import connectDB from "./src/config/db.config.js";

app.listen(process.env.PORT, () => {
  connectDB();
  console.log(`Server is running on port http://localhost:${process.env.PORT}`);
});
