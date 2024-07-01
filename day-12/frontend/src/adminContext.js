import React, { createContext, useState } from "react";

export const UpdateContext = createContext();

export const UpdateProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  return (
    <UpdateContext.Provider
      value={{ isLoggedIn, setIsAdmin, isAdmin, setIsLoggedIn }}
    >
      {children}
    </UpdateContext.Provider>
  );
};
