import React, { useState } from "react";

export default function CounterApp() {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };

  return (
    <div
      style={{
        width: "150px",
        background: "white",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        border: "1px solid black",
      }}
    >
      <div
        style={{
          flex: 1,
          padding: "0 10px",
          display: "flex",
          flexDirection: "row",
        }}
      >
        {count}
        <p>€</p>
      </div>

      <div
        className="button"
        style={{
          width: "30px",
          display: "flex",
          flexDirection: "column",
          borderLeft: "1px solid black",
        }}
      >
        <button
          style={{
            borderBottom: "1px solid black",
          }}
          onClick={increment}
        >
          ▲
        </button>
        <button onClick={decrement}>▼</button>
      </div>
    </div>
  );
}
