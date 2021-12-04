import { RunnerFunc } from '../../'

export const run: RunnerFunc = (data: string): string  => {
    const input = transformData(data)
    const increases: number = countIncreases(input)
    return increases.toString();
}

function transformData(data: string): number[] {
    return data.split('\n').map(i => parseInt(i))
}

function countIncreases(input: number[]): number {
    const mapIncreases: number = input.slice(1).reduce((acc: number, current: number, idx: number) => {
        return current > input[idx] ? acc + 1 : acc;
    }, 0)
    return mapIncreases;
}