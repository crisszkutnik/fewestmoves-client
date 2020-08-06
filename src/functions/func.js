import React from 'react'

function showSol(moves, margin) {
    let className = margin ? 'mr-4' : '';

    if(moves !== undefined) {
        if(moves <= 0)
            return (<span className={className}>DNF</span>);
        else
            return (<span className={className}>{moves}</span>);
    } else {
        return (<span className={className}>DNS</span>)
    }
}

function hasTime(startTime) {
    return startTime + 3.6e+6 - Date.now() > 0;
}

const SetUpDisplay = (elem) => {
    let moves1 = elem.comb1 ? showSol(elem.comb1.moves) : 'DNS';
    let moves2 = elem.comb2 ? showSol(elem.comb2.moves) : 'DNS';
    let moves3 = elem.comb3 ? showSol(elem.comb3.moves) : 'DNS';

    let average;

    /*
    Verify that the item exists. Then verify if it is greater than zero
    This is horrible. Please end my pain
    */
    if(elem.comb1 && elem.comb2 && elem.comb3 && elem.comb1.moves > 0 && elem.comb2.moves > 0 && elem.comb3.moves > 0)
        // Check if number is float or integer
        average = elem.average % 1 === 0 ? elem.average : elem.average.toFixed(2);
    else
        average = 'DNF';

    return [moves1, moves2, moves3, average];
}

export {showSol, hasTime, SetUpDisplay};