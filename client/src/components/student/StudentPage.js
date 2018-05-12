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
import {fetchBatch} from '../../actions/batch'
//import ClearIcon from '@material-ui/icons/Clear'
// import PercentageBar from './PercentageBar';
import GridList, { GridListTile, GridListTileBar } from 'material-ui/GridList'

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

  componentWillMount() {
    this.props.getStudents()
    this.props.fetchBatch(this.props.match.params.id)
    }

  addStudent = (student) => {
    student.batchNo = this.props.batch.id
    this.props.addStudent(student)
  }

  deleteStudent = (studentId) => {
    this.props.deleteStudent(studentId)
  }

  render() {

    const { students, authenticated, classes, batch } = this.props;
    if (!authenticated) return (
			<Redirect to="/login" />

    )
    
    if (!batch) return null
  
    return (
      <div>

        <Button type="submit" variant="raised" className="backButton" onClick={()=>window.history.back()}>Back</Button> 
       
        <StudentForm onSubmit={this.addStudent}/>
        <hr></hr>
        {/* <PercentageBar/> */}
      
            <br></br> 
            <div className={classes.root}> 
       
             <GridList cellHeight={280} className={classes.gridList}>
                { students.map(student => (
                <GridListTile key={student.id}>
                    <Link to={`/students/${student.id}`}><img src={require(`./images-landscape/${student.photo}`)} alt="student" width='500'/></Link>
                    <GridListTileBar
                    title={student.fullName}
                      subtitle= {students.evaluation? students.evaluation.map(evaluation => 
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
  }
}
     
export default withStyles(styles)(connect(mapStateToProps, 
  {getStudents, login, addStudent, deleteStudent, fetchBatch})(StudentPage))
