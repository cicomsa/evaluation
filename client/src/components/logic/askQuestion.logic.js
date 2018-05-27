export const askQuestion = (evaluations, students) => {

    const studentsColors = evaluations.map(evaluation => evaluation.color)

    let studentsObject = {}
    students.map(student => student.fullName)
        .forEach((key, i) => studentsObject[key] = studentsColors[i]);
      
    //returns the names associated to the colors
    const askColor = (color) => {
    let studentName =[]
    let trashUndefined = []
      for (const key in studentsObject) {
        if (studentsObject.hasOwnProperty(key)) {
            
        if (studentsObject[key] === undefined) {
            trashUndefined.push('')           
        } else if (studentsObject[key].includes(color)) {
            studentName.push(key)
        }
      }
    }       
        return studentName    
    }

    //returns a random color back
    const pickColor = () => {
        let random = Math.floor((Math.random() * 100));
        if (random <= 19) return 'green'                  
        if (random <= (28+19)) return 'yellow'
        if (random <= (28+19+53)) return 'red'   
    }

    const randomStudent = () => {
        let color = []
        color.push(pickColor())
        return askColor(color)[Math.floor((Math.random() * askColor(color).length))]            
    }

    const askStudent = randomStudent()

    if (askStudent === undefined ) return null
    return askStudent 
    
    
}



    

   
