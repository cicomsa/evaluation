import React from 'react'
import {Link} from 'react-router-dom'
import IconButton from 'material-ui/IconButton'
import GridList, { GridListTile, GridListTileBar } from 'material-ui/GridList'
import DeleteIcon from '@material-ui/icons/Delete'

export const studentsGrid = (students, evaluations, classes, deleteStudent) => {
    return (
        <div styles={classes.root}> 
            <GridList cellHeight={200} styles={classes.gridList} cols={3}>      
                {students.map(student => (
                <GridListTile key={student.id}>
                    <Link to={`/students/${student.id}`}><img src={require(`../images/images-landscape/${student.photo}`)} alt="student" width='500'/></Link>
                    <GridListTileBar styles={{width: 100}}
                    title={student.fullName}
                    subtitle= {evaluations? 
                        evaluations
                        .filter(evaluation => evaluation.studentNo === student.id)
                        .map(evaluation => 
                            <img key={evaluation.id} src={require(`../images/colors/${(evaluation.color)? evaluation.color+'.png': "blue.png"}`)} 
                            alt="student" width="25"/>):''}

                    actionIcon={
                        <IconButton aria-label="Delete">
                             <DeleteIcon style={{color: 'white'}} onClick={()=> deleteStudent(student.id)}/>
                        </IconButton>                 
                    }
                    />
                    </GridListTile>
                ))}
            </GridList>  
        </div> 
    )   
    
}