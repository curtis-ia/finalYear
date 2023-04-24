import React from "react";
import { grossValueChecker, ExpenseValueChecker, pensionValueChecker } from "./SelfEmployed";
import { useRef } from 'react';


var profit;
var incomeTaxable;
var tax;
var c2Nic;
var c4Nic;
var totalNic;
var pension;
var net;


function SeOutput() {
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



    function profitCalculator() {
        var totalIncome = grossValueChecker()
        var totalExpenses = ExpenseValueChecker()
        profit = totalIncome - totalExpenses;
        return profit.toLocaleString();
    }
    function taxableIncomeCalculator() {
        var taxAllowance = 12570;
        var taxAllowanceMax = 125140;
        if (profit < taxAllowanceMax && profit > taxAllowance) {
            incomeTaxable = profit - taxAllowance;
        }
        else if (profit < taxAllowance) {
            incomeTaxable = 0;
        }
        else if (profit > taxAllowanceMax) {
            incomeTaxable = profit;
        }


        return incomeTaxable.toLocaleString();

    }
    function IncomeTax() {
        var taxAllowance = 12570;
        var firstTaxPaid;
        var firstTaxEnd = 50271;
        var secondTaxPaid;
        var secondTaxEnd = 150000;
        var thirdTaxPaid;



        if (incomeTaxable > 0 && incomeTaxable <= firstTaxEnd) {
            tax = (20 / 100) * incomeTaxable;
            console.log(tax, "hidff")
        }
        else if (incomeTaxable > firstTaxEnd && incomeTaxable <= secondTaxEnd) {
            firstTaxPaid = incomeTaxable - firstTaxEnd;
            var a = (20 / 100) * firstTaxEnd;
            var b = (40 / 100) * firstTaxPaid;

            tax = a + b
            console.log(a, b, "yo")
        }
        else if (incomeTaxable > secondTaxEnd) {
            firstTaxPaid = incomeTaxable - firstTaxEnd;
            if (firstTaxPaid < secondTaxEnd) {
                var a = (20 / 100) * firstTaxEnd;
                var b = (40 / 100) * firstTaxPaid;

                tax = a + b
                console.log(a, b, "hiii")
            }
            else if (firstTaxPaid > secondTaxEnd) {
                secondTaxPaid = firstTaxPaid - secondTaxEnd;
                var a = (20 / 100) * firstTaxEnd;
                var b = (40 / 100) * secondTaxEnd;
                var c = (45 / 100) * secondTaxPaid;
                tax = a + b + c
                console.log(a, b, c, "hi")
            }
        }
        else {
            tax = 0
        }

        return Math.ceil(tax).toLocaleString();

    }

    function class2Nic() {
        var nicFree = 11908;
        if (profit > 6515 && profit > nicFree) {
            c2Nic = 3.05 * 52
        }
        else {
            c2Nic = 0
        }
        return Math.ceil(c2Nic).toLocaleString();
    }

    function class4Nic() {
        var nicFree = 11908;
        var firstNicPaid;
        var firstNicEnd = 50270;
        var secondNicPaid;
        var a;
        var b;
        if (profit <= nicFree) {
            c4Nic = 0

        }
        else if (profit > nicFree && profit <= firstNicEnd) {
            firstNicPaid = profit - nicFree;
            c4Nic = 9.73 / 100 * firstNicPaid;
        }
        else if (profit > firstNicEnd) {
            firstNicPaid = profit - nicFree;
            secondNicPaid = firstNicPaid - firstNicEnd;
            a = 9.73 / 100 * firstNicEnd;
            b = 2.73 / 100 * secondNicPaid;
            c4Nic = a + b;
        }
        return Math.ceil(c4Nic).toLocaleString();

    }

    function NIC() {
        totalNic = Math.ceil(c2Nic + c4Nic);
        return totalNic.toLocaleString();

    }
    function pensionContribution() {
        var pensionPaid = pensionValueChecker();

        pension = pensionPaid;
        return pension.toLocaleString();
    }
    function netPay() {
        var a = profit;
        var b = tax;
        var c = totalNic;
        var d = pension;

        net = a - b - c - d

        return Math.ceil(net).toLocaleString();

    }
    return (
        <div>
        <div className="resultOutput">

            <h2> Profit: {"£"+profitCalculator()} </h2>
            <p> Taxable Income: {"£"+taxableIncomeCalculator()}</p>
            <p> Tax to pay: {"£"+IncomeTax()}</p>
            <p> Class 2 NIC: {"£"+class2Nic()}</p>
            <p> Class 4 NIC: {"£"+class4Nic()}</p>
            <p> Total NIC contribution: {"£"+NIC()}</p>
            <p> Pension to pay: {"£"+pensionContribution()}</p>
            <h1> Net Pay: {"£"+netPay()}</h1>

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


        

export default SeOutput;


