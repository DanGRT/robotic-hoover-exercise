/*
  This may not be the most easily readable way of doing things,
  but I have pulled out these functions so they can be exported for testing.

  Any advice on how to keep these within the scope of robotHoover function
  would be appreciated.
*/

function checkForDirt(data){
    let clonedData = Object.assign({}, data)
    const dirtPatchesForComparison = clonedData.dirtPatches.map(item => Object.values(item).join(""))
    const currentPosForComparison = Object.values(clonedData.currentPosition).join("")

    if (dirtPatchesForComparison.includes(currentPosForComparison)){
        clonedData.cleanCount += 1
        clonedData.dirtPatches = clonedData.dirtPatches.filter(dirtPatch => Object.values(dirtPatch).join("") !== Object.values(clonedData.currentPosition).join(""))
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