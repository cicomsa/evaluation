import React, {PureComponent} from 'react'
import {withStyles} from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import {connect} from 'react-redux'
import {fetchBatch} from '../../actions/batch'
import {getEvaluations} from '../../actions/evaluations'
import Button from 'material-ui/Button'
import TextField from 'material-ui/TextField'
import {fetchStudent} from '../../actions/student'
import {getStudents} from '../../actions/students'
import {getBatches} from '../../actions/batches'
import {fetchEvaluation} from '../../actions/evaluation'

const styles = theme => ({
    root: theme.mixins.gutters({
      paddingTop: 16,
      paddingBottom: 16,
      marginTop: theme.spacing.unit * 3,
    })
  })

class PercentageBar extends PureComponent {

    componentWillMount() {
      if (this.props.batch === null) this.props.fetchBatch(this.props.match.params.id)
      this.props.getStudents()
      this.props.getEvaluations()   
    }
 
  render() {

    const { students, classes, student, evaluation, evaluations, batch, batches} = this.props;

    if (!batch) return null

    const allRed = []
    evaluations
    .filter(evaluation => evaluation.batchNo === batch.id)
    .map(evaluation => {
      if (evaluation.color.includes("red")) {
        return allRed.push("true")
      } else {
        return ''
      }
    })
    
    const allYellow = []
    evaluations
    .filter(evaluation => evaluation.batchNo === batch.id)
    .map(evaluation => {
      if (evaluation.color.includes("yellow")) {
        return allYellow.push("true")
      } else {
        return ''
      }
    })

    const allGreen = []
    evaluations
    .filter(evaluation => evaluation.batchNo === batch.id)
    .map(evaluation => {
      if (evaluation.color.includes("green")) {
        return allGreen.push("true")
      } else {
        return ''
      }
    })
    
    const sumColors = allRed.length + allGreen.length + allYellow.length

    const redPercentage = ((allRed.length / sumColors) * 100)
    const yellowPercentage = ((allYellow.length / sumColors) * 100)
    const greenPercentage = ((allGreen.length / sumColors) * 100)

    const studentsColors = evaluations
      .filter(evaluation => evaluation.batchNo === batch.id)
      .map(evaluation => evaluation.color)

    let studentsObject = {}
    students
      .filter(students => students.batchNo === batch.id)
        .map(student => student.fullName)
        .forEach((key, i) => studentsObject[key] = studentsColors[i]);

    //returns the names associated to the colors
    const askColor = (color) => {
      let studentName =[]
      let trashUndefined = []
        for (const key in studentsObject) {
          if (studentsObject.hasOwnProperty(key)) {
            
          if (studentsObject[key] === undefined) {
              trashUndefined.push('')           
          } else if (studentsObject[key].includes(color)) {
            studentName.push(key)
          }
        }
      }
        
        return studentName    
    }

    //returns a random color back
    const pickColor = () => {
      let random = Math.floor((Math.random() * 100));
      if (random <= 19) return 'green'                  
      if (random <= (28+19)) return 'yellow'
      if (random <= (28+19+53)) return 'red'   
    }

    const randomStudent = () => {
      let color = []
      color.push(pickColor())
      console.log(color)
      return askColor(color)[Math.floor((Math.random() * askColor(color).length))]            
    }
           
    return ( 
      <div>
      
        <Paper className={classes.root} elevation={4}>
        
          <Typography variant="headline" component="h3" style={{color:"green"}} >
          Green: {greenPercentage? greenPercentage.toFixed(2) : 0.00.toFixed(2)}%     
          </Typography>
      
          <Typography variant="headline" component="h3" style={{color:"#FFEA00"}}>
          Yellow: {yellowPercentage? yellowPercentage.toFixed(2) : 0.00.toFixed(2)}%
          </Typography>
      
          <Typography variant="headline" component="h3" style={{color:"red"}}>
          Red: {redPercentage? redPercentage.toFixed(2) : 0.00.toFixed(2)}%
          </Typography>
        
        </Paper> 
           
        <Paper className={classes.root} elevation={4}>

          
          <Typography variant="headline" component="h3" style={{color:"purple"}}>
              Hello  {randomStudent()} 
          </Typography> 
          
            <div>
              
              <TextField
                id="question"
                label="Question for you :)"
                type="text"
                name="question"
                margin="normal"
                className={classes.textField}
                onChange={this.handleChange}                   
              />

              </div>

            <Button type="submit" variant="raised">Send</Button>
              
          </Paper>
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
    batches: state.batches, 
    evaluation:state.evaluation,
    evaluations:state.evaluations
  }
}
     
export default withStyles(styles)(connect(mapStateToProps, 
  {getStudents, getBatches, getEvaluations, fetchEvaluation, fetchStudent, fetchBatch})(PercentageBar))