import { Shape, Table } from './objects'
import { init, run } from './simulation'

describe('Simulation', () => {
  test('should init table and object', () => {
    const header = [4, 4, 2, 3]
    const expectedTable = { x: 4, y: 4 }
    const expectedObj = { x: 2, y: 3 }
    const [table, obj] = init(header)

    expect(table).toBeInstanceOf(Table)
    expect(table.dimensions).toEqual(expectedTable)
    expect(obj).toBeInstanceOf(Shape)
    expect(obj.coordinates).toEqual(expectedObj)
  })
  describe('Moving', () => {
    // Setup
    let table: Table
    let shape: Shape
    beforeEach(() => {
      table = new Table({ x: 4, y: 4 })
      shape = new Shape({ x: 1, y: 2 })
    })

    const cases: any[] = [
      [[1, 3, 1, 3, 1, 4, 1, 3, 2, 2], '[3, 0]'],
      [[1, 3, 1, 3, 1, 0, 1, 3, 2, 2], '[2, 2]'],
      [[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], '[-1, -1]']
    ]
    test.each(cases)('Moves: %p. Expected: %p', (moves, expected) => {
      expect(run(table, shape, moves)).toEqual(expected)
    })
  })
})
