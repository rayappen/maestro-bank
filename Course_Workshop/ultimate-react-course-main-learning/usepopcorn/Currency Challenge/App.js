import { useEffect, useState } from "react";

// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`

const OLD_BASE_API = "https://api.frankfurter.app/latest?";
const UPDATED_BASE_API = "https://api.frankfurter.dev/v2/rate/";

export default function App() {
  const [query, setQuery] = useState("");
  const [fromCur, setFromCur] = useState("INR");
  const [toCur, setToCur] = useState("USD");
  const [rate, setRate] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function handleQuery(amount) {
    console.log("amount: ", amount);
    setQuery(amount);
  }

  function handleCurrencySelection(setCurrencyValue, Currency) {
    setCurrencyValue(Currency);
  }

  useEffect(
    function () {
      //   const controller = new AbortController();
      async function getCurrentValue() {
        if (query < 1) {
          setRate("");
          return;
        }
        if (fromCur === toCur) {
          setRate(1);
          return;
        }
        try {
          setIsLoading(true);
          //   const res = await fetch(UPDATED_BASE_API + `${fromCur}/${toCur}`,
          //     {
          //     signal: controller.signal,
          //   });
          const res = await fetch(UPDATED_BASE_API + `${fromCur}/${toCur}`);
          const data = await res.json();
          console.log("data: ", data);
          setRate(data.rate);
        } catch (err) {
          console.error("Error fetching rate:", err);
        } finally {
          setIsLoading(false);
        }
      }
      getCurrentValue();
    },
    [query, fromCur, toCur],
  );

  return (
    <>
      <CurrencySelection
        fromCur={fromCur}
        toCur={toCur}
        setFromCur={setFromCur}
        setToCur={setToCur}
        handleCurrencySelection={handleCurrencySelection}
        query={query}
        handleQuery={handleQuery}
        isLoading={isLoading}
      />
      <Output calculatedAmount={query * rate} currency={toCur} />
    </>
  );
}

function CurrencySelection({
  fromCur,
  toCur,
  setFromCur,
  setToCur,
  handleCurrencySelection,
  query,
  handleQuery,
  isLoading,
}) {
  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => handleQuery(Number(e.target.value))}
        // disabled={isLoading}
      />
      <select
        value={fromCur}
        onChange={(e) => handleCurrencySelection(setFromCur, e.target.value)}
        disabled={isLoading}
      >
        <option value="INR">INR</option>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
      </select>
      <select
        value={toCur}
        onChange={(e) => handleCurrencySelection(setToCur, e.target.value)}
        disabled={isLoading}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <button>Convert</button>
    </div>
  );
}

function Output({ calculatedAmount, currency }) {
  return <p>Output: {`${calculatedAmount} ${currency}`}</p>;
}
