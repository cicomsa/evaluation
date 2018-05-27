export const batchFormStyles = theme => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
      width: 150,
    },
    button: {
      marginTop: 7
    }
})

export const studentFormStyles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    width: 200,
  },
    button: {
      marginTop: 10
    }
})

export const evaluationFormStyles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {  
    minWidth: 120,
    marginBottom: -10,
    marginTop: 13
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    width: 200,
  },
  button: {
    marginTop: 9
  }
   
})

export const batchPageStyles = theme => ({
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

export const studentPageStyles = theme => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
    },
    gridList: {
      width: 830,
      height: 570
    },
    icon: {
      marginRight:30,
      size: 30
    }
})

export const percentageAndAkQuestionStyles = theme => ({
    rootBar: theme.mixins.gutters({
      paddingTop: 16,
      paddingBottom: 16,
      marginTop: theme.spacing.unit * 3,
    }),
    button: {
      marginTop: 7,
      marginBottom: 7
    },
    typo: {
      color:"purple", 
      marginBottom:"-10px"
    }
})