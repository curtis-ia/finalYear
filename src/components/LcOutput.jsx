import React from "react";
import { grossValueChecker,  salaryChecker, ExpenseValueChecker } from "./LimitedCompany";
import { useRef } from 'react';

var totalRevenue;
var profit;
var salary; 
var totalExpenditure; 
var expenses;
var incomeTaxable;
var employerNi;
var net;


function LcOutput() {
           // This ref will be connected to the overlay div
  const overlayRef = useRef();
  // This function is called when the "Start Searching" button gets clicked
  const openSearch = () => {
    overlayRef.current.style.width = '100%';
  };

  // This function is called when the "Close" button is clicked
  const closeSearch = () => {
    overlayRef.current.style.width = '0%';
  };




function annualRevenue(){
    var totalIncome = grossValueChecker()
    totalRevenue = totalIncome;
    return totalRevenue.toLocaleString();
}

    function totalSalary(){
        var totalSalary = salaryChecker();
        salary = totalSalary; 
return salary.toLocaleString();
        
    }
    function employersNi(){
        var eNIMin = 9096;
        var deduction;
        if (salary < eNIMin){
            employerNi = 0 
        }
        else if (salary > eNIMin){
            deduction = salary - eNIMin;
            employerNi = deduction/100 * 15.05
            
        }
        
        return Math.ceil(employerNi).toLocaleString();
        
    }

    function companyExpenses(){
         expenses = ExpenseValueChecker()
         console.log(employerNi)
         return expenses.toLocaleString()
        
    }

    function totalExpenses(){
        totalExpenditure = salary + employerNi + expenses;
        console.log (totalExpenditure, totalRevenue, salary, employerNi, expenses)
        return Math.ceil(totalExpenditure).toLocaleString();
    }

    function annualProfit(){

        profit = totalRevenue - totalExpenditure;

        return Math.ceil(profit).toLocaleString();

    }

    function coorperationTax(){
        incomeTaxable = profit/100 * 19;

        return Math.ceil(incomeTaxable).toLocaleString();
    }
    function NetDividend(){
        net = profit - incomeTaxable;
        return Math.ceil(net).toLocaleString();
    }

    return (
        <div>
        <div className="resultOutput">
            <h2> Annual Revenue: {"£" + annualRevenue()} </h2>
            <p> Salaries: {"£" + totalSalary()}</p>
            <p> Employers NI : {"£" + employersNi()}</p>
            <p> Schdule E expenses : {"£" + companyExpenses()}</p>
            <h4> Total Expenditure: {"£" + totalExpenses()}</h4>
            <p> Profit before taxes: {"£" + annualProfit()}</p>
            <p> Corporation tax: {"£" + coorperationTax()}</p>
            <h1> Net profit after Taxes: {"£" + NetDividend()}</h1>

            <p className="disclaimer">Disclaimer: These tax calculations are for illustrative purposes only. No guarantee is made for the accuracy of the data provided. Consult a qualified professional financial advisor before making any financial decisions.</p>

        <button onClick={openSearch} className='open-button'>
         Assumption
        </button>
    {/* The search overlay */}     
        </div>
    <div ref={overlayRef} class='overlay'>
        <button class='close-button' onClick={closeSearch}>
          &times;
        </button>
        <div class='overlay-content'>
          <form>
    <div className= "assumptions">        
           <p className='search-text'> 
The calculations are based on the following assumptions:
</p>
<p className='search-text'>
<h2> Umbrella calculation </h2>
<ol>

<li>1. Figures are based on the current tax year 2023/2024 rates </li>  
<li>2. This is based on 22 working days  </li>  
<li>3. No expenses  </li>  
<li>4. Holiday pay is advanced  </li>  
<li>5. Contractor Umbrella’s standard margin (£11.25 per week/£45 per month) is included in this calculation  </li>  
<li>6. These calculations are inclusive of the new NI thresholds for the current year.  </li>  
<li>7. Income tax is calculated based upon the standard rate of 1250L. If your tax rate differs from this then the income tax calculations may differ from what you actually end up paying in income tax </li> 
</ol>

<h2> Limited Company calculation </h2>
<ul>
<li>1. Figures are based on the current year rates </li>  
<li>2. Any billable work included within the ‘Annual Revenue’ figure does not fall within the scope of the IR35 rules. </li>
<li>3. These calculations are inclusive of the new NI thresholds for the current year.  </li>  

</ul>

<h2> SelfEmployed calculation </h2>

<ul>
<li>1. All numbers are calculated on an annual basis </li> 
<li>2. The rates used to calculate income tax and national insurance are those for the current tax year 2023/2024. </li> 
<li>3. Income tax is calculated for UK tax payers excluding those resident in Scotland. </li> 
<li>4. Scottish income tax rates differ from the rest of the UK and are not accounted for in these calculations </li>
<li>5. Income tax is calculated based upon the standard rate of 1250L. If your tax rate differs from this then the income tax calculations may differ from what you actually end up paying in income tax </li> 
<li>6. National Insurance is calculated assuming the tax payer is on Category letter A. If you are under 21, an apprentice under 25 or over the state pension age then the national insurance calculations may differ from what  you actually end up paying in national insurance </li> 

</ul>
</p>
            </div>
          </form>
        </div>
      </div>
</div>
  )
    
}


export default LcOutput;
