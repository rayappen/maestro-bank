import "./styles.css";
import { useReducer } from "react";

/*
INSTRUCTIONS / CONSIDERATIONS:

1. Let's implement a simple bank account! It's similar to the example that I used as an analogy to explain how useReducer works, but it's simplified (we're not using account numbers here)

2. Use a reducer to model the following state transitions: openAccount, deposit, withdraw, requestLoan, payLoan, closeAccount. Use the `initialState` below to get started.

3. All operations (expect for opening account) can only be performed if isActive is true. If it's not, just return the original state object. You can check this right at the beginning of the reducer

4. When the account is opened, isActive is set to true. There is also a minimum deposit amount of 500 to open an account (which means that the balance will start at 500)

5. Customer can only request a loan if there is no loan yet. If that condition is met, the requested amount will be registered in the 'loan' state, and it will be added to the balance. If the condition is not met, just return the current state

6. When the customer pays the loan, the opposite happens: the money is taken from the balance, and the 'loan' will get back to 0. This can lead to negative balances, but that's no problem, because the customer can't close their account now (see next point)

7. Customer can only close an account if there is no loan, AND if the balance is zero. If this condition is not met, just return the state. If the condition is met, the account is deactivated and all money is withdrawn. The account basically gets back to the initial state
*/

const initialState = {
  balance: 0,
  loan: 0,
  isActive: false,
  message: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "open": {
      return { ...state, isActive: true, balance: 500, message: "" };
    }
    case "close": {
      const canClose =
        state.isActive && state.loan === 0 && state.balance === 0;
      if (!canClose) {
        return {
          ...state,
          message: "You must have 0 balance and 0 loans to close your account.",
        };
      }
      return initialState;
    }
    case "withdraw": {
      if (!state.isActive) return state;
      const canWithdraw = state.balance >= action.payload;
      return {
        ...state,
        balance: canWithdraw ? state.balance - action.payload : state.balance,
        message: canWithdraw
          ? ""
          : "Please enter a value less than or equal to your balance.",
      };
    }
    case "deposit": {
      return {
        ...state,
        balance: state.isActive
          ? state.balance + action.payload
          : state.balance,
      };
    }
    case "loan": {
      if (!state.isActive) return state;
      if (state.loan > 0) {
        return { ...state, message: "You already have an active loan!" };
      }
      return {
        ...state,
        loan: action.payload,
        balance: state.balance + action.payload,
        message: "",
      };
    }
    case "foreclosure": {
      if (!state.isActive) return state;
      const canForeclose = state.balance >= state.loan;
      return {
        ...state,
        balance: canForeclose ? state.balance - state.loan : state.balance, // Bug Fix: Deduct the money
        loan: canForeclose ? 0 : state.loan,
        message: canForeclose
          ? ""
          : "You do not have enough balance to pay off the loan.",
      };
    }
    default:
      throw new Error("Unknown action type");
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { balance, isActive, loan, message } = state;

  return (
    <div className="App">
      <h1>useReducer Bank Account</h1>
      <p>Balance: {isActive ? balance : "X"}</p>
      <p>Loan: {isActive ? loan : "X"}</p>

      {message && <p style={{ color: "red", fontWeight: "bold" }}>{message}</p>}

      <p>
        <button onClick={() => dispatch({ type: "open" })} disabled={isActive}>
          Open account
        </button>
      </p>
      <p>
        <button
          onClick={() => dispatch({ type: "deposit", payload: 150 })}
          disabled={!isActive}
        >
          Deposit 150
        </button>
      </p>
      <p>
        <button
          onClick={() => dispatch({ type: "withdraw", payload: 50 })}
          disabled={!isActive}
        >
          Withdraw 50
        </button>
      </p>
      <p>
        <button
          onClick={() => dispatch({ type: "loan", payload: 5000 })}
          disabled={!isActive || loan > 0}
        >
          Request a loan of 5000
        </button>
      </p>
      <p>
        <button
          onClick={() => dispatch({ type: "foreclosure" })}
          disabled={!isActive || loan === 0}
        >
          Pay loan
        </button>
      </p>
      <p>
        <button
          onClick={() => dispatch({ type: "close" })}
          disabled={!isActive}
        >
          Close account
        </button>
      </p>
    </div>
  );
}
