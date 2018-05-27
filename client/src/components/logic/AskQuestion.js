import React from 'react'
import {askQuestion} from './askQuestion.logic'
import Button from 'material-ui/Button'
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import TextField from 'material-ui/TextField'

export const studentQuestion = (classes, evaluations, students) => {

 const askStudent =   askQuestion(evaluations, students) &&
    <Paper className={classes.rootBar} elevation={4}>
    
      <Typography variant="headline" component="h3" className={classes.typo}>
          Hello  {askQuestion(evaluations, students)} 
      </Typography>  
      
        <TextField
          id="question"
          label="Question for you :)"
          type="text"
          name="question"
          margin="normal"
          className={classes.textFieldQ}
          onChange={this.handleChange}                   
        />

        <br/>
        <Button 
          type="submit" 
          className={classes.button} 
          variant="raised">
          Send
        </Button>
    
      </Paper>

    return askStudent
  
} 