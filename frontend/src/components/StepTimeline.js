import React, { Fragment } from 'react'
import { useSelector} from "react-redux"

export default function StepTimeline() {

    const {currentStep} = useSelector(state=>state.currentStep)

   
    return (
        <Fragment>
        <div className="timeline">
            <div className={currentStep >= 1 ? "line orange" : "line"}></div>
            <div className={currentStep >= 2 ? "line orange" : "line"}></div>
            <div className={currentStep >= 3 ? "line orange" : "line"}></div>
            <div className={currentStep >= 4 ? "line orange" : "line"}></div> 
        </div>
        <div className="word-timeline">
            <div className={currentStep >= 1 ? "word-line orange" : "word-line"}>Login</div>
            <div className={currentStep >= 2 ? "word-line orange" : "word-line"}>Shipping</div>
            <div className={currentStep >= 3 ? "word-line orange" : "word-line"}>Method</div>
            <div className={currentStep >= 4 ? "word-line orange" : "word-line"}>Payment</div>
        </div>
        </Fragment>
    )
}
