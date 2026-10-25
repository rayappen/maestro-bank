import "./styles.css";
import { useState } from "react";

export default function App() {
  // const [step, setStep] = useState(1);
  // const [count, setCount] = useState(0);
  return (
    <div className="App">
      {/* <Step step={step} setStep={setStep} />
      <Count count={count} setCount={setCount} step={step} />
      <Result count={count} /> */}
      <Counter />
    </div>
  );
}

function Counter() {
  const [count, setCount] = useState(0);
  const [step, setStep] = useState(1);

  const date = new Date("june 21 2027");
  date.setDate(date.getDate() + count);

  function handleChange(event) {
    console.log(event.target.value);
    setStep(Number(event.target.value));
  }

  function handleCount(event) {
    setCount(Number(event.target.value));
  }

  function reset() {
    setStep(1);
    setCount(0);
  }

  return (
    <div>
      <div>
        <input
          type="range"
          min="01"
          max="10"
          value={step}
          onChange={handleChange}
        ></input>
        <span>Step: {step} </span>
      </div>

      <div>
        <button onClick={() => setCount((c) => c - step)}>-</button>
        <input type="text" value={count} onChange={handleCount} />
        <button onClick={() => setCount((c) => c + step)}>+</button>
      </div>

      <p>
        <span>
          {count === 0
            ? "Today is "
            : count > 0
              ? `${count} days from today is `
              : `${Math.abs(count)} days ago was `}
        </span>
        <span>{date.toDateString()}</span>
      </p>

      {count !== 0 || step !== 1 ? (
        <div>
          <button onClick={reset}>Reset</button>
        </div>
      ) : null}
    </div>
  );
}
