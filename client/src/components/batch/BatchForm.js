import React, {PureComponent} from 'react'
import {batchFormStyles} from '../styles'
import {withStyles} from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';

class BatchForm extends PureComponent {

	state = {}

	handleSubmit = (e) => {
    e.preventDefault()
		this.props.onSubmit(this.state)

	}

	handleChange = (event) => {
    const {name, value} = event.target

    this.setState({
      [name]: value

    })
  }

	render() {
        const {classes} = this.props
		return (

			<form onSubmit={this.handleSubmit}>

                <h1>Batch</h1>
                <TextField
                    id="batchNumber"
                    name="batchNumber"
                    label="Number"
                    type="text"
                    margin="normal"
                    className={classes.container}
                    value={this.state.batchNumber || '' }
                    onChange={this.handleChange}                   
                />
                <TextField
                    id="startDate"
                    name="startDate"
                    label="Start Date"
                    type="date"
                    margin="normal"
                    className={classes.container}
                    value={this.state.startDate || ''}
                    onChange={this.handleChange}
                    InputLabelProps={{shrink: true}}
                    required
                />
                <TextField
                    id="endDate"
                    name="endDate"
                    label="End Date"
                    type="date"
                    margin="normal"
                    className={classes.container}
                    value={this.state.endDate || ''}
                    onChange={this.handleChange}
                    InputLabelProps={{shrink: true}}
                    required
                />
                <Button className={classes.button} variant="raised" type="submit"> Submit </Button>

			</form>

		)
	}
}

export default withStyles(batchFormStyles)(BatchForm)
