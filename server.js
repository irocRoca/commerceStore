const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const userRoute = require("./routes/userRoutes");

const app = express();

app.use(express.json());

app.use("/user", userRoute);

mongoose.connect(
  process.env.MONGO_URI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("connected to db.")
);

const PORT = process.env.PORT || 5000;

app.listen(process.env.PORT, () => console.log(`ServerOn ${PORT}`));
