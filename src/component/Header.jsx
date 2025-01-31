import React, { useContext } from "react";
import { AuthContext } from "../App";

const Header = () => {
  const {authState,theme,setTheme,authDispatch} = useContext(AuthContext);

  return (
    <nav className={`navbar px-3 shadow ${theme === "dark" ? "bg-dark navbar-dark" : "bg-light navbar-light"}`}>
      <a className={`navbar-brand ${theme === "dark" ? "text-light" : "text-dark"}`} href="#">
        Task Manager
      </a>
      <div>
        <button
          className={`btn ${theme === "dark" ? "btn-outline-light" : "btn-outline-dark"} me-2`}
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          Toggle Theme
        </button>
        {authState.isAuthenticated && <button className="btn btn-danger" onClick={()=> authDispatch({ type: "LOGOUT" })}>Logout</button>}
      </div>
    </nav>
  );
};

export default Header;
