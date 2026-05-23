import { useEffect, useState } from "react";
import axios from "axios";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

const Employees = () => {

  const [employees, setEmployees] = useState([]);

  const [form, setForm] = useState({
    name: "",
    email: "",
    department: "",
    position: "",
    salary: ""
  });

  const token = localStorage.getItem("token");

  // 📄 FETCH EMPLOYEES
  const fetchEmployees = async () => {

    try {

      const res = await axios.get(
        "http://localhost:5000/api/employees/all",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setEmployees(res.data);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  // ➕ ADD EMPLOYEE
  const addEmployee = async () => {

    try {

      await axios.post(
        "http://localhost:5000/api/employees/add",
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert("Employee Added");

      setForm({
        name: "",
        email: "",
        department: "",
        position: "",
        salary: ""
      });

      fetchEmployees();

    } catch (error) {
      alert("Error adding employee");
    }
  };

  // ❌ DELETE EMPLOYEE
  const deleteEmployee = async (id) => {

    try {

      await axios.delete(
        `http://localhost:5000/api/employees/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert("Deleted");

      fetchEmployees();

    } catch (error) {
      alert("Delete failed");
    }
  };

  return (

    <div>

      <Sidebar />
      <Navbar />

      <div style={{ marginLeft: "270px", padding: "30px" }}>

        <h1>Employees</h1>

        {/* ➕ FORM */}
        <div style={{ marginBottom: "30px" }}>

          <input
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <input
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          <input
            placeholder="Department"
            value={form.department}
            onChange={(e) => setForm({ ...form, department: e.target.value })}
          />

          <input
            placeholder="Position"
            value={form.position}
            onChange={(e) => setForm({ ...form, position: e.target.value })}
          />

          <input
            placeholder="Salary"
            value={form.salary}
            onChange={(e) => setForm({ ...form, salary: e.target.value })}
          />

          <button onClick={addEmployee}>
            Add Employee
          </button>

        </div>

        {/* 📄 TABLE */}
        <table border="1" cellPadding="10">

          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Department</th>
              <th>Position</th>
              <th>Salary</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>

            {employees.map((emp) => (
              <tr key={emp._id}>
                <td>{emp.name}</td>
                <td>{emp.email}</td>
                <td>{emp.department}</td>
                <td>{emp.position}</td>
                <td>{emp.salary}</td>
                <td>
                  <button onClick={() => deleteEmployee(emp._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default Employees;