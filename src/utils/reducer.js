import Cookies from "js-cookie";
export const authReducer = (state, action) => {
    switch (action.type) {
      case "LOGIN":
        Cookies.set("authToken", "fake-token", { expires: 7 });
        return { ...state, isAuthenticated: true };
      case "LOGOUT":
        Cookies.remove("authToken");
        return { ...state, isAuthenticated: false };
      default:
        return state;
    }
  };

 export  const taskReducer = (state, action) => {
    switch (action.type) {
      case "SET_TASKS":
        return { ...state, tasks: action.payload };
      default:
        return state;
    }
  };