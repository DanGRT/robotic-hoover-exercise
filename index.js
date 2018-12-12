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
            data.dirtPatches = splitLines.filter((item, index) => index !== 0 && index !== 1 && index !== splitLines.length -1)
        },

        returnData(){
            return data
        }
    }
}


const {addInstructions, returnData} = robotHoover()

addInstructions(input)
console.log(returnData())

