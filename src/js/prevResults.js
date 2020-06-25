import React from 'react'
import LoadingView from './loadingView'
import showSol from '../functions/func'
import UserSolutions from './userSolutions'
import '../css/prevResults.css'
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';
import {Container, Row, Col} from 'react-bootstrap'

class PrevResults extends React.Component {
    constructor(props) {
        super(props);

        this.state = {resData: [], fetchedData: false, display: 0};
        this.getMore = this.getMore.bind(this);

        this.fetch1 = '/prevRes';
        this.fetch2 = '/challData/getChallenge';

        this.headers = {
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            credentials: 'include'
        };
    }

    componentWillMount() {
        Promise.all([fetch(this.fetch1, Object.assign({method: 'POST'}, this.headers)), fetch(this.fetch2, Object.assign({method: 'GET'}, this.headers))])
        .then(([res1, res2]) => Promise.all([res1.json(), res2.json()]))
        .then(([responses, rChallenges]) => {
            setTimeout(() => this.setState({resData: this.state.resData.concat(responses), fetchedData: true, challenges: rChallenges}), 400);
        });
    }

    getMore() {
        fetch('/prevRes/', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({skip: this.state.resData.length})
        })
        .then(res => res.json())
        .then(data => {
            if(data.length === 0)
                alert('Nothing else to show :(');
            else
                this.setState({resData: this.state.resData.concat(data)});
        })
        .catch(e => alert('Critical error :('));
    }

    render() {
        if(this.state.fetchedData)
            return (
                <div id='prev-results'>
                    <ResTable changeDisplay={(n) => this.setState({display: n})} data={this.state.resData} getMore={this.getMore} display={this.state.display}/>
                    <UserSolutions userSol={this.state.resData[this.state.display]} challenges={this.state.challenges}/>
                </div>
            );
        else
            return (<LoadingView />);
    }
}

class ResTable extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {};
        this.displayAll = this.displayAll.bind(this);
        this.configResize = this.configResize.bind(this);
    }

    componentDidMount() {
        window.addEventListener('resize', this.configResize);

        this.configResize();
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.configResize);
    }

    configResize() {
        let displayAllHeight = document.getElementById('display-all').offsetHeight;
        let theadHeight = document.getElementById('thead').offsetHeight;

        this.setState({maxHeight: displayAllHeight - theadHeight});
    }


    displayAll() {
        let all = [];

        this.props.data.forEach((elem, index)  => {
            let className = 'table-row';

            if(index === this.props.display)
                className += ' selected';

            let moves1 = showSol(elem.comb1.moves);
            let moves2 = showSol(elem.comb2.moves);
            let moves3 = showSol(elem.comb3.moves);

            console.log(elem);

            all.push(
                <Row className={className} onClick={() => this.props.changeDisplay(index)} key={index}>
                    <Col xs="1">{elem.position}</Col>
                    <Col xs="3"><p>{elem.name}</p></Col>
                    <Col xs="2">{moves1}</Col>
                    <Col xs="2">{moves2}</Col>
                    <Col xs="2">{moves3}</Col>
                    <Col xs="1">{(elem.comb1.moves !== 0 && elem.comb2.moves !== 0 && elem.comb3.moves !== 0) ? elem.average : 'DNF'}</Col>
                    <Col xs="1">{elem.lowest}</Col>
                </Row>
            );
        })
        return all;
    }

    render() {
        return (
            <div className='fade-in' id='table-container'>
                <Container id='table-head'>
                    <Row id='thead'>
                        <Col xs="1">Pos.</Col>
                        <Col xs="3">Name</Col>
                        <Col xs="2">Scramble 1</Col>
                        <Col xs="2">Scramble 2</Col>
                        <Col xs="2">Scramble 3</Col>
                        <Col xs="1">Mean</Col>
                        <Col xs="1">Single</Col>
                    </Row>
                </Container>
                <SimpleBar id='simple-bar' style={{maxHeight: `${this.state.maxHeight}px`}}>
                    <Container id='table-body'>
                        {this.displayAll()}
                        <Row id='end-button'>
                            <Col>
                                <button onClick={() => this.props.getMore()}>Load more</button>
                            </Col>
                        </Row>
                    </Container>
                </SimpleBar>
            </div>
        );
    }

}

export default PrevResults;