import React from 'react'
import SolPanel from './dataModifiy'
import '../css/dashboardActual.css'

class ChallengeData extends React.Component {
    constructor(props) {
        super(props);

        //this.props.challenges
        //this.props.resData
        //this.props.comb
        this.state = {showPanel: false}
        this.handleChange = this.handleChange.bind(this);
        this.updateResponse = this.updateResponse.bind(this);
    }

    handleChange() {
        this.setState(state => ({
            showPanel: !state.showPanel
        }))
    }

    updateResponse(newResponse) {
        let res = this.props.resData;

        if(res[this.props.comb] != newResponse) {
            res[this.props.comb] = newResponse;

            fetch('http://localhost:9000/challData/submitResponse', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(res)
            })
            .then(this.handleChange())
            .catch(e => alert('An error occured')); 
        } else
            this.handleChange()
    }

    render() {
        return (
            <div className='challengeData'>
                <div className='challengeComb'>  
                    <p>{this.props.challenge}</p>
                </div>
                {this.props.resData[this.props.comb] == '' ?
                    <button className='bton-load-sol not-loaded' onClick={this.handleChange}>Load solution</button>:
                    <button className='bton-load-sol loaded-sol' onClick={this.handleChange}>See solution</button>
                }
                {this.state.showPanel &&
                    <SolPanel handleChange={this.handleChange} updateResponse={this.updateResponse} uRes={this.props.resData[this.props.comb]}/>
                }
            </div>
        );
    }
}

class DashboardActual extends React.Component {
    constructor() {
        super();
        this.state = {challenges: {}, userResponse: {}, viewSol: 0};

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
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            credentials: 'include',
        };
    }

    componentDidMount() {
        Promise.all([fetch(this.fetch1url, this.fetch1Props), fetch(this.fetch2url, this.fetch2Props)])
        .then(([res1, res2]) => Promise.all([res1.json(), res2.json()]))
        .then(([challenge, uRes]) => this.setState({challenges: challenge, userResponse: uRes}));

        console.log(this.state.challenges);
    }

    render() {
        return(
            <div id='dashboard'>
                <ChallengeData challenge={this.state.challenges.comb1} updateState={this.updateState} resData={this.state.userResponse} comb={'comb1'}/>
                <ChallengeData challenge={this.state.challenges.comb2} updateState={this.updateState} resData={this.state.userResponse} comb={'comb2'}/>
                <ChallengeData challenge={this.state.challenges.comb3} updateState={this.updateState} resData={this.state.userResponse} comb={'comb3'}/>
            </div>
        );
    }
}

export default DashboardActual;