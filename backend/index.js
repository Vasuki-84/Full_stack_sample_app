const express = require("express");
const app = express();
require("dotenv").config();
const dbconnection = require("./config/database.config");
const cors = require("cors");

const employeeRoutes = require("./routes/employee.routes");
const userRoutes = require("./routes/user.route");

app.use(cors());
app.use(express.json());
app.use("/employee", employeeRoutes);
app.use("/auth", userRoutes);

dbconnection();
app.listen(process.env.port, () => {
  console.log("server running ", process.env.port);
});
