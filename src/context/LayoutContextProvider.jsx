import React, { createContext, useContext, useReducer } from "react";
import { LayoutReducer } from "../reducer/LayoutReducer";

const initialValues = {
  showMenu: false,
  editData: null,
};

const LayoutContext = createContext(initialValues);
export const LayoutContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(LayoutReducer, initialValues);

  const setShowMenu = (showMenu) => {
    dispatch({ type: "SHOW_MENU", payload: { showMenu: showMenu } });
  };

  const setEditData = (data) => {
    dispatch({
      type: "SET_EDIT_DATA",
      payload: { editData: data },
    });
  };

  const value = {
    showMenu: state.showMenu,
    editData: state.editData,
    setShowMenu,
    setEditData,
  };
  return (
    <LayoutContext.Provider value={value}>{children}</LayoutContext.Provider>
  );
};

export const useLayoutContext = () => {
  return useContext(LayoutContext);
};
