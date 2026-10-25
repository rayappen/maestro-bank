import { useEffect, useReducer, useState } from "react";
import Header from "./Header";
import Main from "./Main";

const initialState = { questions: [], status: "loading" };
function reducer(state, action) {
  switch (action.type.toLowerCase()) {
    case "dataReceived":
      return {
        ...state,
        question: action.payload,
        status: "ready",
      };
    case "dataFailed": {
      return { ...state, status: "error" };
    }
    default:
      throw new error("Unknown action");
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { state, status } = initialState;
  useEffect(function () {
    fetch("http://localhost:8001/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", payload: questions }))
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        <p>1/15</p>
        <p>Question</p>
      </Main>
    </div>
  );
}
