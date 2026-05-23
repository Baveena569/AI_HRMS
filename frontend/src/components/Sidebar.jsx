import { Link } from "react-router-dom";
import { FaHome, FaUsers, FaSignOutAlt } from "react-icons/fa";

const Sidebar = () => {

  const handleLogout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.location.href = "/";
  };

  return (

    <div
      style={{
        width: "250px",
        height: "100vh",
        background: "#6C63FF",
        color: "white",
        padding: "20px",
        position: "fixed",
      }}
    >

      <h2>AI HRMS</h2>

      <hr />

      <ul style={{ listStyle: "none", padding: 0 }}>

        <li style={{ margin: "20px 0" }}>
          <Link
            to="/dashboard"
            style={{ color: "white", textDecoration: "none" }}
          >
            <FaHome /> Dashboard
          </Link>
        </li>

        <li style={{ margin: "20px 0" }}>
          <Link
            to="/employees"
            style={{ color: "white", textDecoration: "none" }}
          >
            <FaUsers /> Employees
          </Link>
        </li>

        <li
          style={{ margin: "20px 0", cursor: "pointer" }}
          onClick={handleLogout}
        >
          <FaSignOutAlt /> Logout
        </li>

      </ul>

    </div>
  );
};

export default Sidebar;