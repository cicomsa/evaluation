import React from 'react'
import {Link} from 'react-router-dom'
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
                    <Link to={`/evaluations/student/${student.id}`}>
                        <Button variant="raised" 
                        type="submit" 
                        >All evaluations
                        </Button>
                    </Link>   
                </div>        
    )   
}