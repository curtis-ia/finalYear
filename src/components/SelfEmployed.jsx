import React, { useState } from "react";
import SeOutput from "./SeOutput";




var grossIncomeData;
var totalExpensesData;
var pensionContributionData;
var resultExport; 

var isSubmit = false;
function SelfEmployed(props) {
  const [resultShower, setResultShower] = useState(false);
  const [displayCalculator, setCalculator] = useState(false);
  const [grossIncome, setGrossIncome] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [pensionContribution, setPensionContribution] = useState(0);

  const handleGrossIncomeChange = (event) => {
    const { name, value } = event.target;
    setGrossIncome(value);
  };

  const handleTotalExpensesChange = (event) => {
    const { name, value } = event.target;
    setTotalExpenses(value);
  };

  const handlePensionContributionChange = (event) => {
    const { name, value } = event.target;
    setPensionContribution(value);
  };


  // function valueChecker() {

  // }



  function shower(event) {
    setCalculator(!displayCalculator);
    grossIncomeData = Math.floor(grossIncome)
    totalExpensesData = Math.floor(totalExpenses)
    pensionContributionData = Math.floor(pensionContribution)

  }
  function leggo(event) {
    setResultShower(!resultShower);
    resultExport = resultShower;
    sendResult();
 

  }

  return (

    <div>
      <h1>Self Employed</h1>
      <div className="input-group">
        <p>Gross Income {""}
          <span className="currency-input">
            <span className="currency-symbol">£</span>
            <input
              type="text"
              name="grossIncome"
              id="grossIncome"
              autoComplete="off"
              onChange={handleGrossIncomeChange}
              className="currency-value"
              placeholder="0.00"
            />
          </span>
        </p>

      </div>

      <div className="input-group">
        <p>Total Expenses  {""}
          <span className="currency-input">
            <span className="currency-symbol">£</span>
            <input
              type="text"
              name="totalExpenses"
              id="totalExpenses"
              autoComplete="off"
              onChange={handleTotalExpensesChange}
              className="currency-value"
              placeholder="0.00"
            />
          </span>
        </p>
      </div>
      <div className="input-group">
        <p>Pension Contribution  {""}
          <span className="currency-input">
            <span className="currency-symbol">£</span>
            <input
              type="text"
              name="pensionContribution"
              id="pensionContribution"
              autoComplete="off"
              onChange={handlePensionContributionChange}
              className="currency-value"
              placeholder="0.00"
            />
          </span>
        </p>
      </div>
      <button type="submit" name="SeSubmit" onClick={shower}>Submit</button>
      {/* <button type="submit" name="resultTester" onClick={leggo}>click me </button> */}

      {displayCalculator === true && <SeOutput />}
    </div>
  );
}


// const valueCheckerr = {
// gross : grossIncomeData.toLocaleString(),
// expenses : totalExpensesData,
// pension : pensionContributionData

// }


function grossValueChecker() {
  return grossIncomeData;
}
function ExpenseValueChecker() {
  return totalExpensesData;
}
function pensionValueChecker() {
  return pensionContributionData;
}
function sendResult(){
  return resultExport;
}
export default SelfEmployed;
export { grossValueChecker, ExpenseValueChecker, pensionValueChecker, sendResult};
