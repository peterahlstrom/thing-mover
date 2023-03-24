import { Table, Cube, Shape } from './objects'

function init(header: number[]): [Table, Shape] {
  /**
   * Initialize the simulation
   * @param header a message header containing table dimensions and the object's starting-point
   */
  const [tableX, tableY, coordX, coordY] = header
  const dimensions = { x: tableX, y: tableY }
  const startCoords = { x: coordX, y: coordY }

  return [new Table(dimensions), new Cube(startCoords)]
}

function run(table: Table, obj: Shape, commands: number[]): string {
  /**
   * Performs the simulation
   * @param table a Table object to perform the simulation on
   * @param obj a Shape-type object to move around on the table
   * @param commands an array of commands to perform
   * @returns the object's final coordinates
   */
  for (const command of commands) {
    if (command === 0) {
      break
    }

    const cubeCoords = obj.move(command)

    if (!table.onTable(cubeCoords)) {
      obj.coordinates = { x: -1, y: -1 }
      break
    }
  }
  return obj.coordinateOutput
}

export { init, run }
