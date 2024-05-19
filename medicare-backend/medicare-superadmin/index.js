const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const authRoutes = require("./src/api/routes/authRoutes");
const clinicsRoutes = require("./src/api/routes/clinicsRoutes");

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "*");
  next();
});

app.use(express.json());
app.use(cookieParser());

app.use("/", authRoutes);
app.use("/clinics", clinicsRoutes);

app.listen(3001, () => {
  console.log("SERVER RUNNING ON PORT 3001");
});
