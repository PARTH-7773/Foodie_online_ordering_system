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
    origin: ["http://127.0.0.1:5501","http://localhost:5501"],
    credentials: true
  }),
);

app.use("/api/auth", router);
app.use("/api/product/", productRouter)
app.use("/api/order", orderRouter)



export default app;
