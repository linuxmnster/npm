// npm create vite@latest mrcet-calculator -- --template react
// npm install
import React, { useState } from "react";
import ReactDOM from "react-dom/client";

function Calculator() {
  const [display, setDisplay] = useState("");

  // Handle button clicks
  const handleClick = (value) => {
    if (value === "Clear") {
      setDisplay("");
    }
    else if (value === "Delete") {
      setDisplay(display.slice(0, -1));
    }
    else if (value === "=") {
      calculateResult();
    }
    else {
      setDisplay(display + value);
    }
  };

  // Calculate the result
  const calculateResult = () => {
    try {
      if (!display || !/^[0-9+\-*/.() ]+$/.test(display))
        throw Error("Invalid");

      let result = Function("return " + display)();

      if (!Number.isFinite(result))
        throw Error("Invalid");

      setDisplay(String(result));
    }
    catch {
      setDisplay("Error");
    }
  };

  // Calculator buttons
  const buttons = [
    "Clear", "Delete", ".", "/",
    "7", "8", "9", "*",
    "4", "5", "6", "-",
    "1", "2", "3", "+",
    "0", "="
  ];

  return (
    <div className="calculator">
      <h2>MRCET Calculator</h2>

      <input
        type="text"
        value={display}
        readOnly
      />

      <div className="buttons">
        {buttons.map((btn, index) => (
          <button
            key={index}
            onClick={() => handleClick(btn)}
          >
            {btn}
          </button>
        ))}
      </div>
    </div>
  );
}

// CSS Styling
const style = document.createElement("style");

style.innerHTML = `
  body {
    font-family: Arial;
    text-align: center;
    background: #f2f2f2;
  }

  .calculator {
    width: 300px;
    margin: 50px auto;
    padding: 15px;
    background: white;
    border: 2px solid black;
  }

  input {
    width: 95%;
    height: 40px;
    font-size: 22px;
    text-align: right;
    margin-bottom: 10px;
  }

  .buttons {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
  }

  button {
    height: 50px;
    margin: 2px;
    font-size: 18px;
    cursor: pointer;
  }

  button:hover {
    background: lightblue;
  }
`;

document.head.appendChild(style);

// Render application
ReactDOM.createRoot(document.getElementById("root"))
  .render(<Calculator />);
