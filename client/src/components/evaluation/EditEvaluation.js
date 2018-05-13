import React, {PureComponent} from 'react';
import {withStyles} from 'material-ui/styles';
import IconButton from 'material-ui/IconButton'
import {connect} from 'react-redux'
import {getStudents} from '../../actions/students'

import {login} from '../../actions/users'
import {Redirect} from 'react-router-dom'
import {Link} from 'react-router-dom'
import DeleteIcon from '@material-ui/icons/Delete'
// import StudentsGrid from './StudentsGrid'
import Button from 'material-ui/Button'
import {fetchEvaluation,updateEvaluation} from '../../actions/evaluation'
import ClearIcon from '@material-ui/icons/Clear'
// import PercentageBar from './PercentageBar';
import GridList, { GridListTile, GridListTileBar } from 'material-ui/GridList'
import EvaluationForm from './EvaluationForm'
import {fetchStudent} from '../../actions/student'
import {fetchBatch} from '../../actions/batch'

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
  
    // this.props.fetchStudent(this.props.evaluation.studentNo)
    this.props.fetchEvaluation(this.props.match.params.id)
    }

  updateEvaluation = (evaluation) => {
    this.toggleEdit()
    this.props.updateEvaluation(this.props.match.params.id, evaluation)   
  }

  render() {

    const { students, authenticated, classes, student, evaluation } = this.props;
    if (!authenticated) return (
			<Redirect to="/login" />
    )
    
    if (!evaluation) return null

    return (
      <div>

 
        <Button type="submit" variant="raised" className="backButton" onClick={()=>window.history.back()}>Back</Button> 
        
        {/* <h1>Student profile</h1>
        <img src={require(`../student/images-landscape/${student.photo}`)} 
          alt="student" width='200'/>
        <p style={{textDecoration:"underline"}}>{student.fullName}</p>  */}

        {
        this.state.edit &&
        <div>
          <EvaluationForm initialValues={evaluation} onSubmit={this.updateEvaluation} />
          <ClearIcon onClick = {() => this.toggleEdit()}/>
        </div>
        }
        
        { !this.state.edit &&
        <div>
           <div>
           <p style={{textDecoration:"underline"}}>{evaluation.date}</p> 
            <p style={{textDecoration:"underline"}}>Color: </p>      
            <img src={require(`../evaluation/colors/${evaluation.color+'.png'}`)} 
              alt="student" width="25"/>
            <p style={{textDecoration:"underline"}}>Remark: </p>  
            <li className='overviewRemark'>{evaluation.remark}</li>
          </div>
          
          <Button type="submit" variant="raised" className="backButton" onClick={()=>this.toggleEdit()}>Edit evaluation</Button> 
        
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
