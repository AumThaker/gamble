import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./login";
import Game from "./game";
import { createContext, useReducer } from "react";

let NameContext = createContext();
function App() {
  function reducer(state, action) {
    if (action.type === "name-update") {
      return {
        ...state,
        name: action.UPDATED_NAME,
      };
    }
    if (action.type === "age-update") {
      return {
        ...state,
        age: action.UPDATED_AGE,
      };
    }
  }
  function naming(e) {
    dispatch({ type: "name-update", UPDATED_NAME: e.target.value });
  }
  function age_count(e) {
    dispatch({ type: "age-update", UPDATED_AGE: e.target.value });
  }
  let [state, dispatch] = useReducer(reducer, { name: "", age: "" });
  return (
    <NameContext.Provider
      value={{ Username: state.name, Userage: state.age, naming, age_count }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/game" element={<Game />}></Route>
        </Routes>
      </BrowserRouter>
    </NameContext.Provider>
  );
}

export {NameContext}
export default App;
