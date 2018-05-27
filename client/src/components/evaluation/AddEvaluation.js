import React from 'react'
import EvaluationForm from './EvaluationForm'

export const addTodaysEvaluation = (displayEvaluation, addEvaluation) => {
    return (
    !displayEvaluation.evaluationArray[0]?
        (
            <div>
                <EvaluationForm onSubmit={addEvaluation}/> 
                <hr></hr> 
            </div> 
            ):(
            displayEvaluation
                .evaluationArray[0].date !== new Date().toJSON().slice(0,10) && 
                    <div>
                    <EvaluationForm onSubmit={addEvaluation}/> 
                    <hr></hr> 
            </div> 
        )  
    )        
}