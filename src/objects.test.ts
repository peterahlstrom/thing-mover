import { Table, Shape } from './objects'

describe('Table', () => {
  const [x, y] = [4, 4]
  const table = new Table({ x: x, y: y })

  test('should init correctly', () => {
    expect(table.dimensions['x']).toEqual(x)
    expect(table.dimensions['y']).toEqual(y)
  })

  describe('should be outside table', () => {
    const cases = [
      { x: 4, y: 0 },
      { x: 0, y: 4 },
      { x: -1, y: 2 },
      { x: 2, y: -1 }
    ]
    test.each(cases)('%p', (coords) => {
      expect(table.onTable(coords)).toBeFalsy()
    })
  })
})

describe('Shape', () => {
  // Setup
  const [tableX, tableY] = [4, 4]
  const [shapeX, shapeY] = [1, 2]
  let table = new Table({ x: tableX, y: tableY })
  let shape = new Shape({ x: shapeX, y: shapeY })

  beforeEach(() => {
    table = new Table({ x: tableX, y: tableY })
    shape = new Shape({ x: shapeX, y: shapeY })
  })

  test('should init correctly', () => {
    expect(shape.coordinates['x']).toEqual(shapeX)
    expect(shape.coordinates['y']).toEqual(shapeY)
  })

  test('should turn from W to N', () => {
    shape.direction = 3
    shape.turnRight()
    expect(shape.direction).toEqual(0)
  })

  test('should turn from N to W', () => {
    shape.direction = 0
    shape.turnLeft()
    expect(shape.direction).toEqual(3)
  })

  describe('should move forward', () => {
    const cases: any[] = [
      [0, { x: 1, y: 1 }],
      [1, { x: 2, y: 2 }],
      [2, { x: 1, y: 3 }],
      [3, { x: 0, y: 2 }]
    ]
    test.each(cases)('Direction: %p, Expected: %p', (dir, expected) => {
      shape.direction = dir
      expect(shape.moveForward()).toEqual(expected)
    })
  })

  describe('should move backward', () => {
    const cases: any[] = [
      [0, { x: 1, y: 3 }],
      [1, { x: 0, y: 2 }],
      [2, { x: 1, y: 1 }],
      [3, { x: 2, y: 2 }]
    ]
    test.each(cases)('Direction: %p, Expected: %p', (dir, expected) => {
      shape.direction = dir
      expect(shape.moveBackwards()).toEqual(expected)
    })
  })
})
