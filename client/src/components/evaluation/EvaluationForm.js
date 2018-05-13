import React, {PureComponent} from 'react'
import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'
import {withStyles} from 'material-ui/styles'
import {Link} from 'react-router-dom'
import {fetchStudent} from '../../actions/student'
import {connect} from 'react-redux'
import {InputLabel} from 'material-ui/Input';
import {FormControl} from 'material-ui/Form';
import Select from 'material-ui/Select';
import {Redirect} from 'react-router-dom'
import {fetchEvaluation} from '../../actions/evaluation'
import {getEvaluations} from '../../actions/evaluations'

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 250,
      }
})

class EvaluationForm extends PureComponent {

    state = {};   

	handleSubmit = (e) => {
        e.preventDefault()
        this.props.onSubmit(this.state) 
        
    }
    
    handleFileChange = e => {
        const {name} = e.target        
        this.setState({
            [name]: e.target.files[0].name
        })        
    }

	handleChange = e => {
        const {name, value} = e.target
        this.setState({
            [name]:value
        })
    } 

    componentWillMount () {
        // this.props.fetchEvaluation(this.props.evaluations
        //     .filter(evaluation => evaluation.studentNo === this.props.student.id)
        //     .sort((a,b) => b.id-a.id)[0].id)
        //this.props.getEvaluations()
    }

	render() {

        const {classes, student,evaluation} = this.props
        if (!student) return null
       // if (!evaluation) return null
        
		return (   
               
			<form onSubmit={this.handleSubmit}>
                
                <h1>Evaluation</h1>
                <div>
                    
                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor='color'>Color</InputLabel>
                    <Select
                        native
                        value={this.state.color}
                        onChange={this.handleChange}
                        inputProps={{name: 'color'}}
                        required
                    >
                        <option value="" />
                        <option value={'red'}>red</option>
                        <option value={'yellow'}>yellow</option>
                        <option value={'green'}>green</option>
                    </Select>
                    </FormControl>
                </div>

                <div>
                   
                    <TextField
                    id="remark"
                    label="Remark"
                    type="text"
                    name="remark"
                    margin="normal"
                    className={classes.textField}
                    value={this.state.remark || ''}
                    onChange={this.handleChange}                   
                    />
                </div>

                <div>

                    <TextField
                        id="date"
                        name="date"
                        label="Date"
                        type="date"
                        margin="normal"
                        value={this.state.date || new Date().toJSON().slice(0,10)}
                        onChange={ this.handleChange }
                        InputLabelProps={{shrink: true}}                    
                    />

                </div>
                
                <div>
                
               <Button className="save" 
            variant="raised" 
            type="submit" 
            
        > Save </Button>
         

                    {/* {<Link to={`/students/${Number(student.id)+1}`}>
                        <Button variant="raised" type="submit" onClick={()=>this.handleSubmit}>
                            Next
                        </Button></Link>} */}
                </div>
			</form>
            
		)
	}
}

const mapStateToProps = (state) => {
    return {
        student: state.student,
        evaluation:state.evaluation,
        evaluations:state.evaluations          
    }
}

export default withStyles(styles)(connect(mapStateToProps,{fetchStudent, fetchEvaluation, getEvaluations})(EvaluationForm))
