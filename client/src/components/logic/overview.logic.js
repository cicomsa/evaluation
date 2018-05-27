export const overview = (evaluations) => {

    const allRed = []
    evaluations.map(evaluation => {
      if (evaluation.color.includes("red")) {
        return allRed.push("true")
      } else {
        return ''
      }
    })
    
    const allYellow = []
    evaluations.map(evaluation => {
      if (evaluation.color.includes("yellow")) {
        return allYellow.push("true")
      } else {
        return ''
      }
    })
  
    const allGreen = []
    evaluations.map(evaluation => {
      if (evaluation.color.includes("green")) {
        return allGreen.push("true")
      } else {
        return ''
      }
    })
    
    const sumColors = allRed.length + allGreen.length + allYellow.length
  
    const redPercentage = ((allRed.length / sumColors) * 100)
    const yellowPercentage = ((allYellow.length / sumColors) * 100)
    const greenPercentage = ((allGreen.length / sumColors) * 100)
  
    return {
      red: redPercentage,
      green: greenPercentage,
      yellow: yellowPercentage
  
    }
  }