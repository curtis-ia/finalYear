import React from "react";
import { grossValueChecker, inputChecker } from "./UmbrellaCompany";



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







function LcOutput() {

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
        return monthlyPayBeforeTaxes
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

        return Math.ceil(employerNi);

    }
    function Margin() {
        // set by company assumption of £45
        return companyMargin; 
    }
    function calcHolidays() {
        return holidays;
    }

    function apprenticeshipLevy() {
        // deduction of ni pension margin . gross - deduction /100 * 0.5 
        var deduction; 
        deduction = monthlyPayBeforeTaxes - employerNi - companyMargin - holidays;
        aLevy = deduction/100 * 0.5;

        return Math.ceil(aLevy); 
        
    }
   
    


    function preTaxDeduction() {
        var deduction; 
        deduction = monthlyPayBeforeTaxes - employerNi - companyMargin - holidays - aLevy;
        initialIncomeDisplay = deduction;
        return Math.ceil(initialIncomeDisplay);
    }

    function taxableIncomeCalculator() {
        var taxAllowance = 1047.5;
        var taxAllowanceMax = 10428.3;
        if (initialIncomeDisplay < taxAllowanceMax && initialIncomeDisplay > taxAllowance) {
            initialIncome = initialIncomeDisplay - taxAllowance;
        }
        else if (initialIncomeDisplay < taxAllowance) {
            initialIncome = 0;
        }
        else if (initialIncomeDisplay > taxAllowanceMax) {
            initialIncome = initialIncomeDisplay;
        }

console.log("wawu", initialIncome)
        return Math.ceil(initialIncome);

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
        return Math.ceil(cNic);

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

        return Math.ceil(tax);
    }
    function netMonthlyIncome() {
        var deduction = initialIncomeDisplay - tax - cNic;
        finalIncome = deduction;
        return Math.ceil(finalIncome);


    }

    // mini ouput 
    function perMonth() {
        var finalMonthlyIncome;
        finalMonthlyIncome = finalIncome; 
        console.log("check am ", finalMonthlyIncome)
        return Math.ceil(finalMonthlyIncome);

    }

    function perWeek() {
        
        finalWeeklyIncome = finalIncome / 4; 
       
        return Math.ceil(finalWeeklyIncome);

    }


    return (
        <div>
          
            <div>
            
            <h1> Monthly Income {grossMonth()} </h1>
            <p>Employers National Insurance {employerNI()}</p>
            <p>Company Margin: {Margin()}</p>
            <p>Holidays: {calcHolidays()}</p>
            <p>Apprenticeship Levy: {apprenticeshipLevy()}</p>
            <h1>Gross for Employee: {preTaxDeduction()} </h1>
            <h1>Taxable for Employee: {taxableIncomeCalculator()} </h1>
            <p>Employee National Insurance: {employeeNi()}</p>
            <p> Employee Tax: {employeeTax()}</p>
            <p> Total Net Income {netMonthlyIncome()}</p>
            </div>
            <div> 
            <h1> Mini Output </h1>
            <p>Per Week: {perWeek()}</p>
            <p>Per Month: {perMonth()}</p>
            
        
            </div>
        </div>
    )

}

export default LcOutput;
