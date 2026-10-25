import "./styles.css";
import { useState } from "react";

export default function App() {
  return (
    <div className="App">
      <Display />
    </div>
  );
}

function Display() {
  const [billAmount, setBillAmount] = useState("");
  const [yourPercentage, setYourPercentage] = useState("0");
  const [friendPercentage, setFriendPercentage] = useState("0");
  const finalAmount = calcAvg();

  function updateBillAmount(value) {
    setBillAmount(value);
  }

  function updateYourPercentage(value) {
    setYourPercentage(value);
  }

  function updateFriendPercentage(value) {
    setFriendPercentage(value);
  }

  function handleRest() {
    updateBillAmount("");
    updateYourPercentage("0");
    updateFriendPercentage("0");
  }

  function calcAvg() {
    console.log("yourPercentage: ", yourPercentage);
    console.log("friendPercentage: ", friendPercentage);
    console.log("totalPercentage: ", yourPercentage + friendPercentage);
    return yourPercentage > 0 || friendPercentage > 0
      ? Math.round(billAmount / (yourPercentage + friendPercentage))
      : "";
  }

  return (
    <div>
      <DisplayMessage message="How much was the bill? ">
        <input
          type="text"
          value={billAmount}
          onChange={(e) =>
            updateBillAmount(
              e.target.value === "" ? "" : Number(e.target.value),
            )
          }
        />
      </DisplayMessage>
      <DisplayMessage message="How do you like the service? ">
        <SelectPercentage
          percentage={yourPercentage}
          handlePercentageUpdate={updateYourPercentage}
        />
      </DisplayMessage>
      <DisplayMessage message="How did your friend like the service? ">
        <SelectPercentage
          percentage={friendPercentage}
          handlePercentageUpdate={updateFriendPercentage}
        />
      </DisplayMessage>
      {billAmount > 0 ? (
        <DisplayMessage
          message={`You pay $${billAmount} ${finalAmount !== "" ? `+ $${finalAmount} = ${billAmount + finalAmount}` : ""}`}
        >
          <div>
            <button onClick={handleRest}>Rest</button>
          </div>
        </DisplayMessage>
      ) : (
        ""
      )}
    </div>
  );
}

function DisplayMessage({ message, children }) {
  return (
    <div>
      <span>{message}</span>
      {children}
    </div>
  );
}

function SelectPercentage({ percentage, handlePercentageUpdate }) {
  return (
    <select
      value={percentage}
      onChange={(e) => handlePercentageUpdate(Number(e.target.value))}
    >
      <option value="0">Dissatisfied (0%)</option>
      <option value="5">It was okay (5%)</option>
      <option value="10">It was good (10%)</option>
      <option value="20">Absolutely amazing! (20%)</option>
    </select>
  );
}

{
  /* <Reset
            updateBillAmount={updateBillAmount}
            updateYourPercentage={updateYourPercentage}
            updateFriendPercentage={updateFriendPercentage}
          /> */
}
