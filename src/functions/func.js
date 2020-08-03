import React from 'react'

function showSol(comb, margin) {
    let className = margin ? 'mr-4' : '';

    if(comb) {
        if(comb.moves <= 0)
            return (<span className={className}>DNF</span>);
        else
            return (<span className={className}>{comb.moves}</span>);
    } else {
        return (<span className={className}>DNS</span>)
    }
}

function hasTime(startTime) {
    return startTime + 3.6e+6 - Date.now() > 0;
}

export {showSol, hasTime};