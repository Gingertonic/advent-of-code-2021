import { RunnerFunc, Puzzle } from '../..'
import testData from './testData'

interface Coords {
    x: number,
    y: number,
    aim?: number
}

export const run: RunnerFunc = (puzzle: Puzzle): void  => {
    puzzle.input ||= testData
    const dirs: any[]  = transformData(puzzle.input)
    const coordsP1: Coords = { x: 0, y: 0}
    runPartOne(dirs, coordsP1)
    puzzle.outputP1 = (coordsP1.x * coordsP1.y).toString()
    const coordsP2: Coords = { x: 0, y: 0, aim: 0 }
    runPartTwo(dirs, coordsP2)
    puzzle.outputP2 = (coordsP2.x * coordsP2.y).toString()
}

function transformData(data: string): any[] {
    return data.split('\n').map(l => l.split(" "))
}

function runPartOne(dirs: any[], coords: Coords): void {
    dirs.reduce((prev: Coords, [dir, mvmt]: [string, string]) => {
        switch(dir){
            case 'up':
                coords.y = coords.y - parseInt(mvmt); break;
            case 'down':
                coords.y = coords.y + parseInt(mvmt); break;
            case 'forward':
                coords.x = coords.x + parseInt(mvmt); break;
        }
        return coords
    }, coords)
}

function runPartTwo(dirs: any[], coords: Coords): void {
    dirs.reduce((prev: Coords, [dir, x]: [string, string]) => {
        const mvmt: number = parseInt(x)
        switch(dir){
            case 'up':
                coords.aim = coords.aim - mvmt; break;
            case 'down':
                coords.aim = coords.aim + mvmt; break;
            case 'forward':
                coords.x = coords.x + parseInt(mvmt);
                coords.y = coords.y + (coords.aim * mvmt); break;
        }
        return coords
    }, coords)
}