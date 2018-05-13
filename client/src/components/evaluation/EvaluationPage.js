import React, {PureComponent} from 'react'
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
 
  }

    updateStudent = (student) => {
      this.props.updateStudent(this.props.match.params.id, student)
      this.toggleEditStudent()
    }


  redirect = () => {
    return (<Redirect to={`/students/${this.props.student.id}/evaluation`}/>)}
  
  addEvaluation = (evaluation) => {

    evaluation.studentNo = this.props.student.id
    evaluation.batchNo = this.props.student.batchNo
    this.props.addEvaluation(evaluation) 
    
  }

  updateEvaluation = (evaluation) => {
    this.props.updateEvaluation(this.props.evaluations
      .filter(evaluation => evaluation.studentNo === this.props.student.id)
      .sort((a,b) => b.id-a.id)[0].id, evaluation)
    this.toggleEditEvaluation()
}


  render() {

    const { evaluations, authenticated, student} = this.props;
    if (!authenticated) return (
			<Redirect to="/login" />
    )

    if (!student) return null
   // if (!evaluation) return null

    const evaluationArray=evaluations
    .filter(evaluation => evaluation.studentNo === student.id)
    .sort((a,b) => b.id-a.id)
    const displayEvaluation = () => {
      if (evaluationArray[0]) { 
        return (
          <div>
            <p style={{textDecoration:"underline"}}>Color: </p>      
            <img src={require(`../evaluation/colors/${evaluationArray[0].color+'.png'}`)} 
              alt="student" width="25"/>
            <p style={{textDecoration:"underline"}}>Remark: </p>  
            <li className='overviewRemark'>{evaluationArray[0].remark}</li>
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

        { evaluations.filter(evaluation => evaluation.studentNo === student.id).length > 0 &&
        <div>
          <h1>Last evaluation overview</h1>
          {displayEvaluation()}
          <Link to={`/evaluations/student/${student.id}`}><Button variant="raised" type="submit" 
            >All evaluations</Button></Link>   

           </div>
        }
          <hr></hr>                                         
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