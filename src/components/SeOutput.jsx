import React from "react";
import { grossValueChecker, ExpenseValueChecker, pensionValueChecker } from "./SelfEmployed";



var profit;
var incomeTaxable;
var tax;
var c2Nic;
var c4Nic;
var totalNic;
var pension;
var net;


function SeOutput() {


    function profitCalculator() {
        var totalIncome = grossValueChecker()
        var totalExpenses = ExpenseValueChecker()
        profit = totalIncome - totalExpenses;
        return profit;
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


        return incomeTaxable;

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

        return Math.ceil(tax);

    }

    function class2Nic() {
        var nicFree = 11908;
        if (profit > 6515 && profit > nicFree) {
            c2Nic = 3.05 * 52
        }
        else {
            c2Nic = 0
        }
        return Math.ceil(c2Nic);
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
        return Math.ceil(c4Nic);

    }

    function NIC() {
        totalNic = Math.ceil(c2Nic + c4Nic);
        return totalNic;

    }
    function pensionContribution() {
        var pensionPaid = pensionValueChecker();

        pension = pensionPaid;
        return pension;
    }
    function netPay() {
        var a = profit;
        var b = tax;
        var c = totalNic;
        var d = pension;

        net = a - b - c - d

        return Math.ceil(net);

    }
    return (
        <div>

            <h1> Profit: {profitCalculator()} </h1>
            <p> Taxable Income: {taxableIncomeCalculator()}</p>
            <p> Tax to pay: {IncomeTax()}</p>
            <p> Class 2 NIC: {class2Nic()}</p>
            <p> Class 4 NIC: {class4Nic()}</p>
            <p> Total NIC contribution: {NIC()}</p>
            <p> Pension to pay: {pensionContribution()}</p>
            <p> Net Pay: {netPay()}</p>




        </div>
    )
}

export default SeOutput;


