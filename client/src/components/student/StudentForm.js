import React, {PureComponent} from 'react'
import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'
import {withStyles} from 'material-ui/styles'

const styles = theme => ({

    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
      width: 250,
    }
  })
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
            
                <h1>Add Student</h1>
                <div>
                    
                    <TextField
                        id="fullName"
                        name="fullName"
                        label="Full Name"
                        type="text"
                        margin="normal"
                        className={classes.textField}
                        value={this.state.fullName || ''}
                        onChange={ this.handleChange }                       
                        required
                    />
                </div>

                <div className="upload">
                   
                    <TextField
                    accept="image/*"
                    id="photo"
                    label="Photo"
                    type="file"
                    name="photo"
                    margin="normal"
                    className={classes.textField}
                    onChange={this.handleFileChange}                   
                    InputLabelProps={{shrink: true}}
                    />
                </div>
                
                <div>
                    <Button variant="raised" type="submit"> Submit </Button>
                </div>
			</form>
            
		)
	}
}

export default withStyles(styles)(StudentForm);
