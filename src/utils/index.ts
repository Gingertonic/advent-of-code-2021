import axios from 'axios';
import * as dotenv from 'dotenv';
dotenv.config();

const token: string = process.env.AOC_SESSION;

export async function fetchInput(day: number): Promise<string> {
    try {
        const options = {
            headers: {
                    'Content-Type': 'text/plain',
                    'Cookie': `session=${token}`
                }
        };
        const { data } = await axios.get(`https://adventofcode.com/2021/day/${day}/input`, options);
        return data
    } catch (e) {
        console.log(e);
        throw Error('Error fetching input, please check output logs for more information')
    }
}