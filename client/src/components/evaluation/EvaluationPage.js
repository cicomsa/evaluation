import React, {PureComponent} from 'react'
import {withStyles} from 'material-ui/styles'
import ClearIcon from '@material-ui/icons/Clear'
import {connect} from 'react-redux'
import {fetchStudent, updateStudent} from '../../actions/student'
import {login} from '../../actions/users'
import {Redirect} from 'react-router-dom'
import StudentForm from '../student/StudentForm'
import EvaluationForm from './EvaluationForm'
import Button from 'material-ui/Button'
import {Link} from 'react-router-dom'
import {addEvaluation, getEvaluations} from '../../actions/evaluations'
import {deleteEvaluation ,fetchEvaluation, updateEvaluation} from '../../actions/evaluation'
import DeleteIcon from '@material-ui/icons/Delete'

class EvaluationPage extends PureComponent {

  state = {
    editStudent: false,
    editEvaluation:false
  }

  toggleEditStudent = () => {
    this.setState({
      editStudent: !this.state.editStudent,
    
    })
  }

  toggleEditEvaluation = () => {
    this.setState({
     
      editEvaluation: !this.state.editEvaluation
    })
  }

  componentWillMount() {

    this.props.getEvaluations()
    this.props.fetchStudent(this.props.match.params.id)
    this.props.fetchEvaluation(this.props.match.params.id)
  }

  updateStudent = (student) => {
    this.props.updateStudent(this.props.match.params.id, student)
    this.toggleEditStudent()
  }

  updateEvaluation = (evaluation) => {
    this.props.updateEvaluation(this.props.evaluations
      .filter(evaluation => evaluation.studentNo === this.props.student.id).length - 1, evaluation)
    this.toggleEditEvaluation()
  }

  deleteEvaluation = (evaluationId) => {
    this.props.deleteEvaluation(evaluationId)
  }



  redirect = () => {
    return (<Redirect to={`/students/${this.props.student.id}/evaluation`}/>)}
  
  addEvaluation = (evaluation) => {

    evaluation.studentNo = this.props.student.id
    evaluation.batchNo = this.props.student.batchNo
    this.props.addEvaluation(evaluation) 
    
  }


  render() {

    const { evaluations, authenticated, student, evaluation } = this.props;
    if (!authenticated) return (
			<Redirect to="/login" />
    )

    if (!student) return null
    //if (!evaluation) return null

    const evaluationArray = evaluations
    .filter(evaluation => evaluation.studentNo === student.id)
    .length-1

  const displayEvaluation = () => {
    if (evaluationArray) { 
      return (
        <div>
          <p style={{textDecoration:"underline"}}>Last evaluation color: </p>      
          {evaluations.color?<img src={require(`../evaluation/colors/${evaluation.color+'.png'}`)} 
              alt="student" width="25"/>:''}
          <p style={{textDecoration:"underline"}}>Last evaluation remark: </p>  
          <li className='overviewRemark'>{evaluations.sort((a,b) => b.id-a.id)[0].remark}</li>
        </div>
      )
    }
    return <p style={{color:"red"}} >pending evaluation...</p>   
  }
   
    return (
     
      <div>
      <Button type="submit" variant="raised" className="backButton" onClick={()=>window.history.back()}>Back</Button>
   
      {
       this.state.editStudent &&
       <div>
         <StudentForm initialValues={student} onSubmit={this.updateStudent} />
         <ClearIcon onClick = {() => this.toggleEditStudent()}/>
       </div>
      }

      {
       !this.state.editStudent &&
       <div>
          <h1>Student profile</h1>
          <img src={require(`../student/images-landscape/${student.photo}`)} 
            alt="student" width='200'/>
          <p style={{textDecoration:"underline"}}>{student.fullName}</p>     
           
          <Button variant="raised" type="submit" 
            onClick = {() => this.toggleEditStudent()}>Edit</Button>     
       </div>
      }

      <hr></hr> 

      {
      !evaluationArray[0]?
       (
        <div>
          <EvaluationForm onSubmit={this.addEvaluation}/> 
          <hr></hr> 
        </div> 
        ):(
        evaluationArray[0].date !== new Date().toJSON().slice(0,10) && 
          <div>
            <EvaluationForm onSubmit={this.addEvaluation}/> 
            <hr></hr> 
          </div> 
        )          
      }   
      
      {
      this.state.editEvaluation &&
      <div>
        <EvaluationForm initialValues={evaluation} onSubmit={this.updateEvaluation} />
        <ClearIcon onClick = {() => this.toggleEditEvaluation()}/>
      </div>
      }

      {
      !this.state.editEvaluation && evaluations.length > 0 &&
      <div>
        <h1>Overview</h1>
        {displayEvaluation()}
        <Button variant="raised" type="submit" 
          onClick = {() => this.toggleEditEvaluation()}>Edit</Button>     
        
        <hr></hr>

        <h2 style={{fontWeight:"bold"}}> All evaluations: </h2> 
        {evaluations.filter(evaluation => evaluation.studentNo === student.id)
        .map(evaluation =>  (
         <div key={evaluation.id}>
            <p style={{textDecoration:"underline"}}>{evaluation.date}</p> 
            <img src={require(`../evaluation/colors/${evaluation.color+'.png'}`)} 
              alt="student" width="25"/>
            <li className="remark">{evaluation.remark}</li>
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
  {login, addEvaluation, fetchStudent,  fetchEvaluation, getEvaluations, updateStudent, deleteEvaluation, updateEvaluation})(EvaluationPage)