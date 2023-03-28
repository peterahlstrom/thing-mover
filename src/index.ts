import { init, run } from './simulation'

process.stdin.on('data', (data) => {
  const inputArray = data.toString().split(',')
  const input = inputArray.map((x) => parseInt(x))

  const [header, moves] = [input.slice(0, 4), input.slice(4)]
  const [table, obj] = init(header)

  const result = run(table, obj, moves)
  process.stdout.write(result)
})
