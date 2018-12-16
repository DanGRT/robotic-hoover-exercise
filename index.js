const fs = require('fs')
const {checkBoundary, checkForDirt} = require('./helperFunctions.js')


class RobotHoover{
    constructor(data){
        this.data = this.addInstructions(data)
        this.runHoover = this.runHoover.bind(this)
        this.addInstructions = this.addInstructions.bind(this)
    }

    runHoover(data = this.data){
        let clonedData = Object.assign({}, data)
        clonedData.directions.forEach(direction => {
            if (direction === "N"){
                const prospectivePosition =  clonedData.currentPosition["y"] + 1
                clonedData = checkBoundary(clonedData, prospectivePosition, "y")
            }
            if (direction === "E"){
                const prospectivePosition = data.currentPosition["x"] + 1
                clonedData = checkBoundary(clonedData, prospectivePosition, "x")
                
            }
            if (direction === "S"){
                const prospectivePosition = clonedData.currentPosition["y"] - 1
                clonedData = checkBoundary(clonedData, prospectivePosition, "y")
                
            }
            if (direction === "W"){
                const prospectivePosition = clonedData.currentPosition["x"] - 1
                clonedData= checkBoundary(clonedData, prospectivePosition, "x")
            }
            clonedData = checkForDirt(clonedData)
            
        })
            return clonedData
    }

    addInstructions(input = this.data, data = this.data){
        const clonedData = Object.assign({}, data)

        const splitLines = input.split('\n')
                                .map(item => item.split(' '))

        // line 0 is room dimensions
        clonedData.room = {
            x: Number(splitLines[0][0]),
            y: Number(splitLines[0][1])} 

        //line 1 is starting position
        clonedData.currentPosition = {
            x: Number(splitLines[1][0]),
            y: Number(splitLines[1][1])} 
        
        //final line contains directions
        clonedData.directions = splitLines[splitLines.length -1][0].split("") 

        // All remaining lines are positions of dirt patches
        clonedData.dirtPatches = splitLines.filter((item, index) => index !== 0 && index !== 1 && index !== splitLines.length -1)
                                           .map(item => ({x: Number(item[0]), y: Number(item[1])}))
                                           .concat()
        
        clonedData.cleanCount = 0 // ensure cleanCount is reset to 0
        return clonedData
    }




}




/*

     Main program
     ------------

*/

// Read input.txt
let input = {}
try {
  // try to read existing txt file
  input = fs.readFileSync('./input.txt', 'utf8')
} catch (error) {
  // if the file doesn't exist
  if (error.code === 'ENOENT') {
    console.info('No input text file available');
  } else {
    console.warn('While loading text file', error.message)
  }
}

const myHoover = new RobotHoover(input)
const hooverReport = myHoover.runHoover()

// print output as requested in spec
console.log(`Final Position:`, hooverReport.currentPosition)
console.log(`Spots Cleaned: ${hooverReport.cleanCount}`)



//exports for testing
module.exports = {myHoover}