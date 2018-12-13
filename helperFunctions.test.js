const helperFunctions = require('./helperFunctions.js')

describe('helper functions', () => {
    it('checkForDirt returns correct object if hoover is on dirtpatch when run', () => {
        const data = { 
            currentPosition: [ 1, 0 ],
            room: [ '5', '5' ],
            dirtPatches: [ '10', '22' ],
            directions: [ 'N', 'N', 'E', 'S', 'E', 'E', 'S', 'W', 'N', 'W', 'W' ],
            cleanCount: 1 }

        const output = helperFunctions.checkForDirt(data)

        const expectedOutput = { 
            currentPosition: [ 1, 0 ],
            room: [ '5', '5' ],
            dirtPatches: [ '22' ],
            directions: [ 'N', 'N', 'E', 'S', 'E', 'E', 'S', 'W', 'N', 'W', 'W' ],
            cleanCount: 2 }

            expect(output).toEqual(expectedOutput)
        })
    it('checkBoundary returns correct object if directions tell it to move into a boundary', () => {
        const data = { 
            currentPosition: [ 1, 1 ],
            room: [ '5', '5' ],
            dirtPatches: [ '10', '22' ],
            directions: [ 'N', 'N', 'E', 'S', 'E', 'E', 'S', 'W', 'N', 'W', 'W' ],
            cleanCount: 1 }

            const output = helperFunctions.checkBoundary(data, 0, 0)

            expect(output).toEqual(data)
    })
    it('checkBoundary returns correct object if directions tell it to move into an open space', () => {
        const data = { 
            currentPosition: [ 1, 1 ],
            room: [ '5', '5' ],
            dirtPatches: [ '10', '22' ],
            directions: [ 'N', 'N', 'E', 'S', 'E', 'E', 'S', 'W', 'N', 'W', 'W' ],
            cleanCount: 1 }

            const output = helperFunctions.checkBoundary(data, 2, 1)

            const expectedOutput = { 
                currentPosition: [ 1, 2 ],
                room: [ '5', '5' ],
                dirtPatches: [ '10', '22' ],
                directions: [ 'N', 'N', 'E', 'S', 'E', 'E', 'S', 'W', 'N', 'W', 'W' ],
                cleanCount: 1 }

            expect(output).toEqual(expectedOutput)
    })

})