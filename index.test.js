const hooverMethods = require('./index.js')

describe('robot hoover', () => {
    it('data from file gets formatted correctly by addInstructions', () => {
        const mockTextFile = `5 5\n1 2\n1 0\n2 2\n2 3\nNNESEESWNWW`
        const output = hooverMethods.addInstructions(mockTextFile)
        const expectedOutput = {
            currentPosition: ["1", "2"],
            room: ["5", "5"],
            dirtPatches: ['10', '22', '23'],
            directions: [ 'N', 'N', 'E', 'S', 'E', 'E', 'S', 'W', 'N', 'W', 'W' ],
            cleanCount: 0
        }

        expect(output).toEqual(expectedOutput)
    })

})