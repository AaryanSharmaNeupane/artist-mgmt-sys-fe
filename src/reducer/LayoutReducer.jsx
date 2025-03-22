export const LayoutReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "SHOW_MENU":
      return { ...state, showMenu: payload.showMenu };

    case "SET_EDIT_DATA":
      return {
        ...state,
        editData: payload.editData,
      };

    default:
      return "No cases Found";
  }
};
