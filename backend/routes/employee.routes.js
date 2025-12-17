const express = require("express");
const router = express.Router();

const {
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
  getEmployeeByName,
} = require("../controller/employee.conroller");

const authMiddleware = require("../middleware/employee.middleware");

router.post("/create", authMiddleware(["admin"]), createEmployee);

router.get("/", getAllEmployees);

 router.get("/id/:id", getEmployeeById);

router.put("/update/:id", updateEmployee);

router.delete("/delete/:id",authMiddleware(["admin"]), deleteEmployee);

router.get("/name/:name", authMiddleware(["admin"]), getEmployeeByName);

module.exports = router;
