const employeeModel = require("../model/employee.model");

const createEmployee = async (req, res) => {
  const { name, role, salary, email } = req.body;
  try {
    if (!name || !role || !salary || !email) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newEmployee = new employeeModel({ name, role, salary, email });
    await newEmployee.save();
    res.status(201).json({ message: "employee added" });
  } catch (err) {
    res.status(500).json({ message: "Employee not added" });
    console.log(err.message);
  }
};

const getAllEmployees = async (req, res) => {
  try {
    const employee = await employeeModel.find();
    res.status(200).json(employee);
  } catch (err) {
    res.status(500).json({ message: "Employee fetching failure" });
  }
};

const getEmployeeByName = async (req, res) => {
  try {
    const { name } = req.params;
    const employee = await employeeModel.findOne({ name });
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    return res.status(200).json(employee);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "server error" });
  }
};

const getEmployeeById = async (req, res) => {
  const { id } = req.params;
  try {
    const employee = await employeeModel.findById(id);

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    return res.status(200).json(employee);
  } catch (err) {
    res.status(500).json({ message: "Employee not found" });
  }
};

const updateEmployee = async (req, res) => {
  const { id } = req.params;
  try {
    const employees = await employeeModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json({ message: "employee updated" });
  } catch (err) {
    res.status(500).json({ message: "employee update failed" });
  }
};

const deleteEmployee = async (req, res) => {
  const { id } = req.params;
  try {
    await employeeModel.findByIdAndDelete(id);
    res.status(200).json({ message: "Employee deleted" });
  } catch (err) {
    res.status(500).json({ message: "Employee not deleted" });
  }
};
module.exports = {
  createEmployee,
  getEmployeeById,
  getAllEmployees,
  updateEmployee,
  deleteEmployee,
  getEmployeeByName,
};
