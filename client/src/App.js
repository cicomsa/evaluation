import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import LoginPage from './components/login/LoginPage'
import SignupPage from './components/signup/SignupPage'
import LogoutPage from './components/logout/LogoutPage'
import BatchPage from './components/batch/BatchPage'
import TopBar from './components/layout/TopBar'
import StudentPage from './components/student/StudentPage';
import EvaluationPage from './components/evaluation/EvaluationPage'
import EvaluationOverview from './components/evaluation/EvaluationOverview'
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
          <Route exact path="/batches" component={BatchPage} />
          <Route exact path="/batches/:id" component={StudentPage} />
          <Route exact path="/students/:id" component={EvaluationPage} />
          <Route exact path="/evaluations/student/:id" component={EvaluationOverview} />
          <Route exact path="/evaluations/:id" component={EditEvaluation} />
          <Route exact path="/" render={ () => <Redirect to="/batches" /> } />
          </main>
        </div>
      </Router>
    )
  }
}
export default App
