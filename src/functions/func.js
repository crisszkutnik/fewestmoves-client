import React from 'react'

function showSol(moves) {
    if(moves === 0)
        return (<span>DNS</span>);
    else if(moves < 0)
        return (<span>DNF</span>);
    else
        return (<span>{moves}</span>);
}

export default showSol;