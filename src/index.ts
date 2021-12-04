import { fetchInput } from './utils';
import * as Puzzles from './puzzles';

export interface RunnerFunc {
    (input: string | undefined): string
}

interface PuzzleIO {
    pid: string,
    runner: RunnerFunc,
    input?: string,
    output?: string
}

const funcs = Object.entries(Puzzles).sort()

const args: any[] = process.argv.slice(2)
start(args)

async function start(args: any[]):Promise<void> {
    try {
        const [ puzzleNum, useRealData ] = args
        const puzzle: PuzzleIO = {
            pid: `Puzzle ${puzzleNum}`,
            runner: funcs[puzzleNum - 1][1],
        }
        puzzle.input = useRealData && await fetchInput(puzzleNum)
        puzzle.output = puzzle.runner(puzzle.input)
        console.log(`${puzzle.pid} answer is: ${puzzle.output}`)
    } catch (e) {
        console.log('That puzzle is not available yet!');
    }
}

