import React, {PureComponent} from 'react';
import {withStyles} from 'material-ui/styles';
import Table, {TableBody, TableCell, TableHead, TableRow} from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import {connect} from 'react-redux'
import {getBatches, addBatch} from '../../actions/batches'
import {deleteBatch} from '../../actions/batch'
import {login} from '../../actions/users'
import {Redirect} from 'react-router-dom'
import BatchForm from './BatchForm';
import {Link} from 'react-router-dom'
import DeleteIcon from '@material-ui/icons/Delete'


const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
    display: 'flex'
  },
  table: {
    minWidth: 700
  }
})

class BatchPage extends PureComponent {

  componentWillMount() {
	  this.props.getBatches()
    }

  addBatch = (batch) => {
    this.props.addBatch(batch)
  }

  deleteBatch = (batchId) => {
    this.props.deleteBatch(batchId)
  }

  render() {

    const { batches, classes, authenticated } = this.props;
    if (!authenticated) return (
			<Redirect to="/login" />
		)

    return (
      <div>
       
        <BatchForm onSubmit={this.addBatch}/>
        <hr></hr>
        <h1>Current classes</h1>
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow >
                <TableCell>Batch number</TableCell>
                <TableCell>Start Date</TableCell>
                <TableCell>End Date</TableCell>
                <TableCell>Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {batches.sort((a,b) => b.batchNumber-a.batchNumber).map(batch => {
                return (
                  <TableRow key={batch.id} hover align='left'>
                    <TableCell><Link to={ `/batches/${batch.id}` }>
                      {batch.batchNumber}</Link></TableCell>
                    <TableCell>{batch.startDate}</TableCell>
                    <TableCell>{batch.endDate}</TableCell>
                    <TableCell>
                      <DeleteIcon onClick={()=> this.deleteBatch(batch.id)}/>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </Paper>
      </div>
      )
  }
}

const mapStateToProps = (state) => {
  return {
    batches: state.batches,
    authenticated: state.currentUser !== null,  
  }
}
     
export default withStyles(styles)(connect(mapStateToProps, 
  {getBatches, login, addBatch, deleteBatch})(BatchPage))
