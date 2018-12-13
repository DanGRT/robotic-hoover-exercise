const hooverMethods = require('../index.js')

describe('robot hoover', () => {
    it('data from file gets formatted correctly by addInstructions', () => {
        const mockTextFile = `5 5\n1 2\n1 0\n2 2\n2 3\nNNESEESWNWW`
        const output = hooverMethods.addInstructions(mockTextFile)
        const expectedOutput = {
            currentPosition: {x: 1, y: 2},
            room: {x: 5, y: 5},
            dirtPatches: [{x: 1, y: 0}, {x: 2, y: 2}, {x: 2, y: 3}],
            directions: [ 'N', 'N', 'E', 'S', 'E', 'E', 'S', 'W', 'N', 'W', 'W' ],
            cleanCount: 0
        }

        expect(output).toEqual(expectedOutput)
    })
    it('run hoover returns the correct cloned modified data object', () => {
        const data = {
            currentPosition: {x: 1, y: 2},
            room: {x: 5, y: 5},
            dirtPatches: [{x: 1, y: 0}, {x: 2, y: 2}, {x: 2, y: 3}],
            directions: [ 'N', 'N', 'E', 'S', 'E', 'E', 'S', 'W', 'N', 'W', 'W' ],
            cleanCount: 0
        }

        const output = hooverMethods.runHoover(data)

        const expectedOutput = {
            currentPosition: {x: 1, y: 3},
            room: {x: 5, y: 5},
            dirtPatches: [{x: 1, y: 0}, {x: 2, y: 2}],
            directions: [ 'N', 'N', 'E', 'S', 'E', 'E', 'S', 'W', 'N', 'W', 'W' ],
            cleanCount: 1
        }

            //correct output
            expect(output).toEqual(expectedOutput)

            //original data has not mutated
            expect(data).toEqual(data)
    })
})