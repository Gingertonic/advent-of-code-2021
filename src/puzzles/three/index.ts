import { RunnerFunc, Puzzle } from '../..'
import testData from './testData'

interface Rates {
    gamma: number,
    epsilon: number
}

interface Gases {
    o2: number,
    co2: number
}

export const run: RunnerFunc = (puzzle: Puzzle): void  => {
    puzzle.input ||= testData
    const input: string[] = transformData(puzzle.input)
    const rates: Rates = runPartOne(input)
    puzzle.outputP1 = (rates.gamma * rates.epsilon).toString()
    const gases: Gases = runPartTwo(input)
    puzzle.outputP2 = (gases.o2 * gases.co2).toString()
}

function transformData(data: string): string[] {
    return data.split('\n').filter(i => i !== '')
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

function runPartTwo(input: string[]): Gases {
    let o2Nums: string[] = input
    let co2Nums: string[] = input

    let o2Rounds = 0
    while(o2Nums.length > 1){
        o2Nums = whittleDown(o2Nums, true, o2Rounds) 
        o2Rounds++
    }

    let co2Rounds = 0
    while(co2Nums.length > 1){
        co2Nums = whittleDown(co2Nums, false, co2Rounds)
        co2Rounds++  
    }
    console.log(co2Nums);

    const gases: Gases = {
        o2: parseInt(o2Nums[0], 2),
        co2: parseInt(co2Nums[0], 2)
    }

    return gases
}

function whittleDown(input: string[], byMostCommon: boolean, position: number): string[] {
    let cols: string[][] = mapColVals(input)
    let numOnes: number = cols[position].filter((p: string) => p === "1").length

    let mostCommon = (numOnes >= input.length - numOnes) ? "1" : "0"
    
    let filtered: string[]

    if (byMostCommon) {
        filtered = input.filter(binString => binString.charAt(position) === mostCommon)
    } else {
        filtered = input.filter(binString => binString.charAt(position) !== mostCommon)
    }
    
    return filtered.length ? filtered : input
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