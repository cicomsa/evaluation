import React from 'react'

export const lastEval = (evaluations, student) => {
  
  const evaluationArray = evaluations
    .filter(evaluation => evaluation.studentNo === student.id)
    .sort((a,b) => b.id-a.id)

  const displayEval = (evaluationArray) => {
    if (evaluationArray[0]) { 
      return (
        <div>
          <p style={{textDecoration:"underline"}}>Color: </p>      
          <img src={require(`../images/colors/${evaluationArray[0].color+'.png'}`)} 
            alt="student" width="25"/>
          <p style={{textDecoration:"underline"}}>Remark: </p>  
          <li className='overviewRemark'>{evaluationArray[0].remark}</li>
        </div>
      )
    }
    return <p style={{color:"red"}} >pending evaluation...</p>   
  }
 
  return {
    evaluationArray: evaluationArray,
    lastEvaluation: displayEval(evaluationArray)
  }
}