import React, {PureComponent} from 'react';
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import EvaluationForm from './EvaluationForm'
import {login} from '../../actions/users'
import {getStudents, fetchStudent} from '../../actions/students'
import {fetchEvaluation,updateEvaluation} from '../../actions/evaluations'
import {withStyles} from 'material-ui/styles';
import Button from 'material-ui/Button'
import ClearIcon from '@material-ui/icons/Clear'

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 830,
    height: 570
  },
  icon: {
    marginRight:30,
    size: 30
  }
})

class EditEvaluation extends PureComponent {

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
      this.props.fetchEvaluation(this.props.match.params.id)
      }
    }
    
  updateEvaluation = (evaluation) => {
    this.toggleEdit()
    this.props.updateEvaluation(this.props.match.params.id, evaluation)   
  }

  render() {

    const {authenticated, evaluation} = this.props;
    if (!authenticated) return (
			<Redirect to="/login" />
    )
    
    if (!evaluation) return null

    return (
      <div>
 
        <Button 
          type="submit" 
          variant="raised" 
          style={{marginTop:'7px'}} 
          onClick={()=>window.history.back()}>
          Back
        </Button> 

        {
        this.state.edit &&
        <div>
          <EvaluationForm initialValues={evaluation} 
            onSubmit={this.updateEvaluation} />
          <ClearIcon onClick = {() => this.toggleEdit()}/>
        </div>
        }
        
        { !this.state.edit &&
        <div>
          <div>
            <h1 style={{marginBottom: "15px"}}>Evaluation</h1>
            <p>- {evaluation.date} -</p> 
            <p style={{textDecoration:"underline"}}>Color: </p>      
            <img src={require(`../images/colors/${evaluation.color+'.png'}`)} 
              alt="student" width="25"/>
            <p style={{textDecoration:"underline"}}>Remark: </p>  
            <li className='overviewRemark'>{evaluation.remark}</li>
          </div>
          
          <Button 
            type="submit" 
            variant="raised" 
            onClick={()=>this.toggleEdit()}>
            Edit evaluation
          </Button> 
        
        </div>
        }

      </div>
      )
  }
}

const mapStateToProps = (state) => {
  return {
    students: state.students,
    student: state.student,
    batch: state.batch,
    authenticated: state.currentUser !== null,  
    evaluation:state.evaluation
  }
}
     
export default withStyles(styles)(connect(mapStateToProps, 
  {getStudents, login, fetchEvaluation, fetchStudent, updateEvaluation})(EditEvaluation))
