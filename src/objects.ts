interface ICoords {
  x: number
  y: number
}

const MoveDeltas = new Map<number, ICoords>([
  [0, { x: 0, y: -1 }], // North
  [1, { x: 1, y: 0 }], // East
  [2, { x: 0, y: 1 }], // South
  [3, { x: -1, y: 0 }] // West
])

class Table {
  constructor(dimensions: ICoords) {
    this.dimensions = dimensions
  }
  dimensions: ICoords

  /**
   * Check if point coordinates is within the table
   * @param coords point coordinates
   * @returns if the point is within the table
   */
  onTable(coords: ICoords): boolean {
    const [shapeX, shapeY] = [coords['x'], coords['y']]
    const [tableMaxX, tableMaxY] = [this.dimensions['x'], this.dimensions['y']]
    return shapeX > -1 && shapeX < tableMaxX && shapeY > -1 && shapeY < tableMaxY
  }
}

class Shape {
  constructor(startCoords: ICoords) {
    this.coords = startCoords
  }
  private coords: ICoords
  private objDirection = 0

  get direction() {
    return this.objDirection
  }

  set direction(value: number) {
    this.objDirection = value
  }

  get coordinates() {
    return this.coords
  }

  set coordinates(value: ICoords) {
    this.coords = value
  }

  /**
   * Parse object's coordinates to a string
   * @returns object's coordinates formatted to protocol definition
   */
  get coordinateOutput(): string {
    return `[${this.coords['x']}, ${this.coords['y']}]`
  }

  /**
   * Calculate new coordinates by adding the current coordinates to the deltas decided by the object's direction
   * @returns the object's coordinates after the move
   */
  moveForward(): ICoords {
    const moveDeltas = MoveDeltas.get(this.direction)!
    const newCoords = { x: this.coords['x'] + moveDeltas['x'], y: this.coords['y'] + moveDeltas['y'] }
    this.coords = newCoords
    return this.coords
  }

  /**
   * Calculate new coordinates by subtracting the current coordinates to the deltas decided by the object's direction
   * @returns the object's new coordinates
   */
  moveBackwards(): ICoords {
    const moveDeltas = MoveDeltas.get(this.direction)!
    const newCoords = { x: this.coords['x'] - moveDeltas['x'], y: this.coords['y'] - moveDeltas['y'] }
    this.coords = newCoords
    return this.coords
  }

  /**
   * Turn the object clockwise by adding 1 to the direction value.
   * If turning past West(3), set direction to North(0)
   * @returns direction value
   */
  turnRight(): number {
    this.direction += 1
    if (this.direction === 4) {
      this.direction = 0
    }
    return this.direction
  }

  /**
   * Turn the object counter-clockwise by subtracting 1 from the direction value.
   * If turning past North(0), set direction to West(3)
   * @returns direction value
   */
  turnLeft(): number {
    this.direction -= 1
    if (this.direction === -1) {
      this.direction = 3
    }
    return this.direction
  }

  /**
   * Performs the command given
   * @param command move or turn command
   * @returns the object's coordinates after the move
   */
  move(command: number) {
    switch (command) {
      case 1:
        this.moveForward()
        break
      case 2:
        this.moveBackwards()
        break
      case 3:
        this.turnRight()
        break
      case 4:
        this.turnLeft()
        break
      default:
        break
    }
    return this.coords
  }
}

class Cube extends Shape {
  constructor(startCoords: ICoords) {
    super(startCoords)
  }
}

export { Table, Shape, Cube }
