const Navbar = () => {

  const user = JSON.parse(localStorage.getItem("user"));

  return (

    <div
      style={{
        height: "70px",
        background: "#F5F5F5",
        marginLeft: "250px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 30px",
      }}
    >

      <h2>Dashboard</h2>

      <h3>
        Welcome, {user?.name}
      </h3>

    </div>
  );
};

export default Navbar;