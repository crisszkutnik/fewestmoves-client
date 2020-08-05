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

export {showSol, hasTime};