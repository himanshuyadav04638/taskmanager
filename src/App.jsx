import React, { useState, useEffect, useReducer, createContext } from "react";
import './App.css'
import Header from './component/Header'
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './component/Login';
import Cookies from "js-cookie";
import { authReducer, taskReducer } from "./utils/reducer";
import TaskList from "./component/TaskList";
import { getApi } from "./utils/services";
import useTheme from "./utils/useTheme";



function App() {
  const [authState, authDispatch] = useReducer(authReducer, {isAuthenticated: !! Cookies.get("authToken")});
  const [taskState, taskDispatch] = useReducer(taskReducer, { tasks: [] });

  const [filter, setFilter] = useState(Cookies.get("filter") || "all");
  const [sort, setSort] = useState(Cookies.get("sort") || "none");
  const [theme, setTheme] = useTheme();
  

  useEffect(() => {
    const fetchData = async () => {
      if (authState.isAuthenticated) {
        try {
          const result = await getApi();
          taskDispatch({ type: "SET_TASKS", payload: result.res.slice(0, 15) });
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };
    fetchData();
  }, [authState.isAuthenticated]);


  const handleLogin = (username, password) => {
    if (username === "user1" && password === "password123") {
      authDispatch({ type: "LOGIN" });
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <AuthContext.Provider value={{ authState, handleLogin,authDispatch,theme,setTheme }}>
      <TaskContext.Provider value={{ taskState, taskDispatch, filter, setFilter, sort, setSort }}>
        <div className={`min-vh-100 ${theme === "dark" ? "bg-dark text-white" : "bg-light text-dark"}`}>
          <Header    />
          {authState.isAuthenticated ? <TaskList />: <Login  />}
        </div>
      </TaskContext.Provider>
    </AuthContext.Provider>
  );
}

export default App

export const AuthContext = createContext();
export const TaskContext = createContext();






