import React from 'react'
import LoadingView from './loadingView'
import UserSolutions from './userSolutions'
import {showSol} from '../../functions/func'
import {Container, Row, Col} from 'react-bootstrap'
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';

class SubmittedSol extends React.Component {
    constructor(props) {
        super(props);
        this.state = {amountReceived: 0, info: [], fetchedData: false, display: 0, challenges: {}, userRes: {}};
        this.getMore = this.getMore.bind(this);
        this.changeDisplayInfo = this.changeDisplayInfo.bind(this);
        this.renderNames = this.renderNames.bind(this);

        this.fetch1 = '/allRes/otherUsers';
        this.fetch2 = '/challData/getAllScrambles';
        this.fetch3 = '/challData/getChallengeData'

        this.headers = {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            credentials: 'include',
        };
    }

    changeDisplayInfo(newElement) {
        this.setState({display: newElement});
    } 

    componentWillMount() {
        Promise.all([fetch(this.fetch1, this.headers), fetch(this.fetch2, this.headers), fetch(this.fetch3, this.headers)])
        .then(([res1, res2, res3]) => Promise.all([res1.json(), res2.json(), res3.json()]))
        .then(([responses, rChallenges, uData]) => {
            setTimeout(() => this.setState({info: responses, fetchedData: true, challenges: rChallenges, userRes: uData}), 400);
        });
    }

    renderNames() {
        let all = [];

        this.state.info.forEach((elem, index) => {
            let divClass;

            if(this.state.display === index)
                divClass = 'user-data selected';
            else
                divClass= 'user-data';

            all.push(
                <div onClick={() => this.changeDisplayInfo(index)} className={divClass} key={index}>
                    <Row>
                        <Col>
                            <h2>{elem.name}</h2> 
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <p>
                                {showSol(elem.comb1, true)}
                                {showSol(elem.comb2, true)}
                                {showSol(elem.comb3, true)}
                            </p>
                        </Col>
                    </Row>
                </div>
            )
        })

        return all;
    }

    //Loads 10 elements from the user responses
    getMore() {
        fetch('/allRes/otherUsers', {
            method: 'POST',
            headers: {
            	'Accept': 'application/json',
            	'Content-Type': 'application/json'
			},
			credentials: 'include',
			body: JSON.stringify({skip: this.state.info.length})
        })
        .then(res => res.json())
        .then(usersRes => {
            this.setState({info: this.state.info.concat(usersRes)})
        });
    }

    render() {
        if(this.state.fetchedData)
            if(this.state.info.length === 0)
                return(<div id='dashboard-submitted'><h1 style={{color: 'white'}}>Nothing loaded yet!</h1></div>);
            else
                return (
                    <div id='dashboard-submitted'>
                        <div className='fade-in' id='see-users'>
                            <SimpleBar id='simple-bar'>
                                <Container id='user-container'>
                                        {this.renderNames()}       
                                </Container>
                            </SimpleBar>
                            <div id='load-button'>
                                <button onClick={this.getMore}>Load more</button>
                            </div>
                        </div>
                        <UserSolutions loggedData={this.state.userRes} userSol={this.state.info[this.state.display]} canBlur={true} challenges={this.state.challenges} />
                    </div>
                );
        else
            return (<LoadingView />);
    }
}

export default SubmittedSol;