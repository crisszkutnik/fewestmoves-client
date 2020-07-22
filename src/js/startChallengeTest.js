import React from 'react'

class Test extends React.Component {
    constructor() {
        super();
    }

    componentDidMount() {
        fetch('http://localhost:9000/newChallData/modifyChallenge', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            credentials: 'include',
            //body: JSON.stringify({reqComb: 'comb3'})
            body: JSON.stringify({
                reqComb: 'comb2',
                modComb: {
                    sol: 'This must not appear',
                    explanation: 'hello there'
                }
            })
        })
        //.then(res => res.json())
        //.then(data => console.log(data));
    }

    render() {
        return(<h1>Test</h1>);
    }
}

export default Test;