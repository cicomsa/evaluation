import React, {PureComponent} from 'react';
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import BatchForm from '../batch/BatchForm'
import StudentForm from '../student/StudentForm'
import {batchInfo} from './BatchInfo'
import {studentsGrid} from '../student/StudentsGrid'
import {percentageBar} from '../logic/PercentageBar'
import {studentQuestion} from '../logic/AskQuestion'
import {login} from '../../actions/users'
import {fetchBatch,updateBatch} from '../../actions/batches'
import {getStudents, addStudent, deleteStudent} from '../../actions/students'
import {getBatchEvaluations} from '../../actions/evaluations'
import {percentageAndAkQuestionStyles} from '../styles'
import '../cssFile.css'
import {withStyles} from 'material-ui/styles';
import Button from 'material-ui/Button'

class StudentPage extends PureComponent {

  state = {
    edit: false
  }

  toggleEdit = () => {
    this.setState({
      edit: !this.state.edit
    })
  }

  componentWillMount() {
    if (this.props.authenticated) {
      this.props.getStudents(this.props.match.params.id)
      this.props.fetchBatch(this.props.match.params.id)
      this.props.getBatchEvaluations(this.props.match.params.id)
      }
    }

  addStudent = (student) => {
    student.batchId = this.props.batch.id
    this.props.addStudent(student)
  }

  deleteStudent = (studentId) => {
    this.props.deleteStudent(studentId)
  }

  updateBatch = (batch) => {
    this.toggleEdit()
    this.props.updateBatch(this.props.match.params.id, batch)
  }

  render() {

    const {students, authenticated, classes, batch, evaluations} = this.props
    if (!authenticated) return (
			<Redirect to="/login" />
		)

    if (!batch) return null

    return (
      <div>

        <Button 
          type="submit" 
          variant="raised" 
          className={classes.button}
          onClick={()=>window.history.back()}
          >Back
        </Button>

        { this.state.edit &&
          <BatchForm initialValues={batch} onSubmit={this.updateBatch.bind(this)}/>         
        }

        { !this.state.edit &&
          <div>
            {batchInfo(batch) }
            <Button type="submit" variant="raised" className="backButton" onClick={()=>this.toggleEdit()}>Edit</Button>
         </div>
        }
        <hr/>
        <StudentForm onSubmit={this.addStudent}/>
        <hr/>
        {percentageBar(classes, students, evaluations)} 
        {studentQuestion(classes, evaluations, students)}       
        <br/>
        {studentsGrid(students, evaluations, classes, this.deleteStudent)}

      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    students: state.students,
    batch: state.batch,
    authenticated: state.currentUser !== null,
    evaluations: state.evaluations
  }
}

export default withStyles(percentageAndAkQuestionStyles)(connect(mapStateToProps,
  {getStudents, login, addStudent, deleteStudent, fetchBatch, updateBatch, 
  getBatchEvaluations})(StudentPage))
