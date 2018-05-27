import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import StudentForm from '../student/StudentForm'
import {lastEval} from '../evaluation/DisplayEvaluation'
import {displayLastEvaluation} from '../evaluation/LastEvaluation'
import {addTodaysEvaluation} from '../evaluation/AddEvaluation'
import {login} from '../../actions/users'
import {fetchStudent, updateStudent} from '../../actions/students'
import {addEvaluation, getStudentEvaluations} from '../../actions/evaluations'
import ClearIcon from '@material-ui/icons/Clear'
import Button from 'material-ui/Button'

class EvaluationPage extends PureComponent {

  state = {
    editStudent: false,
  }

  toggleEditStudent = () => {
    this.setState({
      editStudent: !this.state.editStudent 
    })
  }

  componentWillMount() {
    if (this.props.authenticated) {
      this.props.getStudentEvaluations(this.props.match.params.id)
      this.props.fetchStudent(this.props.match.params.id)
    }
 
  }

  updateStudent = (student) => {
    this.props.updateStudent(this.props.match.params.id, student)
    this.toggleEditStudent()
  }
  
  addEvaluation = (evaluation) => {
    evaluation.studentNo = this.props.student.id
    evaluation.batchNo = this.props.student.batchId
    this.props.addEvaluation(evaluation)    
  }

  render() {

    const {evaluations, authenticated, student} = this.props;
    if (!authenticated) return (
			<Redirect to="/login" />
    )
    if (!student) return null
    const displayEvaluation = lastEval(evaluations, student)

    return ( 
          
      <div>

        <Button type="submit" 
          variant="raised" 
          style={{marginTop:'7px'}} 
          onClick={()=>window.history.back()}>
          Back
        </Button>
  
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
            <h1 className="studentProfile">Student profile</h1>
            <img src={require(`../images/images-landscape/${student.photo}`)} 
              alt="student" width='200'/>
            <p style={{textDecoration:"underline"}}>{student.fullName}</p>     
             
            <Button variant="raised" type="submit" 
              onClick = {() => this.toggleEditStudent()}>Edit</Button>     
         </div>
        }    
        <hr/>
        {addTodaysEvaluation(displayEvaluation, this.addEvaluation)}
        {displayLastEvaluation(evaluations, student)}  

      </div>     
    )
  }
}

const mapStateToProps = (state) => {
  return {
    student: state.student,
    authenticated: state.currentUser !== null, 
    evaluations: state.evaluations,
  }
}
     
export default connect(mapStateToProps, 
  {login, addEvaluation, fetchStudent, getStudentEvaluations, 
    updateStudent})(EvaluationPage)