const fs = require('fs')
const {checkBoundary, checkForDirt} = require('./helperFunctions.js')

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

function robotHoover(){
    let data = {
        currentPosition: null,
        room: [],
        dirtPatches: [],
        directions: [],
        cleanCount: 0
    }

    return {
        // function takes data extracted from text file and formats into data object
        addInstructions(input){
            const splitLines = input.split('\n')
                                    .map(item => item.split(' '))

            data.room = splitLines[0] // line 0 is room dimensions
            data.currentPosition = splitLines[1] //line 1 is starting position
            data.directions = splitLines[splitLines.length -1] //final line contains directions
            data.directions = data.directions[0].split("")
            // All remaining lines are positions of dirt patches
            data.dirtPatches = splitLines.filter((item, index) => index !== 0 && index !== 1 && index !== splitLines.length -1)
            data.dirtPatches = data.dirtPatches.map(item => {
                return item.join("")
            }).concat()
            
            data.cleanCount = 0 // ensure cleanCount is reset to 0

            return data
        },

        // returns data for development purposes
        returnData(){
            return data
        },

        // Key function - runs through directions until complete
        // checkBoundary and checkForDirt are imported from helperFunctions.js
        runHoover(data){
            let clonedData = Object.assign({}, data)
            clonedData.directions.forEach(direction => {
                clonedData.currentPosition[0] = Number(clonedData.currentPosition[0])
                clonedData.currentPosition[1] = Number(clonedData.currentPosition[1])
                if (direction === "N"){
                    const prospectivePosition =  clonedData.currentPosition[1] + 1
                    clonedData = checkBoundary(clonedData, prospectivePosition, 1)
                }
                if (direction === "E"){
                    const prospectivePosition = data.currentPosition[0] + 1
                    clonedData = checkBoundary(clonedData, prospectivePosition, 0)
                    
                }
                if (direction === "S"){
                    const prospectivePosition = clonedData.currentPosition[1] - 1
                    clonedData = checkBoundary(clonedData, prospectivePosition, 1)
                    
                }
                if (direction === "W"){
                    const prospectivePosition = clonedData.currentPosition[0] - 1
                    clonedData= checkBoundary(clonedData, prospectivePosition, 0)
                }
                clonedData = checkForDirt(clonedData)
                
            })
                return clonedData
        }
    }
}


const {addInstructions, returnData, runHoover} = robotHoover()

//add file to hoover and run
const hooverWithInstructions = addInstructions(input)
const hooverReport = runHoover(hooverWithInstructions)

console.log(hooverReport)
// print output as requested in spec
console.log(hooverReport.currentPosition[0], hooverReport.currentPosition[1])
console.log(hooverReport.cleanCount)


module.exports = {addInstructions, returnData, runHoover}