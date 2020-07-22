import React from 'react'

function showSol(moves) {
    if(moves === 0)
        return (<span className='mr-4'>DNS</span>);
    else if(moves < 0)
        return (<span className='mr-4'>DNF</span>);
    else
        return (<span className='mr-4'>{moves}</span>);
}

function hasTime(startTime) {
    return startTime + 3.6e+6 - Date.now() > 0;
}

export {showSol, hasTime};