import express from "express";
import { dbConnection } from "./db/dbConnection.js";
import userRoutes from "./src/modules/users/user.routes.js";
import sendEmail from "./src/email/email.js";
import AppError from "./src/utility/appError.js";
import fs from "fs";
import cors from "cors";
import productRoutes from "./src/modules/products/product.routes.js";
import cartRoutes from "./src/modules/cart/cart.router.js";
import categoryRouters from "./src/modules/category/category.router.js";
import subCategoryRouters from "./src/modules/subcategory/subcategory.routes.js";
import favoriteRoutes from "./src/modules/favorites/favorites.routes.js";
import paymentRoute from "./src/modules/payment/payment.route.js";
import couponRoutes from "./src/modules/coupon/coupon.routes.js";

const app = express();
const port = 4000;
app.use(express.json());
// db connection
dbConnection;

//connect with front
app.use(cors());

// userRoutes
app.use(userRoutes);
app.use(productRoutes);
app.use(cartRoutes);

app.use(couponRoutes);


app.use(categoryRouters);

app.use(subCategoryRouters);
app.use(favoriteRoutes);


app.use((err, req, res, next) => {
  res.status(err.statusCode).json({ message: err.message });
});

// handle invalid url
app.use("*", (req, res, next) => {
  next(new AppError("invalid URL", 404));
});

app.listen(port, () => console.log(`server running on port: ${port}`));
