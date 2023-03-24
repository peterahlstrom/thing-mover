# thing-mover
A small program that performs simple simulations of a moving object.

## Install
### Prerequisites
[Node.js](https://nodejs.org)
### Install dependencies
```bash
$ npm install
```
## Run
### Input
The program takes a string of comma-separated numbers as input. The first four numbers are interpreted as a header containing the simulation setup. The setup consist of the table's dimensions and the object's starting point. The rest of the numbers are treated as move commands:

[tableDimensionX, tableDimensionY],[startCoordinateX, startCoordinateY],[move-1,move-2,...move-n]

Example of a table of the size 4x4 and an object starting at [x=2,y=1] followed by move commands starting with 1 (forward):

<code>***4,4,2,1***,1,3,1,4,2,3,1</code>

#### Allowed move commands:
0. Quit
1. Forward
2. Backwards
3. Turn 90° right (clockwise)
4. Turn 90° left (counter-clockwise)


### Run simulation
The program is run from the command line with the input string fed to it via `stdin` like in these examples:

Inline:
```bash
$ node build/index.js <<< 4,4,2,2,1,3,1,4,2,3,1

$ echo 4,4,2,2,1,3,1,4,2,3,1 | node build/index.js
```
From a file:
```bash
$ node build/index.js < commands.txt 
```

## Tests
Run unit tests:
```bash
$ npm run test
```

Test coverage:
```bash
$ npm run coverage
```