import React from "react";
//before React V18
// import ReactDOM from "react-dom";
import "./index.css";

// Since React V18
import ReactDOM from "react-dom/client";

const pizzaData = [
  {
    name: "Focaccia",
    ingredients: "Bread with italian olive oil and rosemary",
    price: 6,
    photoName: "pizzas/focaccia.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Margherita",
    ingredients: "Tomato and mozarella",
    price: 10,
    photoName: "pizzas/margherita.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Spinaci",
    ingredients: "Tomato, mozarella, spinach, and ricotta cheese",
    price: 12,
    photoName: "pizzas/spinaci.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Funghi",
    ingredients: "Tomato, mozarella, mushrooms, and onion",
    price: 12,
    photoName: "pizzas/funghi.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Salamino",
    ingredients: "Tomato, mozarella, and pepperoni",
    price: 15,
    photoName: "pizzas/salamino.jpg",
    soldOut: true,
  },
  {
    name: "Pizza Prosciutto",
    ingredients: "Tomato, mozarella, ham, aragula, and burrata cheese",
    price: 18,
    photoName: "pizzas/prosciutto.jpg",
    soldOut: false,
  },
];

function App() {
  return (
    <div className="container">
      <Header />
      {/* <h1>hello React!!!</h1> */}
      <Menu />
      <Footer />
    </div>
  );
}

function Header() {
  //   const style = { color: "red", fontSize: "48px", textTransform: "uppercase" };
  const style = {};

  return (
    <header className="header">
      <h1 style={style}>Fast React Pizza Co.</h1>
    </header>
  );
}

function Menu() {
  const pizzaList = pizzaData;
  //   const pizzaList = [];
  const pizzaMenuSize = pizzaList.length;

  return (
    <main className="menu">
      <h2>Our Menu</h2>
      {/*AND conditional rendering /*}
      {/* {pizzaMenuSize > 0 && (
        <ul className="pizzas">
          {pizzaList.map((pizza, idx) => (
            <Pizza key={pizza} pizzaObj={pizza} />
          ))}
        </ul>
      )} */}
      {/*Ternary conditional rendering */}
      {pizzaMenuSize > 0 ? (
        <React.Fragment key="random">
          <p>
            Authentic Italian cuisine, 6 creative dishes to choose from all. All
            from our stone oven, all organic, all delicious.
          </p>
          <ul className="pizzas">
            {pizzaList.map((pizza, idx) => (
              <Pizza key={idx} pizzaObj={pizza} />
            ))}
          </ul>
        </React.Fragment>
      ) : (
        <p>
          We are currently working on our menu. Please come back later {":("} !
        </p>
      )}
      {/* <Pizza
        name="Pizza Margherita"
        ingredients="Tomato and mozarella"
        photoName="pizzas/margherita.jpg"
        price={10}
      />
      <Pizza
        name="Pizza Prosciutto"
        ingredients="Tomato, mozarella, ham, aragula, and burrata cheese"
        photoName="pizzas/prosciutto.jpg"
        price={18}
      /> */}
    </main>
  );
}

function Pizza({ pizzaObj }) {
  console.log("props", pizzaObj);

  //   if (pizzaObj.soldOut) return null;

  return (
    <li className={`pizza ${pizzaObj.soldOut ? "sold-out" : ""}`}>
      <img src={pizzaObj.photoName} alt={pizzaObj.name} />
      <div>
        <h3>{pizzaObj.name}</h3>
        <p>{pizzaObj.ingredients}</p>
        {/* {pizzaObj.soldOut ? <span>SOLD OUT</span> : <span>pizzaObj.price</span>} */}
        <span>{pizzaObj.soldOut ? "SOLD OUT" : pizzaObj.price}</span>
      </div>
    </li>
  );
}

function Footer() {
  const hour = new Date().getHours();
  const openHour = 9;
  const closeHour = 22;
  const isOpen = hour >= openHour && hour <= closeHour;

  return (
    <footer className="footer">
      {/* {new Date().toLocaleTimeString()} -
      {isOpen ? " We're currently open! :)" : " We're closed :("} */}
      {/* AND Conditional Rendering */}
      {/* {!isOpen && (
        <div className="order">
          <p>
            {" "}
            We're open until {closeHour}:00. Please come and visit us or order
            online! {":)"}{" "}
          </p>
          <button className="btn">Order</button>
        </div>
      )} */}
      {/* Ternary Conditional Rendering */}
      {isOpen ? (
        <Order closeHour={closeHour} openHour={openHour} />
      ) : (
        <p>
          We are happy to welcome you between {openHour}:00 and {closeHour}:00{" "}
          {":)"}
        </p>
      )}
    </footer>
  );
  //   return React.createElement("footer", null, "We're currently open!");
}

function Order({ closeHour, openHour }) {
  return (
    <div className="order">
      <p>
        {" "}
        We're open from {openHour}:00 until {closeHour}:00. Please come and
        visit us or order online! {":)"}
      </p>
      <button className="btn">Order</button>
    </div>
  );
}

//Before React V18
// ReactDOM.render(<App />, document.getElementById("root"));

//Since React V18
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

/*
Authentic Italian cuisine, 6 creative dishes to choose from all. All from our stone oven, all organic, all delicious.
*/
