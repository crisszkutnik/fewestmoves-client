import React from 'react'
import '../css/dashboardActual.css'

class ChallengeData extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='challengeData'>
                <div className='challengeComb'>  
                    <p>{this.props.combData}</p>
                </div>
                <button className='bton-load-sol'>
                    Load solution
                </button>
            </div>
        );
    }
}

class DashboardActual extends React.Component {
    constructor() {
        super();
        this.state = {challenges: {}}
    }

    componentDidMount() {
        fetch('http://localhost:9000/getChallenge', {
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
            .then(res => res.json())
            .then(challenge => this.setState({challenges: challenge}));
    }

    render() {
        return(
            <div id='dashboard'>
                <ChallengeData combData={this.state.challenges.comb1} />
                <ChallengeData combData={this.state.challenges.comb2} />
                <ChallengeData combData={this.state.challenges.comb3} />
            </div>
        );
    }
}

export default DashboardActual