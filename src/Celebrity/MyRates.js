import React from "react";

function MyRates({ rates }) {
  return (
    <div>
      MyRates
      {rates.map((rate) => (
        <div key={rate.id}>
          Description: <h3>{rate.description}</h3>
          Price: <h3>{rate.price}</h3>
        </div>
      ))}
    </div>
  );
}

export default MyRates;
