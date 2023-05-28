import { createContext, useReducer } from "react";

const initialState = {
  user: localStorage.getItem("userToken"),
};

const reducer = (state, action) => {
  switch (action.type) {
    case "login":
      localStorage.setItem("userToken", action.payload.token);
      return { ...state, user: action.payload.token };

    case "logout":
      localStorage.removeItem("userToken");
      return { ...state, user: null };

    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
};

export const ContextProvider = createContext();

// eslint-disable-next-line react/prop-types
function Stores({children}) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const loginUser = (token) => {
    dispatch({ type: "login", payload: { token: token } });
  };

  const logoutUser = () => {
    dispatch({ type: "logout" });
  };

  const value = {
    user: state.user,
    loginUser,
    logoutUser,
  };

  return (
    <ContextProvider.Provider value={value}>
      {children}
    </ContextProvider.Provider>
  );
}

export default Stores;
