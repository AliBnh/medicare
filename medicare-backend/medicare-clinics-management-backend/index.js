const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const authRoutes = require("./src/api/routes/authRoutes");
const usersRoutes = require("./src/api/routes/userRoutes");
const patientsRoutes = require("./src/api/routes/patientsRoutes");
const appointmentsRoutes = require("./src/api/routes/appointmentsRoutes");
const paymentsRoutes = require("./src/api/routes/paymentsRoutes");

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "*");
  next();
});

app.use(express.json());
app.use(cookieParser());

app.use("/", authRoutes);
app.use("/users", usersRoutes);
app.use("/patients", patientsRoutes);
app.use("/appointments", appointmentsRoutes);
app.use("/payments", paymentsRoutes);

app.listen(3002, () => {
  console.log("SERVER RUNNING ON PORT 3002");
});
