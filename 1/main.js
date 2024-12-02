const fs = require('fs');

console.log('Part 1:', part1());
console.log('Part 2:', part2());

function part1() {
    const numbers = getNumbers();

    numbers.start.sort((a, b) => a - b);
    numbers.end.sort((a, b) => a - b);

    return numbers.start.reduce((acc, num, i) => {
        return acc + Math.abs(num - numbers.end[i]);
    }, 0);
}

function part2() {
    const numbers = getNumbers();

    return numbers.start.reduce(
        (acc, num) => acc + num * numbers.end.reduce((endAcc, endNum) => (num === endNum ? endAcc + 1 : endAcc), 0),
        0
    );
}

/** @returns {{ start: number[], end: number[] }} */
function getNumbers() {
    /** @type {{ start: number[], end: number[] }} */
    const initial = { start: [], end: [] };

    return getLines().reduce((acc, line) => {
        const [start, end] = line.split(' ').filter(Boolean);
        acc.start.push(parseInt(start, 10));
        acc.end.push(parseInt(end, 10));
        return acc;
    }, initial);
}

function getLines() {
    return fs.readFileSync('./input.txt', 'utf8').split('\n').filter(Boolean);
}
