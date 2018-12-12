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

    }

    return {
        addInstructions(input){
            const splitLines = input.split('\n')
                                    .map(item => item.split(' '))

            data.room = splitLines[0]
            data.currentPosition = splitLines[1]
            data.directions = splitLines[splitLines.length -1]
            data.directions = data.directions[0].split("")
            data.dirtPatches = splitLines.filter((item, index) => index !== 0 && index !== 1 && index !== splitLines.length -1)
        },

        returnData(){
            return data
        },

        runHoover(){
            function checkForDirt(position){

            }

            function checkBoundary(prospectivePosition, axis){
                if (prospectivePosition > data.room[axis] || prospectivePosition < 1){
                    return data.currentPosition[axis]
                }else{
                    return prospectivePosition 
                }
            }

            data.directions.forEach(item => {
                data.currentPosition[0] = Number(data.currentPosition[0])
                data.currentPosition[1] = Number(data.currentPosition[1])
                console.log(item)
                if (item === "N"){
                    const prospectivePosition =  data.currentPosition[1] + 1
                    const nextPosition = checkBoundary(prospectivePosition, 1)
                    data.currentPosition[1] = nextPosition
                }
                if (item === "E"){
                    const prospectivePosition = data.currentPosition[0] + 1
                    const nextPosition = checkBoundary(prospectivePosition, 0)
                    data.currentPosition[0] = nextPosition
                }
                if (item === "S"){
                    const prospectivePosition = data.currentPosition[1] - 1
                    const nextPosition = checkBoundary(prospectivePosition, 1)
                    data.currentPosition[1] = nextPosition
                }
                if (item === "W"){
                    const prospectivePosition = data.currentPosition[0] - 1
                    const nextPosition = checkBoundary(prospectivePosition, 0)
                    data.currentPosition[0] = nextPosition
                }
                console.log(data.currentPosition)
                
            })
                console.log(data)
        }
    }
}


const {addInstructions, returnData, checkBoundary, runHoover} = robotHoover()

addInstructions(input)
const data = returnData()
runHoover()

console.log(data.dirtPatches.includes(["2", "2"]))