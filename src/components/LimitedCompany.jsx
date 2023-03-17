import React, { useState } from "react";
import LcOutput from "./LcOutput";

var grossIncomeData;
var salaryData;
var totalExpensesData;



function LimitedCompany() {
  const [displayCalculator, setCalculator] = useState(false);
  const [grossIncome, setGrossIncome] = useState(0);
  const [salary, setSalary] = useState(0);
  const [expenses, setExpenses] = useState(0);

  const handleGrossIncomeChange = (event) => {
    const {name, value} = event.target;
    setGrossIncome(value);
    console.log(displayCalculator)
  };

  const handleSalaryChange = (event) => {
    const {name, value} = event.target;
    setSalary(value);
  };

  const handleExpensesChange = (event) => {
    const {name, value} = event.target;
    setExpenses(value);
  };

  function shower(event) {
    setCalculator(!displayCalculator);
    grossIncomeData = Math.floor(grossIncome)
    salaryData = Math.floor(salary)
    totalExpensesData = Math.floor(expenses)
    // console.log(displayCalculator)
    // console.log(grossIncomeData, salaryData, totalExpensesData)
    // console.log(<LcOutput />)
  
  }
  return (
    <div> 
      <h1>Limited Company</h1>
      <p>
        Gross Annual Income
        <span className="currency-input">
          <span className="currency-symbol">£</span>
          <input
            type="text"
            name="grossAnnualIncome"
            onChange={handleGrossIncomeChange}
            className="currency-value"
            placeholder="0.00"
        
          />
        </span>
      </p>
      <p>
        Salary
        <span className="currency-input">
          <span className="currency-symbol">£</span>
          <input
            type="text"
            name="salaryInput"
            onChange={handleSalaryChange}
            className="currency-value"
            placeholder="0.00"
          
          />
        </span>
      </p>
      <p>
        Expenses
        <span className="currency-input">
          <span className="currency-symbol">£</span>
          <input
            type="text"
            name="ExpensesInput"
            onChange={handleExpensesChange}
            className="currency-value"
            placeholder="0.00"
      
          />
        </span>
      </p>
      <button className="submit-button" type="submit" onClick={shower}>Submit</button>
      {displayCalculator === true && <LcOutput />}
    </div>
  );
}


function grossValueChecker() {
  return grossIncomeData;
}
function ExpenseValueChecker() {
  return totalExpensesData;
}
function salaryChecker() {
  return salaryData;
}


export { grossValueChecker, ExpenseValueChecker, salaryChecker };
export default LimitedCompany;