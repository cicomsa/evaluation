import React, {PureComponent} from 'react'
import {withStyles} from 'material-ui/styles'
import DeleteIcon from '@material-ui/icons/Delete'
import {connect} from 'react-redux'
import {fetchStudent} from '../../actions/student'
import {login} from '../../actions/users'
import {Redirect} from 'react-router-dom'
//import StudentForm from '../student/StudentForm'
import EvaluationForm from './EvaluationForm'
import Button from 'material-ui/Button'
 import {getEvaluations} from '../../actions/evaluations'
import {deleteEvaluation } from '../../actions/evaluation'

class EvaluationOverview extends PureComponent {

  componentWillMount() {
     this.props.getEvaluations()
     this.props.fetchStudent(this.props.student.id)
    }

  deleteEvaluation = (evaluationId) => {
    this.props.deleteEvaluation(evaluationId)
  }

  render() {

    const { evaluations, authenticated, student } = this.props;
    if (!authenticated) return (
			<Redirect to="/login" />
    )

    if (!student) return null

    const colorArray = evaluations
      .filter(evaluation => evaluation.studentNo === student.id)
      .sort((a,b) => b.id-a.id)[0]

    const displayEvaluation = () => {
      if (colorArray) { 
        return (
          <div>
            <p style={{textDecoration:"underline"}}>Yesterday's color: </p>      
            <img src={require(`../evaluation/colors/${colorArray.color+'.png'}`)} 
              alt="student" width="25"/>
            <p style={{textDecoration:"underline"}}>Yesterday's remark: </p>  
            <li className='overviewRemark'>{evaluations.sort((a,b) => b.id-a.id)[0].remark}</li>
          </div>
        )
      }
      return <p style={{color:"red"}} >pending evaluation...</p>   
    }
  
    return (
     
      <div>
{console.log(evaluations
          .filter(evaluation => evaluation.studentNo === student.id)
          .map(evaluation =>evaluation.color))}
        {
        evaluations.length > 0 &&
        <div>
          <h1>Overview</h1>
          {displayEvaluation()}    
          
          <hr></hr>

          <h2 style={{fontWeight:"bold"}}> All evaluations: </h2> 
          {evaluations
          .filter(evaluation => evaluation.studentNo === student.id)
          .map(evaluation =>  (
            <div key={evaluation.id}>
              <p style={{textDecoration:"underline"}}>{evaluation.date}</p> 
              <img src={require(`../evaluation/colors/${evaluation.color+'.png'}`)} 
                alt="student" width="25"/>
              <li className="remark">{evaluation.remark}</li>
              <DeleteIcon onClick={()=> this.deleteEvaluation(evaluation.id)}/>
              <p> -------------------- </p>
            </div>
            ))}  

        </div>
        }          
      
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    student: state.student,
    authenticated: state.currentUser !== null,
    evaluations: state.evaluations
  }
}
     
export default connect(mapStateToProps, 
  {login, deleteEvaluation, fetchStudent, getEvaluations, deleteEvaluation})(EvaluationOverview)
