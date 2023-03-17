import React, { useState } from "react";
import UcOutput from "./UcOutput";

var grossIncomeData;
var checker;


function UmbrellaCompany() {
  const [displayCalculator, setCalculator] = useState(false);
  const [grossPay, setGrossPay] = useState(0);
  const [payType, setPayType] = useState('');

  const handleGrossPayChange = (event) => {
    const {name, value} = event.target;
    setGrossPay(value);
  };


  function shower(event) {
    grossIncomeData = grossPay
    const {name}= event.target;
    checker = name;
    grossValueChecker();
    setCalculator(!displayCalculator)
    
  
  }


  return (
    <div>
      <h1>Umbrella Company</h1>
      <div className="input-group">
        <p>
          My Pay is{' '}
          <span className="currency-input">
            <span className="currency-symbol">£</span>
            <input
              type="text"
              name="Income"
              onChange={handleGrossPayChange}
              className="currency-value"
                placeholder="0.00"
            />
          </span>
        </p>
        <div className="card-buttons">
          <button type="submit" onClick={shower} name="perHour">
            Per Hour
          </button> {""}
          <button type="submit" onClick={shower} name="perDay">
            Per Day
          </button>
        </div>
      </div>
      {displayCalculator === true && <UcOutput />}
    </div>
  )
}

function grossValueChecker() {
  return grossIncomeData;
}

function inputChecker(){
  return checker;
}



export default UmbrellaCompany;
export { grossValueChecker, inputChecker};


