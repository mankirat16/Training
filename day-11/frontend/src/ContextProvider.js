import React, { createContext, useState } from "react";

export const UpdateContext = createContext();

export const UpdateProvider = ({ children }) => {
  const [view, setView] = useState(false);
  const [currBook, setCurrBook] = useState({
    bookName: "",
    authorName: "",
  });
  return (
    <UpdateContext.Provider value={{ view, setView, currBook, setCurrBook }}>
      {children}
    </UpdateContext.Provider>
  );
};
