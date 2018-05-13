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
    edit: false
  }

  toggleEdit = () => {
    this.setState({
      edit: !this.state.edit
    })
  }

  componentWillMount() {

    this.props.getEvaluations()
    this.props.fetchStudent(this.props.match.params.id)
  }

    updateStudent = (student) => {
      this.props.updateStudent(this.props.match.params.id, student)
      this.toggleEdit()
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
      <Button type="submit" variant="raised" className="backButton" onClick={()=>window.history.back()}>Back</Button>
   
      {
       this.state.edit &&
       <div>
         <StudentForm initialValues={student} onSubmit={this.updateStudent} />
         <ClearIcon onClick = {() => this.toggleEdit()}/>
       </div>
      }

      {
       !this.state.edit &&
       <div>
          <h1>Student profile</h1>
          <img src={require(`../student/images-landscape/${student.photo}`)} 
            alt="student" width='200'/>
          <p style={{textDecoration:"underline"}}>{student.fullName}</p>     
           
          <Button variant="raised" type="submit" 
            onClick = {() => this.toggleEdit()}>Edit</Button>     
       </div>
      }

      <hr></hr> 

      {
      !colorArray?
       (
        <div>
          <EvaluationForm onSubmit={this.addEvaluation}/> 
          <hr></hr> 
        </div> 
        ):(
        colorArray.date !== new Date().toJSON().slice(0,10) && 
          <div>
            <EvaluationForm onSubmit={this.addEvaluation}/> 
            <hr></hr> 
          </div> 
        )          
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
  {login, addEvaluation, fetchStudent,  getEvaluations, updateStudent})(EvaluationPage)