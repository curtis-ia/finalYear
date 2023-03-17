import React from "react";
import { grossValueChecker,  salaryChecker, ExpenseValueChecker } from "./LimitedCompany";

var totalRevenue;
var profit;
var salary; 
var totalExpenditure; 
var expenses;
var incomeTaxable;
var employerNi;
var net;


function LcOutput() {


function annualRevenue(){
    var totalIncome = grossValueChecker()
    totalRevenue = totalIncome;
    return totalRevenue;
}

    function totalSalary(){
        var totalSalary = salaryChecker();
        salary = totalSalary; 
return salary;
        
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
        
        return Math.ceil(employerNi);
        
    }

    function companyExpenses(){
         expenses = ExpenseValueChecker()
         console.log(employerNi)
         return expenses
        
    }

    function totalExpenses(){
        totalExpenditure = salary + employerNi + expenses;
        console.log (totalExpenditure, totalRevenue, salary, employerNi, expenses)
        return Math.ceil(totalExpenditure);
    }

    function annualProfit(){

        profit = totalRevenue - totalExpenditure;

        return Math.ceil(profit);

    }

    function coorperationTax(){
        incomeTaxable = profit/100 * 19;

        return Math.ceil(incomeTaxable);
    }
    function NetDividend(){
        net = profit - incomeTaxable;
        return Math.ceil(net);
    }

    return (
        <div>
            <h1> Annual Revenue: {"£" + annualRevenue()} </h1>
            <p> salary : {"£" + totalSalary()}</p>
            <p> Employers NI : {"£" + employersNi()}</p>
            <p> Schdule E expenses : {"£" + companyExpenses()}</p>
            <p> Total Expenditure: {"£" + totalExpenses()}</p>
            <p> Profit before taxes: {"£" + annualProfit()}</p>
            <p> Corporation tax: {"£" + coorperationTax()}</p>
            <p> Net profit after Taxes: {"£" + NetDividend()}</p>


        </div>
    )
    
}

export default LcOutput;