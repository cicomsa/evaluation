import React from 'react'
import {lastEval} from './DisplayEvaluation'
import Button from 'material-ui/Button'

export const displayLastEvaluation = (evaluations, student) => {

    const displayEvaluation=lastEval(evaluations, student)

    return ( 
        evaluations
            .filter(evaluation => evaluation.studentNo === student.id).length > 0 &&
                <div>
                    <h1>Last evaluation overview</h1>
                    {displayEvaluation.lastEvaluation}
                    
                    <Button variant="raised" type="submit"
                        onClick={() => window.location=`/evaluations/student/${student.id}`}>
                            All evaluations  
                    </Button>
                      
                </div>        
    )   
}