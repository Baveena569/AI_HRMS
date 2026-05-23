import { useState } from "react";
import axios from "axios";

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {

      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password }
      );

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      window.location.href = "/dashboard";

    } catch (err) {
      alert(err.response?.data?.message);
    }
  };

  return (
    <div style={styles.container}>

      {/* LEFT SECTION */}
      <div style={styles.left}>

        <h1 style={styles.title}>Pay employees anywhere in the world</h1>

        <p style={styles.subtitle}>
          AI HRMS handles payroll, compliance, and employee management with ease.
        </p>

        <ul style={styles.list}>
          <li>✔ Easy onboarding</li>
          <li>✔ Secure payroll system</li>
          <li>✔ Global compliance</li>
        </ul>

      </div>

      {/* RIGHT LOGIN BOX */}
      <div style={styles.right}>

        <div style={styles.card}>

          <h2>Login</h2>

          <input
            style={styles.input}
            placeholder="Work Email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            style={styles.input}
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button style={styles.button} onClick={handleLogin}>
            Login
          </button>

        </div>

      </div>

    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    height: "100vh",
    color: "white",
  },

  left: {
    flex: 1,
    padding: "80px",
    background: "linear-gradient(135deg, #0f172a, #1e293b)",
  },

  right: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#0b1220",
  },

  card: {
    width: "350px",
    padding: "30px",
    borderRadius: "12px",
    background: "#111827",
    boxShadow: "0 0 20px rgba(0,0,0,0.4)",
  },

  title: {
    fontSize: "40px",
    fontWeight: "700",
  },

  subtitle: {
    marginTop: "20px",
    color: "#cbd5e1",
  },

  list: {
    marginTop: "30px",
    lineHeight: "30px",
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
    background: "#4f46e5",
    color: "white",
    border: "none",
    borderRadius: "8px",
    marginTop: "10px",
    cursor: "pointer",
  },
};

export default Login;