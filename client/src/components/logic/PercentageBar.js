import React from 'react'
import {overview} from './overview.logic'
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';

export const percentageBar = (classes, students, evaluations) => {

    const percentage = overview(evaluations)
              
    return ( 
      <div>

        <Paper className={classes.rootBar} elevation={4}>
        
          <Typography variant="headline" component="h3" style={{color:"green"}} >
          Green: {percentage.green? percentage.green.toFixed(2) : 0.00.toFixed(2)}%     
          </Typography>
      
          <Typography variant="headline" component="h3" style={{color:"#FFEA00"}}>
          Yellow: {percentage.yellow? percentage.yellow.toFixed(2) : 0.00.toFixed(2)}%
          </Typography>
      
          <Typography variant="headline" component="h3" style={{color:"red"}}>
          Red: {percentage.red? percentage.red.toFixed(2) : 0.00.toFixed(2)}%
          </Typography>
        
        </Paper> 

      </div>  
    )
  }
