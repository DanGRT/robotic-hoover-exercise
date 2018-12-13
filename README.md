# Robotic Hoover Exercise

Tech test for a company

## To Run:

* Clone this repository

* `cd` into repository

* enter `npm install` or `yarn` into your terminal to install dependencies

* enter `node index.js` in terminal to execute the program

### Changing input:

* If you wish to change the input for the program, input.txt can be modified along these lines:

```
5 5
1 2
1 0
2 2
2 3
NNESEESWNWW
```
* the first line holds the room dimensions (X Y), separated by a single space (all coordinates will be presented in this format)
* the second line holds the initial hoover position
* subsequent lines contain the zero or more positions of patches of dirt (one per line)
* the next line then always contains the driving instructions (at least one)

## To Run Tests:

* When in repository, enter `npm test` or `yarn test` to run test suites

## Notes:

I agreed to submit this for Thursday 13th December, so have done so. I started to rewrite the program in pure functions, but if I had more time I would like to rewrite it to be more akin to a redux-style reducer.

I will likely create a new branch on this repo which will factor in these plans, but master will remain as delivered on Thursday 13th December.