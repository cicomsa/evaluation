import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import LoginPage from './components/login/LoginPage'
import SignupPage from './components/signup/SignupPage'
import LogoutPage from './components/logout/LogoutPage'
import BatchesPage from './components/batch/BatchesPage'
import TopBar from './components/layout/TopBar'
import BatchPage from './components/batch/BatchPage';
import StudentPage from './components/student/StudentPage'
import AllStudentEvaluations from './components/evaluation/AllStudentEvaluations'
import EditEvaluation from './components/evaluation/EditEvaluation'

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <nav>
            <TopBar />
          </nav>
          <main style={{marginTop:75}}>
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/logout" component={LogoutPage} />
          <Route exact path="/signup" component={SignupPage} />
          <Route exact path="/batches" component={BatchesPage} />
          <Route exact path="/batches/:id" component={BatchPage} />
          <Route exact path="/students/:id" component={StudentPage} />
          <Route exact path="/evaluations/student/:id" component={AllStudentEvaluations} />
          <Route exact path="/evaluations/:id" component={EditEvaluation} />
          <Route exact path="/" render={ () => <Redirect to="/batches" /> } />
          </main>
        </div>
      </Router>
    )
  }
}
export default App
