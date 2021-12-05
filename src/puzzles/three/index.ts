import { RunnerFunc, Puzzle } from '../..'
import testData from './testData'

interface Rates {
    gamma: number,
    epsilon: number
}

export const run: RunnerFunc = (puzzle: Puzzle): void  => {
    puzzle.input ||= testData
    const input = transformData(puzzle.input)
    const ratesP1 = runPartOne(input)
    puzzle.outputP1 = (ratesP1.gamma * ratesP1.epsilon).toString()
}

function transformData(data: string): string[] {
    return data.split('\n')
}

function runPartOne(input: string[]): Rates {
    let cols: string[][] = mapColVals(input)
    let numOnes: number[] = countOnes(cols)

    let gammaArr: number[] = []
    let epsilonArr: number[] = []

    for(let colOnes of numOnes){
        if(colOnes > input.length - colOnes){
            gammaArr.push(1)
            epsilonArr.push(0)
        } else {
            gammaArr.push(0)
            epsilonArr.push(1)
        }
    }

    let ratesP1: Rates = {
        gamma: parseInt(gammaArr.join(""), 2),
        epsilon: parseInt(epsilonArr.join(""), 2)
    }

    return ratesP1
}

function mapColVals(input: string[]): string[][] {
    let cols: string[][] = new Array()
    for(let idx: number = 0; idx < input[0].length; idx++){
        cols.push(input.map(binString => binString.charAt(idx)))
    }
    return cols;
}

function countOnes(cols: string[][]): number[] {
    let ones: number[] = new Array()
    for(let col of cols){
        const numOnes = col.filter((p: string) => p === "1").length
        ones.push(numOnes)  
    }
    return ones
}