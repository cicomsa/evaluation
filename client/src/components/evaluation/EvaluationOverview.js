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
import {deleteEvaluation, fetchEvaluation } from '../../actions/evaluation'
import ClearIcon from '@material-ui/icons/Clear'
import {Link} from 'react-router-dom'

class EvaluationOverview extends PureComponent {

  state = {
    edit: false
  }

  toggleEdit = () => {
    this.setState({
      edit: !this.state.edit
    })
  }

  componentWillMount() {
     this.props.fetchEvaluation(this.props.params.id)
     this.props.fetchStudent(this.props.evaluation.studentNo)
     this.props.getEvaluations()
    }

    deleteEvaluation = (evaluationId) => {
      this.props.deleteEvaluation(evaluationId)
    }
  
  
    updateEvaluation = (evaluation) => {
      this.props.updateEvaluation(this.props.match.params.id, evaluation)
      this.toggleEdit()
  }

  render() {

    const { evaluation, authenticated, student, evaluations } = this.props;
    if (!authenticated) return (
			<Redirect to="/login" />
    )

    if (!student) return null

    const colorArray = evaluation
     
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

        {
      this.state.edit &&
      <div>
        <EvaluationForm initialValues={evaluation} onSubmit={this.updateEvaluation} />
        <ClearIcon onClick = {() => this.toggleEdit()}/>
      </div>
      }

      {
      !this.state.edit &&
      <div>
        <h1>Overview</h1>
        {displayEvaluation()}
        <Button variant="raised" type="submit" 
          onClick = {() => this.toggleEdit()}>Edit</Button>     
        
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
            <p>-------------------</p>                               
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
    evaluations: state.evaluations,
    evaluation: state.evaluation
  }
}
     
export default connect(mapStateToProps, 
  {login, deleteEvaluation, fetchStudent, fetchEvaluation, getEvaluations})(EvaluationOverview)
