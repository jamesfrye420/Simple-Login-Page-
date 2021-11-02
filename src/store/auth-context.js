import React, { useState } from "react";

const AuthContext = React.createContext({
  token: "",
  role: "",
  basicInfo: {},
  userId: null,
  isLoggedIn: false,
  login: (data) => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  const initialToken = localStorage.getItem("token");
  const [token, setToken] = useState(initialToken);
  const [role, setrole] = useState(null);
  const [basicInfo, setBasicInfo] = useState({});
  const [userId, setuserId] = useState(null);

  const userIsLoggedIn = !!token;

  const loginHandler = (data) => {
    setToken(data.jwt);
    setrole(data.role);
    setBasicInfo(data.basic_info);
    setuserId(data.user_id);
    localStorage.setItem("token", data.jwt);
    localStorage.setItem("role", data.role);
    localStorage.setItem("basic_info", JSON.stringify(data.basic_info));
    localStorage.setItem("userId", data.user_id);
  };

  const logoutHandler = () => {
    setToken(null);
    setrole(null);
    setBasicInfo({});
    setuserId(null);
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("basic_info");
    localStorage.removeItem("userId");
  };

  const contextValue = {
    token: token,
    role,
    basicInfo,
    userId,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
