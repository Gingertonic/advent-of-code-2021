import { RunnerFunc } from '../..'
import testData from './testData'

interface Coords {
    x: number,
    y: number,
    mult?: number
}

export const run: RunnerFunc = (data: string | undefined): string  => {
    data ||= testData
    const dirs: any[]  = transformData(data)
    const coords: Coords = { x: 0, y: 0}
    runDirections(dirs, coords)
    coords.mult = coords.x * coords.y
    return coords.mult.toString()
}

function transformData(data: string): any[] {
    return data.split('\n').map(l => l.split(" "))
}

function runDirections(dirs: any[], coords: Coords): void {
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