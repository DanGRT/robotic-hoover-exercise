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

// const splitLines = input.split('\n')
// .map(item => item.split(' '))
// console.log(splitLines)
// console.log(splitLines.length - 1)

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

        checkBoundary(prospectivePosition){
            if (prospectivePosition[0] > data.room[0] ){
                return data.currentPosition
            }
            if (prospectivePosition[1] > data.room[1]){
                return data.currentPosition
            }
            if (prospectivePosition[0] < 0){
                return data.currentPosition
            }
            if (prospectivePosition[1] < 0){
                return data.currentPosition
            }
            return prospectivePosition
        },

        runHoover(){

            function checkBoundary(prospectivePosition, axis){
                if (prospectivePosition > data.room[axis] ){
                    return data.currentPosition
                }
                if (prospectivePosition > data.room[axis]){
                    return data.currentPosition[axis]
                }
                if (prospectivePosition < 0){
                    return data.currentPosition[axis]
                }
                return prospectivePosition
            }

            data.directions.forEach(item => {
                data.currentPosition[0] = Number(data.currentPosition[0])
                data.currentPosition[1] = Number(data.currentPosition[1])
                console.log(item)
                if (item === "N"){
                    const nextPosition = checkBoundary(data.currentPosition[1] += 1, 1)
                    data.currentPosition[1] = nextPosition
                }
                if (item === "E"){
                    const nextPosition = checkBoundary(data.currentPosition[0] -= 1, 0)
                    data.currentPosition[0] = nextPosition
                }
                if (item === "S"){
                    const nextPosition = checkBoundary(data.currentPosition[1] -= 1, 1)
                    data.currentPosition[1] = nextPosition
                }
                if (item === "W"){
                    const nextPosition = checkBoundary(data.currentPosition[0] += 1, 0)
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
runHoover()

