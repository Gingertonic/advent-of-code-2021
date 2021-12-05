import { fetchInput } from './utils';
import * as Puzzles from './puzzles';

export interface RunnerFunc {
    (input: Puzzle): void
}

export interface Puzzle {
    pid: string,
    runner: RunnerFunc,
    input?: string,
    outputP1?: string,
    outputP2?: string
}

const funcs = Object.entries(Puzzles).sort()

const args: any[] = process.argv.slice(2)
start(args)

async function start(args: any[]):Promise<void> {
    try {
        const [ puzzleNum, useRealData ] = args
        const puzzle: Puzzle = {
            pid: `Puzzle ${puzzleNum}`,
            runner: funcs[puzzleNum - 1][1],
        }
        puzzle.input = useRealData && await fetchInput(puzzleNum)
        puzzle.runner(puzzle)
        console.log(`${puzzle.pid} part 1 answer is: ${puzzle.outputP1}`)
        console.log(`${puzzle.pid} part 2 answer is: ${puzzle.outputP2}`)
    } catch (e) {
        console.log(e);
        console.log('That puzzle is not available yet!');
    }
}

