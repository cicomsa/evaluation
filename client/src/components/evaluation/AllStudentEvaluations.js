import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {login} from '../../actions/users'
import {fetchStudent} from '../../actions/students'
import {deleteEvaluation,updateEvaluation, 
  getStudentEvaluations } from '../../actions/evaluations'
import Button from 'material-ui/Button'
import DeleteIcon from '@material-ui/icons/Delete'

class EvaluationOverview extends PureComponent {

  componentWillMount() {
    if (this.props.authenticated) {
      this.props.getStudentEvaluations(this.props.match.params.id)
      if (this.props.student === null) 
        this.props.fetchStudent(this.props.match.params.id)
      }
    }

  deleteEvaluation = (evaluationId) => {
    this.props.deleteEvaluation(evaluationId)
  }

  render() {

    const {evaluations, authenticated, student} = this.props;
    if (!authenticated) return (
			<Redirect to="/login" />
    )
    if (!student) return null
       
    return (
     
      <div>

        <Button type="submit" 
          variant="raised"
          style={{marginTop: 7}}
          onClick={()=>window.history.back()}>
          Back
        </Button> 
      
        <h1 style={{marginBottom: '3px'}}> 
          All evaluations 
        </h1> 
        
        {evaluations.length > 0? 
          (<div>
            {evaluations
              .filter(evaluation => evaluation.studentNo === this.props.student.id)
              .map(evaluation =>  (
                <div key={evaluation.id}>               
                  <p style={{textDecoration:'underline'}}>{evaluation.date}</p>                
                  <img src={require(`../images/colors/${evaluation.color+'.png'}`)} 
                    alt="student" width="25"/>
                  <li className="remark">{evaluation.remark}</li>               
                  <DeleteIcon 
                    style={{marginBottom: "12px"}}
                    onClick={()=> this.deleteEvaluation(evaluation.id)}/>
                  <br/> 
                  <Button 
                    type="submit"   
                    variant="raised"
                    style={{marginBottom: "-3px"}}
                    onClick={() => window.location=`/evaluations/${evaluation.id}`}>
                    Edit details
                  </Button>                
                  <p>-------------------</p>                          
                </div>
              ) 
            )}
          </div>
          ):(
          <p style={{color:"red"}}>pending evaluations...</p>
          )
        }

      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    evaluations: state.evaluations,
    authenticated: state.currentUser !== null,
    student: state.student
  }
}
     
export default connect(mapStateToProps, {login, 
  deleteEvaluation, getStudentEvaluations, 
  updateEvaluation, fetchStudent})(EvaluationOverview)