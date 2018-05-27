import React, {PureComponent} from 'react'
import {evaluationFormStyles} from '../styles'
import {withStyles} from 'material-ui/styles'
import {InputLabel} from 'material-ui/Input';
import {FormControl} from 'material-ui/Form';
import Select from 'material-ui/Select';
import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'

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

	render() {

        const {classes} = this.props
          
		return (   
               
			<form onSubmit={this.handleSubmit}>
                
                <h1>Evaluation</h1>
                    
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
 
                    <TextField
                        id="remark"
                        label="Remark"
                        type="text"
                        name="remark"
                        margin="normal"
                        className={classes.container}
                        value={this.state.remark || ''}
                        onChange={this.handleChange}                   
                    />

                    <TextField
                        id="date"
                        name="date"
                        label="Date"
                        type="date"
                        margin="normal"
                        className={classes.container}
                        value={this.state.date || new Date().toJSON().slice(0,10)}
                        onChange={ this.handleChange }
                        InputLabelProps={{shrink: true}}                    
                    />
                
                    <Button className={classes.button} variant="raised" type="submit">Save</Button>

			</form>           
		)
	}
}

export default withStyles(evaluationFormStyles)(EvaluationForm)
