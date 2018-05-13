import React from 'react'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'
import Button from 'material-ui/Button'
import {withRouter} from 'react-router'

const TopBar = (props) => {
  const { location, history} = props

  return (
    <AppBar position="absolute" style={{zIndex:10}}>
      <Toolbar>
        <Typography variant="title" color="inherit" style={{flex: 1}}>
           Class Evaluations
        </Typography>

        {
          location.pathname.indexOf('signup') > 0 &&
          <Button color="inherit" onClick={() => history.push('/login')}>Login</Button>
        }
        {
          location.pathname.indexOf('login') > 0 &&
          <Button color="inherit" onClick={() => history.push('/signup')}>Sign up</Button>
        }
        {
          location.pathname.indexOf('batches/') > 0 &&
          <Button color="inherit" onClick={() => history.push('/logout')}>Log out</Button>
        }
        {
          /batches$/.test(location.pathname) &&
          <Button color="inherit" onClick={() => history.push('/logout')}>Log out</Button>
        }
         {
          location.pathname.indexOf('students/') > 0 &&
          <Button color="inherit" onClick={() => history.push('/logout')}>Log out</Button>
        }

        {
          location.pathname.indexOf('evaluations/') > 0 &&
          <Button color="inherit" onClick={() => history.push('/logout')}>Log out</Button>
        }
      </Toolbar>
    </AppBar>
  )
}

export default withRouter(TopBar)
