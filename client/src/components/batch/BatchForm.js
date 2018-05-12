import React, {PureComponent} from 'react'
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import {withStyles} from 'material-ui/styles';

const styles = theme => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
      width: 162,
    },
    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
      width: 200,
    }
  })

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
                <div>

                    <TextField
                        id="batchNumber"
                        name="batchNumber"
                        label="Number"
                        type="text"
                        margin="normal"
                        className={classes.TextField}
                        value={this.state.batchNumber || '' }
                        onChange={this.handleChange}
                      
                    />
                </div>

                <div>

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
                </div>

                <div>

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
                </div>

                <div>
                    <Button variant="raised" type="submit"> Submit </Button>
                </div>
			</form>

		)
	}
}

export default withStyles(styles)(BatchForm)
