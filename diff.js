'use strict';

function caculateLcsLengthAndPosition(fromArray, toArray) {
    const caculaleCurrentValueAndFromPosition = function (fromArray, toArray, lengthTable, f, t) {
        if (fromArray[f] === toArray[t]) {
            if (f === 0 || t === 0) {
                return {
                    value: 1,
                    fromPosition: '↖'
                };
            } else {
                return {
                    value: lengthTable[f - 1][t - 1] + 1,
                    fromPosition: '↖'
                };
            }
        } else {
            if (f === 0 && t === 0) {
                return {
                    value: 0,
                    fromPosition: '↑'
                };
            } else if (f === 0) {
                if (lengthTable[f][t - 1] > 0) {
                    return {
                        value: lengthTable[f][t - 1],
                        fromPosition: '←'
                    };
                } else {
                    return {
                        value: 0,
                        fromPosition: '↑'
                    };
                }
            } else if (t === 0) {
                return {
                    value: lengthTable[f - 1][t],
                    fromPosition: '↑'
                };
            } else {
                if (lengthTable[f - 1][t] >= lengthTable[f][t - 1]) {
                    return {
                        value: lengthTable[f - 1][t],
                        fromPosition: '↑'
                    };
                } else {
                    return {
                        value: lengthTable[f][t - 1],
                        fromPosition: '←'
                    };
                }
            }
        }
    }

    if (fromArray.length === 0 || toArray.length === 0) {
        return {
            lengthTable: [],
            positionTable: []
        };
    }

    const lengthTable = [];
    const positionTable = [];
    for (let i = 0; i < fromArray.length; i++) {
        lengthTable[i] = [];
        positionTable[i] = [];
    }

    for (let f = 0; f < fromArray.length; f++) {
        for (let t = 0; t < toArray.length; t++) {
            const currentResult = caculaleCurrentValueAndFromPosition(fromArray, toArray, lengthTable, f, t);
            lengthTable[f][t] = currentResult.value;
            positionTable[f][t] = currentResult.fromPosition;
        }
    }

    return {
        lengthTable: lengthTable,
        positionTable: positionTable
    };
};

function backLcsArray(positionTable, fromArray, lcsArray, f, t) {
    if (f < 0 || t < 0) return;

    if (positionTable[f][t] === '↖') {
        lcsArray.unshift(fromArray[f]);
        backLcsArray(positionTable, fromArray, lcsArray, f - 1, t - 1);
    } else if (positionTable[f][t] === '↑') {
        backLcsArray(positionTable, fromArray, lcsArray, f - 1, t);
    } else {
        backLcsArray(positionTable, fromArray, lcsArray, f, t - 1);
    }

    return lcsArray;
}

function diff(fromArray, toArray) {
    const lcsLengthAndPosition = caculateLcsLengthAndPosition(fromArray, toArray);
    const lcsArray = backLcsArray(lcsLengthAndPosition.positionTable, fromArray, [], fromArray.length - 1, toArray.length - 1);

    const fromWithDiff = [];
    const toWithDiff = [];
    for (let line of lcsArray) {
        while (line !== fromArray[0]) {
            fromWithDiff.push(`+${fromArray.shift()}`);
        }

        while (line !== toArray[0]) {
            toWithDiff.push(`-${toArray.shift()}`);
        }

        fromWithDiff.push(` ${line}`);
        toWithDiff.push(` ${line}`);

        fromArray.shift();
        toArray.shift();
    }

    if (fromArray.length > 0) {
        for (let line of fromArray) {
            fromWithDiff.push(`+${line}`);
        }
    }

    if (toArray.length) {
        for (let line of toArray) {
            toWithDiff.push(`-${line}`);
        }
    }

    return {
        fromWithDiff: fromWithDiff,
        toWithDiff: toWithDiff
    }
}

module.exports = diff;
