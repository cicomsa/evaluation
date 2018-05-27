import React, {PureComponent} from 'react';
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {getBatches, deleteBatch} from '../../actions/batches'
import {batchPageStyles} from '../styles'
import {withStyles} from 'material-ui/styles';
import Table, {TableBody, TableCell, TableHead, TableRow} from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import DeleteIcon from '@material-ui/icons/Delete'

class BatchTable extends PureComponent {

  componentWillMount() {
    this.props.getBatches()
    }

    deleteBatch = (batchId) => {
      this.props.deleteBatch(batchId)
    }

  render(){

    const {classes, batches} = this.props
    
    return(

        <Paper className={classes.root}>
            <Table className={classes.table}>
            <TableHead>
              <TableRow>
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
                      <DeleteIcon onClick={() => this.deleteBatch(batch.id)}/>
                    </TableCell>                   
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </Paper>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    batches: state.batches 
  }
}

export default withStyles(batchPageStyles)(connect(mapStateToProps, 
  {getBatches, deleteBatch})(BatchTable))