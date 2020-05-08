import React from 'react'
import '../css/dashboardActual.css'

class ChallengeData extends React.Component {
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
        this.state = {challenges: {}, viewSol: 0};

        this.fetch1url = 'http://localhost:9000/challData/getChallenge';
        this.fetch1Props = {
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            credentials: 'include',
        };

        this.fetch2url = 'http://localhost:9000/challData/getResponse';
        this.fetch2Props = {
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            credentials: 'include',
        };
    }

    /*componentDidMount() {
        fetch('http://localhost:9000/getChallenge', {
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            credentials: 'include',
        })
            .then(res => res.json())
            .then(challenge => this.setState({challenges: challenge}));
    }*/

    componentDidMount() {
        Promise.all([fetch(this.fetch1url, this.fetch1Props), fetch(this.fetch2url, this.fetch2Props)])
        .then(([res1, res2]) => {
            return [res1.json(), res2.json()];
        })
        .then(([challenge, uResponse]) => this.setState({challenges: challenge}));
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

export default DashboardActual;