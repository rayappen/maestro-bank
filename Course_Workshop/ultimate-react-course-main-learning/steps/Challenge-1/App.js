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

// function Step({ step, setStep }) {
//   return (
//     <ButtonProducer
//       name="Step"
//       value={step}
//       onChange={setStep}
//       incrementVal={1}
//     />
//   );
// }

// function Count({ count, setCount, step }) {
//   return (
//     <ButtonProducer
//       name="Count"
//       value={count}
//       onChange={setCount}
//       incrementVal={step}
//     />
//   );
// }

// function Result({ count }) {
//   // Calculate dynamic date based on count days from today
//   const targetDate = new Date();
//   targetDate.setDate(targetDate.getDate() + count);

//   // Format date options
//   const options = {
//     weekday: "long",
//     year: "numeric",
//     month: "long",
//     day: "numeric",
//   };
//   const formattedDate = targetDate.toLocaleDateString("en-US", options);
//   return (
//     <div>
//       <span>
//         {count === 0 ? "Today is " : `${count} days from today is `}
//         <strong>{formattedDate}</strong>
//       </span>
//     </div>
//   );
// }

// function ButtonProducer({ name, value, onChange, incrementVal }) {
//   return (
//     <div>
//       <button onClick={() => value > 0 && onChange(value - incrementVal)}>
//         -
//       </button>
//       <span>
//         {" " + name}: {value + " "}
//       </span>
//       <button onClick={() => onChange(value + incrementVal)}>+</button>
//     </div>
//   );
// }

// function Counter() {
//   const [count, setCount] = useState(0);
//   const [step, setStep] = useState(1);

//   const date = new Date("june 21 2027");
//   date.setDate(date.getDate() + count);

//   return (
//     <div>
//       <div>
//         <button onClick={() => setStep((c) => c - 1)}>-</button>
//         <span>Step: {step}</span>
//         <button onClick={() => setStep((c) => c + 1)}>+</button>
//       </div>

//       <div>
//         <button onClick={() => setCount((c) => c - step)}>-</button>
//         <span>Count: {count}</span>
//         <button onClick={() => setCount((c) => c + step)}>+</button>
//       </div>

//       <p>
//         <span>
//           {count === 0
//             ? "Today is "
//             : count > 0
//               ? `${count} days from today is `
//               : `${Math.abs(count)} days ago was `}
//         </span>
//         <span>{date.toDateString()}</span>
//       </p>
//     </div>
//   );
// }

function Counter() {
  const [count, setCount] = useState(0);
  const [step, setStep] = useState(1);

  const date = new Date("june 21 2027");
  date.setDate(date.getDate() + count);

  return (
    <div>
      <div>
        <input
          type="range"
          id="volume"
          name="volume"
          min="0"
          max="100"
          value="50"
        ></input>
        <button onClick={() => setStep((c) => c - 1)}>-</button>
        <span>Step: {step}</span>
        <button onClick={() => setStep((c) => c + 1)}>+</button>
      </div>

      <div>
        <button onClick={() => setCount((c) => c - step)}>-</button>
        <span>Count: {count}</span>
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
    </div>
  );
}
