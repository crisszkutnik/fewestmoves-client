import React from 'react'

class checkEmail extends React.Component {
    constructor(props) {
        super(props)
    }

    componentWillMount() {
        let paramToken = this.props.match.params.token;

        fetch('http://localhost:9000/email/verify', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({token: paramToken})
        })
    }

    render() {
        return (<h1>Hola</h1>);
    }
}

export default checkEmail;