import React, { createContext, useState } from "react";

export const UpdateContext = createContext();

export const UpdateProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [cartId, setCartId] = useState(null);
  const [cartNumber, setCartNumber] = useState(0);
  return (
    <UpdateContext.Provider
      value={{
        isLoggedIn,
        setIsAdmin,
        isAdmin,
        setIsLoggedIn,
        cartId,
        setCartId,
        cartNumber,
        setCartNumber,
      }}
    >
      {children}
    </UpdateContext.Provider>
  );
};
