import React from "react";
import { grossValueChecker, inputChecker } from "./UmbrellaCompany";
import { useRef } from 'react';



var grossIncomeData;
var monthlyPayBeforeTaxes;
var employerNi;
const holidays = 0;
const companyMargin = 45;
var aLevy;
var initialIncomeDisplay;
var initialIncome;
var tax;
var cNic;
var finalIncome;
var finalMonthlyIncome;
var finalWeeklyIncome;







function UcOutput() {
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


    function initialisation() {
        var checker = inputChecker()
        var g = grossValueChecker();
        if (checker === "perHour") {
            grossIncomeData = g * 8
        }
        else if (checker === "perDay") {
            grossIncomeData = g;
        }
    
        return grossIncomeData;
    }


    function grossMonth() {
        initialisation()
        monthlyPayBeforeTaxes = grossIncomeData * 22;
        console.log( grossIncomeData)
        return monthlyPayBeforeTaxes.toLocaleString()
    }

    function employerNI() {
        var eNIMin = 758.01;
        var deduction;
        if (monthlyPayBeforeTaxes < eNIMin) {
            employerNi = 0
        }
        else if (monthlyPayBeforeTaxes > eNIMin) {
            deduction = monthlyPayBeforeTaxes - eNIMin;
            employerNi = deduction / 100 * 13.8

        }

        return Math.ceil(employerNi).toLocaleString();

    }
    function Margin() {
        // set by company assumption of £45
        return companyMargin.toLocaleString(); 
    }
    function calcHolidays() {
        return holidays.toLocaleString();
    }

    function apprenticeshipLevy() {
        // deduction of ni pension margin . gross - deduction /100 * 0.5 
        var deduction; 
        deduction = monthlyPayBeforeTaxes - employerNi - companyMargin - holidays;
        aLevy = deduction/100 * 0.5;

        return Math.ceil(aLevy).toLocaleString(); 
        
    }
   
    


    function preTaxDeduction() {
        var deduction; 
        deduction = monthlyPayBeforeTaxes - employerNi - companyMargin - holidays - aLevy;
        initialIncomeDisplay = deduction;
        return Math.ceil(initialIncomeDisplay).toLocaleString();
    }

    function taxableIncomeCalculator() {
        var taxAllowance = 1047.5;
        var taxAllowanceMax = 10428.3;
        if (initialIncomeDisplay < taxAllowanceMax && initialIncomeDisplay > taxAllowance) {
            initialIncome = initialIncomeDisplay - taxAllowance;
            console.log("wawu" , initialIncomeDisplay, initialIncome, taxAllowance)
        }
        else if (initialIncomeDisplay < taxAllowance) {
            initialIncome = 0;
        }
        else if (initialIncomeDisplay > taxAllowanceMax) {
            initialIncome = initialIncomeDisplay;
        }

console.log("wawu", initialIncome)
        return Math.ceil(initialIncome).toLocaleString();

    }

    function employeeNi() {
        //// 13.25%
        var nicFree = 992.3;
        var firstNicPaid;
        var firstNicEnd = 4189;
        var secondNicPaid;
        var a;
        var b;
        if (initialIncomeDisplay <= nicFree) {
            cNic = 0

        }
        else if (initialIncomeDisplay> nicFree && initialIncomeDisplay <= firstNicEnd) {
            firstNicPaid = initialIncomeDisplay - nicFree;
            cNic = 9.73 / 100 * firstNicPaid;
        }
        else if (initialIncomeDisplay > firstNicEnd) {
            firstNicPaid = initialIncomeDisplay - nicFree;
            secondNicPaid = firstNicPaid - firstNicEnd;
            a = 9.73 / 100 * firstNicEnd;
            b = 2.73 / 100 * secondNicPaid;
            cNic = a + b;
        }
        return Math.ceil(cNic).toLocaleString();

    }
    function employeeTax() {
        var taxAllowance = 1047.5;
        var firstTaxPaid;
        var firstTaxEnd = 4189.25;
        var secondTaxPaid;
        var secondTaxEnd = 12500;
        var thirdTaxPaid;



        if (initialIncome > 0 && initialIncome <= firstTaxEnd) {
            tax = (20 / 100) * initialIncome;
            console.log(tax, "hidff" , initialIncome)
        }
        else if (initialIncome > firstTaxEnd && initialIncome <= secondTaxEnd) {
            firstTaxPaid = initialIncome - firstTaxEnd;
            var a = (20 / 100) * firstTaxEnd;
            var b = (40 / 100) * firstTaxPaid;

            tax = a + b
            console.log(a, b, "yo")
        }
        else if (initialIncome > secondTaxEnd) {
            firstTaxPaid = initialIncome - firstTaxEnd;
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
    function netMonthlyIncome() {
        var deduction = initialIncomeDisplay - tax - cNic;
        finalIncome = deduction;
        return Math.ceil(finalIncome).toLocaleString();


    }

    // mini ouput 
    function perMonth() {
        var finalMonthlyIncome;
        finalMonthlyIncome = finalIncome; 
        console.log("check am ", finalMonthlyIncome)
        return Math.ceil(finalMonthlyIncome).toLocaleString();

    }

    function perWeek() {
        
        finalWeeklyIncome = finalIncome / 4; 
       
        return Math.ceil(finalWeeklyIncome).toLocaleString();

    }


    return (
        <> 
        <div className="resultOutput">
          
            <div>
            
            <h2> Monthly Income {"£"+grossMonth()} </h2>
            <p>Employers National Insurance {"£"+employerNI()}</p>
            <p>Company Margin: {"£"+Margin()}</p>
            <p>Holidays: {"£"+calcHolidays()}</p>
            <p>Apprenticeship Levy: {"£"+apprenticeshipLevy()}</p>
            <h3>Gross for Employee: {"£"+preTaxDeduction()} </h3>
            <h4>Taxable for Employee: {"£"+taxableIncomeCalculator()} </h4>
            <p>Employee National Insurance: {"£"+employeeNi()}</p>
            <p> Employee Tax: {"£"+employeeTax()}</p>
            <p className="toBeHidden"> Total Net Income {"£"+netMonthlyIncome()}</p>
            </div>
            <div> 
            <div className="bottomResultInfo"></div>
            <h2 className="headerUmbrella"> Net Pay </h2>
            <table>
            <tr>
            <td>
            <h1>Per Week: {"£"+perWeek()}</h1>
            </td> 
            <td>
            <h1>Per Month: {"£"+perMonth()}</h1>
            </td>
            </tr>
            </table>
            
        
            </div>
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
</>
  )
    
}


export default UcOutput;
