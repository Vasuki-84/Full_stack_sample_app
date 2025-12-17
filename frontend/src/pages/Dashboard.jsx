import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../api";
import axios from "axios";

function Dashboard() {
  const [employees, setEmployees] = useState([]);
  const [form, setform] = useState({
    name: "",
    role: "",
    salary: "",
    email: "",
  });

  const token = localStorage.getItem("token");

  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  // get all employee datas in dashboard page
  const getEmployees = async () => {
    try {
      const res = await axios.get(`${baseUrl}/employee`);
      setEmployees(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getEmployees();
  }, []);

  const createEmployee = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${baseUrl}/employee/create`, form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      getEmployees();
      setform({ name: "", role: "", salary: "", email: "" });
    } catch (err) {
      console.log(err.message);
      alert(err.message);
    }
  };
  console.log(employees);

  return (
    <div>
      <div className="p-4">
        <button
          onClick={handleLogout}
          className="bg-red-200 text-red-500 font-semibold px-3 py-2 rounded cursor-pointer"
        >
          Logout
        </button>
      </div>
      <div className="min-h-screen flex justify-center  items-center  bg-gray-50">
        <div className="max-w-sm rounded-lg border border-gray-400 p-5 ">
          <h2 className="mb-4 text-lg font-semibold text-center text-gray-500">
            Add a new Product
          </h2>
          <form onSubmit={createEmployee}>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Name
              </label>
              <input
                value={form.name}
                onChange={(e) => setform({ ...form, name: e.target.value })}
                type="text"
                className="w-full border border-gray-400 px-3 py-2 text-sm rounded-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Job Role
              </label>
              <input
                value={form.role}
                onChange={(e) => setform({ ...form, role: e.target.value })}
                type="text"
                className="w-full border border-gray-400 px-3 py-2 text-sm rounded-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Salary
              </label>
              <input
                value={form.salary}
                onChange={(e) => setform({ ...form, salary: e.target.value })}
                type="number"
                className="w-full border border-gray-400 px-3 py-2 text-sm rounded-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Email
              </label>
              <input
                value={form.email}
                onChange={(e) => setform({ ...form, email: e.target.value })}
                type="text"
                className="w-full border border-gray-400 px-3 py-2 text-sm rounded-sm"
              />
            </div>

            <button
              type="submit"
              className="mt-4 w-full rounded-md bg-blue-500 px-4 py-2 text-sm font-medium text-white cursor-pointer"
            >
              Add Employee
            </button>
          </form>
        </div>
      </div>
      <div className="flex justify-center gap-5 mx-auto ">
        {employees.map((data) => (
          <div
            key={data._id}
            className="  flex-1 min-w-[300px] max-w-[450px] max-w-sm rounded-lg border border-gray-300 p-5 shadow-sm"
          >
            <h2 className=" mt-2 text-lg font-semibold text-red-500 ">
              {data.name}
            </h2>
            <h3 className=" mt-2 text-md font-bold text-gray-600">
              {data.role}
            </h3>
            <h4 className=" mt-2 text-sm font-lg text-blue">${data.salary}</h4>
            <h4 className="mt-2 text-gray-400 text-sm">{data.email}</h4>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
