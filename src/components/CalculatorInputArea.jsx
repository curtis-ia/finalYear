import React, { useState } from "react";
import LimitedCompany from "./LimitedCompany";
import UmbrellaCompany from "./UmbrellaCompany";
import SelfEmployed from "./SelfEmployed";
import SeOutput from "./SeOutput";
import { sendResult } from "./SelfEmployed";



var resultRetriever;

function CalculatorInputArea() {
    // console.log("fff", sendResult(), laugh)
    const [shower, setShower]= useState()
    
    const [displayCalculator, setCalculator] = useState("SelfEmployed");
    const [activeButton, setActiveButton] = useState("SelfEmployed");

    function DisplayLimitedCompany() {
        setCalculator("LimitedCompany");
        setActiveButton("LimitedCompany");

    }
    function DisplayUmbrellaCompany() {
        setCalculator("UmbrellaCompany");
        setActiveButton("UmbrellaCompany");
    }
    function DisplaySelfEmployed() {
        setCalculator("SelfEmployed");
        setActiveButton("SelfEmployed");
    }

        // function wawu(){
        //     laugh = sendResult();
        //     setShower(laugh); 
           
        // }
        // setInterval(wawu(), 1000);
    
    return (

        <div>

            <div className="card">
                <div className="top">
                    <button className={activeButton === "SelfEmployed" ? "active" : ""} onClick={DisplaySelfEmployed}> Self Employed </button>
                    <button className={activeButton === "LimitedCompany" ? "active" : ""} onClick={DisplayLimitedCompany}> Limited Company</button>
                    <button className={activeButton === "UmbrellaCompany" ? "active" : ""} onClick={DisplayUmbrellaCompany}> Umbrella Company </button>

                </div>
                <div className="bottom">

                    {displayCalculator === "SelfEmployed" && <SelfEmployed />}
                    {displayCalculator === "LimitedCompany" && <LimitedCompany />}
                    {displayCalculator === "UmbrellaCompany" && <UmbrellaCompany />}

                </div>
            </div>
            <div className="wicked">
               {/* {<SeOutput />}  */}
            </div>
        </div>
    )
}


export default CalculatorInputArea;