import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // const API = import.meta.env.API_URL

  const [token, setToken] = useState(localStorage.getItem("token"));
  // const [isLoggedIn, setIsLoggedIn] = useState(!!token);
  const [user, setUser] = useState(undefined);

  const [selectedChat, setSelectedChat] = useState();
  const [chats, setChats] = useState([]);
  const [notification, setNotification] = useState([]);

  const storeTokenInLS = (serverToken) => {
    setToken(serverToken);
    // setIsLoggedIn(true);
    return localStorage.setItem("token", serverToken);
  };

  console.log(token);

  let isLoggedIn = !!token;
  console.log(isLoggedIn, "AuthProvider");

  const logOutUser = () => {
    setToken("");
    return localStorage.removeItem("token");
  };

  useEffect(() => {
    if (token) userAuthentication();
  }, [token]);

  const userAuthentication = async () => {
    try {
      const response = await fetch(`http://localhost:5000/user`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setUser(data);
      } else {
        console.log("userAuthentication failed");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, token, storeTokenInLS, logOutUser, user, selectedChat, setSelectedChat, chats, setChats, notification, setNotification }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
