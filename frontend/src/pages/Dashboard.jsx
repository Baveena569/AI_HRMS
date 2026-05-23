import { useEffect, useState } from "react";
import axios from "axios";
import Chatbot from "../components/Chatbot";

const Dashboard = () => {
  const [employees, setEmployees] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "employee",
  });

  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchEmployees();
  }, []);

  // FETCH EMPLOYEES
  const fetchEmployees = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get("http://localhost:5000/api/employees", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setEmployees(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // INPUT CHANGE
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ADD OR UPDATE EMPLOYEE
  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");

      if (editingId) {
        await axios.put(
          `http://localhost:5000/api/employees/${editingId}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setEditingId(null);
      } else {
        await axios.post(
          "http://localhost:5000/api/employees",
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }

      setFormData({
        name: "",
        email: "",
        role: "employee",
      });

      fetchEmployees();
    } catch (err) {
      console.log(err);
    }
  };

  // DELETE
  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(`http://localhost:5000/api/employees/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchEmployees();
    } catch (err) {
      console.log(err);
    }
  };

  // EDIT
  const handleEdit = (employee) => {
    setFormData({
      name: employee.name,
      email: employee.email,
      role: employee.role,
    });

    setEditingId(employee._id);
  };

  return (
    <div style={styles.container}>
      {/* NAVBAR */}
      <div style={styles.navbar}>
        <div>
          <h1 style={styles.logo}>AI HRMS</h1>

          <p style={styles.tagline}>
            Artificial Intelligence Human Resource Management System
          </p>
        </div>
      </div>

      {/* FORM */}
      <div style={styles.formContainer}>
        <h2>{editingId ? "Edit Employee" : "Add Employee"}</h2>

        <input
          style={styles.input}
          type="text"
          name="name"
          placeholder="Employee Name"
          value={formData.name}
          onChange={handleChange}
        />

        <input
          style={styles.input}
          type="email"
          name="email"
          placeholder="Employee Email"
          value={formData.email}
          onChange={handleChange}
        />

        <select
          style={styles.input}
          name="role"
          value={formData.role}
          onChange={handleChange}
        >
          <option value="employee">Employee</option>
          <option value="admin">Admin</option>
        </select>

        <button style={styles.button} onClick={handleSubmit}>
          {editingId ? "Update Employee" : "Add Employee"}
        </button>
      </div>

      {/* TABLE */}
      <div style={styles.tableContainer}>
        <h2>Employee Management</h2>

        <table style={styles.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {employees.map((employee) => (
              <tr key={employee._id}>
                <td>{employee.name}</td>
                <td>{employee.email}</td>
                <td>{employee.role}</td>

                <td>
                  <button
                    style={styles.editBtn}
                    onClick={() => handleEdit(employee)}
                  >
                    Edit
                  </button>

                  <button
                    style={styles.deleteBtn}
                    onClick={() => handleDelete(employee._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* CHATBOT */}
      <Chatbot />
    </div>
  );
};

const styles = {
  container: {
    minHeight: "100vh",
    padding: "30px",
    background: "linear-gradient(135deg, #0f172a, #1e293b)",
    color: "white",
    fontFamily: "Arial",
  },

  navbar: {
    marginBottom: "30px",
    display: "flex",
    justifyContent: "center",
    textAlign: "center",
  },

  logo: {
    fontSize: "52px",
    color: "#8b5cf6",
    fontWeight: "bold",
    letterSpacing: "2px",
  },

  tagline: {
    color: "#cbd5e1",
    fontSize: "14px",
    marginTop: "5px",
  },

  formContainer: {
    background: "#111827",
    padding: "20px",
    borderRadius: "12px",
    marginBottom: "30px",
    width: "60%",
    marginLeft: "auto",
    marginRight: "auto",
  },

  input: {
    width: "100%",
    padding: "12px",
    margin: "10px 0",
    borderRadius: "8px",
    border: "none",
  },

  button: {
    width: "100%",
    padding: "12px",
    background: "#8b5cf6",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },

  tableContainer: {
    background: "#111827",
    padding: "20px",
    borderRadius: "12px",
    width: "80%",
    marginLeft: "auto",
    marginRight: "auto",
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
  },

  editBtn: {
    background: "#3b82f6",
    color: "white",
    border: "none",
    padding: "8px 12px",
    borderRadius: "6px",
    marginRight: "10px",
    cursor: "pointer",
  },

  deleteBtn: {
    background: "#ef4444",
    color: "white",
    border: "none",
    padding: "8px 12px",
    borderRadius: "6px",
    cursor: "pointer",
  },
};

export default Dashboard;