import React, {PureComponent} from 'react';
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import BatchForm from './BatchForm';
import BatchTable from './BatchTable'
import {login} from '../../actions/users'
import {addBatch} from '../../actions/batches'

class BatchPage extends PureComponent {

  addBatch = (batch) => {
    this.props.addBatch(batch)
  }

  render() {

    const {authenticated} = this.props;
    if (!authenticated) return (
			<Redirect to="/login" />
		)

    return (
      <div>     
        <BatchForm onSubmit={this.addBatch}/>
        <hr></hr>
        <BatchTable/>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    authenticated: state.currentUser !== null 
  }
}
     
export default connect(mapStateToProps, 
  {login, addBatch})(BatchPage)
