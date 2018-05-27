import React, {PureComponent} from 'react'
import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'
import {withStyles} from 'material-ui/styles'
import {studentFormStyles} from '../styles'

class StudentForm extends PureComponent {

	state = {}

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

	render() {

        const {classes} = this.props

		return (         
			<form onSubmit={this.handleSubmit}>
            
                <h1>Student</h1>
                    
                <TextField
                    id="fullName"
                    name="fullName"
                    label="Full Name"
                    type="text"
                    margin="normal"
                    className={classes.container}
                    value={this.state.fullName || ''}
                    onChange={ this.handleChange }                       
                    required
                />
                
                <TextField
                    accept="image/*"
                    id="photo"
                    label="Photo"
                    type="file"
                    name="photo"
                    margin="normal"
                    className={classes.container}
                    onChange={this.handleFileChange}                   
                    InputLabelProps={{shrink: true}}
                />

                <Button 
                    variant="raised" 
                    type="submit"
                    className={classes.button}> 
                    Submit 
                </Button>
            
			</form>
            
		)
	}
}

export default withStyles(studentFormStyles)(StudentForm);
