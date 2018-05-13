import React, {PureComponent} from 'react';
import {withStyles} from 'material-ui/styles';
import IconButton from 'material-ui/IconButton'
import {connect} from 'react-redux'
import {getStudents, addStudent} from '../../actions/students'
import {deleteStudent} from '../../actions/student'
import {login} from '../../actions/users'
import {Redirect} from 'react-router-dom'
// import BatchForm from '../batch/BatchForm';
import StudentForm from './StudentForm'
import {Link} from 'react-router-dom'
import DeleteIcon from '@material-ui/icons/Delete'
// import StudentsGrid from './StudentsGrid'
import Button from 'material-ui/Button'
import {fetchBatch,updateBatch} from '../../actions/batch'
//import ClearIcon from '@material-ui/icons/Clear'
import PercentageBar from './PercentageBar';
import GridList, { GridListTile, GridListTileBar } from 'material-ui/GridList'
import BatchForm from '../batch/BatchForm'
import {getEvaluations} from '../../actions/evaluations'

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
    this.props.getStudents()
    this.props.fetchBatch(this.props.match.params.id)
    this.props.getEvaluations()
    }

  addStudent = (student) => {
    student.batchNo = this.props.batch.id
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

    const { students, authenticated, classes, batch, evaluations } = this.props;
    if (!authenticated) return (
			<Redirect to="/login" />
    )
    
    if (!batch) return null
  
    return (
      <div>


        <Button type="submit" variant="raised" className="backButton" onClick={()=>window.history.back()}>Back</Button> 
        { this.state.edit &&
          <BatchForm initialValues={batch} onSubmit={this.updateBatch.bind(this)}/>
        }
        { !this.state.edit &&
        <div>
          <p> Number: {batch.batchNumber}</p>
          <p> Start Date: {batch.startDate}</p>
          <p> End Date: {batch.endDate}</p>
          <br/>
          
          <Button type="submit" variant="raised" className="backButton" onClick={()=>this.toggleEdit()}>Edit</Button> 
        
        </div>
        }

          <StudentForm onSubmit={this.addStudent}/>
          <hr></hr>
          <PercentageBar/>
        {console.log(evaluations
            .filter(evaluation => evaluation.batchNo === batch.id)
            .map(evaluation => evaluation.color))}
          <br></br> 
          <div className={classes.root}> 
      
            <GridList cellHeight={280} className={classes.gridList}>
              
            )}

              { students
              .filter(student =>student.batchNo === batch.id)
              .map(student => (
              <GridListTile key={student.id}>
                  <Link to={`/students/${student.id}`}><img src={require(`./images-landscape/${student.photo}`)} alt="student" width='500'/></Link>
                  <GridListTileBar
                  title={student.fullName}
                  subtitle= {this.props.evaluations? 
                      this.props.evaluations
                      .filter(evaluation => evaluation.studentNo === student.id)
                      .map(evaluation => 
                        <img key={evaluation.id} src={require(`../evaluation/colors/${(evaluation.color)? evaluation.color+'.png': "blue.png"}`)} 
                        alt="student" width="25"/>):''}

                  actionIcon={
                    <IconButton className={classes.button}  aria-label="Delete">
                      <DeleteIcon style={{color: 'white'}} onClick={()=> this.deleteStudent(student.id)}/>
                    </IconButton>                 
                  }
                  />
                </GridListTile>
                ))}
            </GridList>   
        </div>
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
     
export default withStyles(styles)(connect(mapStateToProps, 
  {getStudents, login, addStudent, deleteStudent, fetchBatch,updateBatch, getEvaluations})(StudentPage))
