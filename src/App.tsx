import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "./store/reducers";
import "./assets/scss/global.scss"
const App: React.FC = () => {
  const counter = useSelector((state: RootState) => state.counter);
  const dispatch = useDispatch();

  return (
    <div>
      <h1 className="text-3xl font-bold">Counter: {counter.counter}</h1>
      <button onClick={() => dispatch({ type: "INCREMENT" })}>Increment</button>
      <button onClick={() => dispatch({ type: "DECREMENT" })}>Decrement</button>
    </div>
  );
};

export default App;
