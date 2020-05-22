import React from 'react'
import SolPanel from './dataModifiy'
import '../css/dashboardActual.css'
import {isSolved} from '../functions/cubeSolve'

class ChallengeData extends React.Component {
    constructor(props) {
        super(props);

        this.state = {showPanel: false}
        this.handleChange = this.handleChange.bind(this);
        this.updateResponse = this.updateResponse.bind(this);
    }

    handleChange() {
        this.setState(state => ({
            showPanel: !state.showPanel
        }));
    }

    updateResponse(newResponse, newExplanation) {
        let newRes = this.props.resData;

        if(newResponse !== newRes[this.props.comb].sol || newExplanation !== newRes[this.props.comb].explanation) {
            let movements;

            if(newResponse === '')
                movements = 0;
            else
                movements = isSolved(this.props.challenge, newResponse);

                newRes[this.props.comb].sol = newResponse;
                newRes[this.props.comb].explanation = newExplanation;
                newRes[this.props.comb].moves = movements;

                fetch('http://localhost:9000/challData/submitResponse', {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify(newRes)
                })
                .then(() => {
                    this.setState({correctResponse: false});
                    this.handleChange();
                })
                .catch(e => alert('An error occured'));
        } else 
            this.handleChange();
    }

    render() {
        let showButton;

        if(this.props.resData[this.props.comb].moves === 0)
            showButton = <button className='bton-load-sol not-loaded' onClick={this.handleChange}>Load solution</button>;
        else if(this.props.resData[this.props.comb].moves > 0)
            showButton = <button className='bton-load-sol loaded-sol' onClick={this.handleChange}>See solution</button>;
        else
            showButton = <button className='bton-load-sol incorrect-sol' onClick={this.handleChange}>Incorrect solution</button>;

        return (
            <div className='challengeData'>
                <div className='challengeComb'>  
                    <p>{this.props.challenge}</p>
                </div>
                {showButton}
                {this.state.showPanel &&
                    <SolPanel handleChange={this.handleChange} updateResponse={this.updateResponse} uExp={this.props.resData[this.props.comb].explanation} uRes={this.props.resData[this.props.comb].sol}/>
                }
            </div>
        );
    }
}

class DashboardActual extends React.Component {
    constructor() {
        super();
        this.state = {challenges: {}, userResponse: {}, viewSol: 0, loaded: false};

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

    componentWillMount() {
        Promise.all([fetch(this.fetch1url, this.fetch1Props), fetch(this.fetch2url, this.fetch2Props)])
        .then(([res1, res2]) => Promise.all([res1.json(), res2.json()]))
        .then(([challenge, uRes]) => {
            this.setState({challenges: challenge, userResponse: uRes, loaded: true})
        });
    }

    render() {
        if(this.state.loaded) 
            return(
                <div id='dashboard'>
                    <ChallengeData challenge={this.state.challenges.comb1} resData={this.state.userResponse} comb={'comb1'}/>
                    <ChallengeData challenge={this.state.challenges.comb2} resData={this.state.userResponse} comb={'comb2'}/>
                    <ChallengeData challenge={this.state.challenges.comb3} resData={this.state.userResponse} comb={'comb3'}/>
                </div>
            );
        else
            return (<h1>Loading</h1>);
    }
}

export default DashboardActual;