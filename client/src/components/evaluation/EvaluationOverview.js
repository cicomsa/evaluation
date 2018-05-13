import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import {fetchStudent} from '../../actions/student'
import {login} from '../../actions/users'
import {Redirect} from 'react-router-dom'
import {Link} from 'react-router-dom'
import Button from 'material-ui/Button'
import {getEvaluations} from '../../actions/evaluations'
import {deleteEvaluation,fetchEvaluation,updateEvaluation } from '../../actions/evaluation'
import DeleteIcon from '@material-ui/icons/Delete'

class EvaluationOverview extends PureComponent {

  componentWillMount() {
     this.props.getEvaluations()
    if (this.props.student === null) this.props.fetchStudent(this.props.match.params.id)
    }

  deleteEvaluation = (evaluationId) => {
    this.props.deleteEvaluation(evaluationId)
  }

  render() {

    const { evaluations, authenticated, student} = this.props;
    if (!authenticated) return (
			<Redirect to="/login" />
    )

    if (!student) return null
           
    return (
     
      <div>

          <Button type="submit" variant="raised" className="backButton" onClick={()=>window.history.back()}>Back</Button> 
        
          <h2 style={{fontWeight:"bold"}}> All evaluations: </h2> 
          
          <p>-------------------</p>  
          <div>
          {evaluations
      .filter(evaluation => evaluation.studentNo === this.props.student.id).map(evaluation =>  (
            <div key={evaluation.id}>
              <p style={{textDecoration:"underline"}}>{evaluation.date}</p> 
              <img src={require(`../evaluation/colors/${evaluation.color+'.png'}`)} 
                alt="student" width="25"/>
              <li className="remark">{evaluation.remark}</li>
              <DeleteIcon onClick={()=> this.deleteEvaluation(evaluation.id)}/> 
              
              {console.log(() =>this.toggleEditEvaluation())}
              <div>
              <Link to={`/evaluations/${evaluation.id}`}>
              <Button type="submit" variant="raised">Edit details</Button>
              </Link> 
                <p>-------------------</p>  
              </div>
                 
              
            </div>
            ))}
            </div>

      </div>
      )
  }
}

const mapStateToProps = (state) => {
  return {
    evaluation: state.evaluation,
    evaluations: state.evaluations,
    authenticated: state.currentUser !== null,
    student: state.student
  }
}
     
export default connect(mapStateToProps, 
  {login, deleteEvaluation, getEvaluations, fetchEvaluation, updateEvaluation, fetchStudent})(EvaluationOverview)