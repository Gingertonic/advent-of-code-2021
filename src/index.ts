import { fetchInput } from './utils';
import * as Puzzles from './puzzles';

export interface RunnerFunc {
    (input: string): string
}

interface PuzzleIO {
    pid: string,
    runner: RunnerFunc,
    input: string,
    output?: string
}

const funcs = Object.entries(Puzzles).sort()

const arg: number = parseInt(process.argv.slice(2)[0])
start(arg)

async function start(puzzleNum: number):Promise<void> {
    try {
        const data: string = await fetchInput(puzzleNum)
        const puzzle: PuzzleIO = {
            pid: `Puzzle ${puzzleNum}`,
            runner: funcs[puzzleNum - 1][1],
            input: data
        }
        puzzle.output = puzzle.runner(puzzle.input)
        console.log(`${puzzle.pid} answer is: ${puzzle.output}`)
    } catch (e) {
        console.log('That puzzle is not available yet!');
    }
}

