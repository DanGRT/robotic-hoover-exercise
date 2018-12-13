const fs = require('fs')


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
        runHoover(data){
            function checkForDirt(data){
                let clonedData = Object.assign({}, data)
                if (clonedData.dirtPatches.includes(clonedData.currentPosition.join(""))){
                    clonedData.cleanCount += 1
                    clonedData.dirtPatches = clonedData.dirtPatches.filter(dirtPatch => dirtPatch !== clonedData.currentPosition.join(""))
                }
                return clonedData
            }

            function checkBoundary(data, prospectivePosition, axis){
                let clonedData = Object.assign({}, data)
                if ( prospectivePosition < clonedData.room[axis] || prospectivePosition > 1){
                     clonedData.currentPosition[axis] = prospectivePosition
                }
                return clonedData
            }

            let clonedData = Object.assign({}, data)

            clonedData.directions.forEach(item => {
                clonedData.currentPosition[0] = Number(clonedData.currentPosition[0])
                clonedData.currentPosition[1] = Number(clonedData.currentPosition[1])
                if (item === "N"){
                    const prospectivePosition =  clonedData.currentPosition[1] + 1
                    clonedData = checkBoundary(clonedData, prospectivePosition, 1)
                }
                if (item === "E"){
                    const prospectivePosition = data.currentPosition[0] + 1
                    clonedData = checkBoundary(clonedData, prospectivePosition, 0)
                    
                }
                if (item === "S"){
                    const prospectivePosition = clonedData.currentPosition[1] - 1
                    clonedData = checkBoundary(clonedData, prospectivePosition, 1)
                    
                }
                if (item === "W"){
                    const prospectivePosition = clonedData.currentPosition[0] - 1
                    clonedData= checkBoundary(clonedData, prospectivePosition, 0)
                }
                clonedData = checkForDirt(clonedData)
                
            })
                return clonedData
        }
    }
}


const {addInstructions, returnData, checkBoundary, runHoover} = robotHoover()

const hooverWithInstructions = addInstructions(input)
console.log(runHoover(hooverWithInstructions))


module.exports = {addInstructions, returnData, runHoover}