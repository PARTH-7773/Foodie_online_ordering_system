import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import router from "./routes/auth.route.js";
import productRouter from "./routes/product.route.js";
import orderRouter from "./routes/orders.route.js";

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [
      "http://127.0.0.1:5500/Food_Delivery/frontend/Food%20Delivery/index.html",
      "http://127.0.0.1:5500",
      "file:///E:/Development/import-with-Backend/BackEnd-project/Food_Delivery/frontend/Food%20Delivery/signin.html",
    ],
  }),
);

app.use("/api/auth", router);
app.use("/api/product/", productRouter)
app.use("/api/order", orderRouter)



export default app;
