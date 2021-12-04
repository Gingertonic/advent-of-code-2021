import { RunnerFunc, Puzzle } from '../..'
import testData from './testData'

export const run: RunnerFunc = (puzzle: Puzzle): void  => {
    puzzle.input ||= testData
    const input = transformData(puzzle.input)
    const increasesP1: number = runPartOne(input)
    puzzle.outputP1 = increasesP1.toString()
    const increasesP2: number = runPartTwo(input)
    puzzle.outputP2 = increasesP2.toString()
    
}

function transformData(data: string): number[] {
    return data.split('\n').map(i => parseInt(i))
}

function runPartOne(input: number[]): number {
    const mapIncreases: number = input.slice(1).reduce((acc: number, current: number, idx: number) => {
        return current > input[idx] ? acc + 1 : acc;
    }, 0)
    return mapIncreases;
}

function runPartTwo(input: number[]): number {
    const windowSums: number[] = []
    
    input.forEach((x, idx) => {
        if(idx > (input.length - 3)) { return };
        windowSums.push(x + input[idx + 1] + input[idx + 2])
    })
    
    return runPartOne(windowSums);
}