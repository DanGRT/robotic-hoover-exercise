/*
  This may not be the most easily readable way of doing things,
  but I have pulled out these functions so they can be exported for testing.

  Any advice on how to keep these within the scope of robotHoover function
  would be appreciated.
*/

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


module.exports = {checkForDirt, checkBoundary}