import React from 'react'
import LoadingView from './loadingView'
import showSol from '../functions/func'
import UserSolutions from './userSolutions'
import '../css/prevResults.css'

class PrevResults extends React.Component {
    constructor(props) {
        super(props);

        this.state = {resData: [], fetchedData: false, display: 0};
        this.getMore = this.getMore.bind(this);

        this.fetch1 = 'http://localhost:9000/prevRes';
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
        fetch('http://localhost:9000/prevRes/', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({skip: this.state.resData.length})
        })
        .then(res => res.json())
        .then(data => this.setState({resData: this.state.resData.concat(data)}))
        .catch(e => alert('Critical error :('));
    }

    render() {
        if(this.state.fetchedData)
            return (
                <div id='prev-results'>
                    <ResTable changeDisplay={(n) => this.setState({display: n})} data={this.state.resData}/>
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

    displayAll() {
        let all = [];

        this.props.data.forEach((elem, index)  => {
            console.log(elem);
            all.push(
                <tr onClick={() => this.props.changeDisplay(index)}>
                    <td>{elem.position}</td>
                    <td><p>{elem.name} {elem.surname}</p></td>
                    <td>{elem.comb1.moves}</td>
                    <td>{elem.comb2.moves}</td>
                    <td>{elem.comb3.moves}</td>
                    <td>{elem.average}</td>
                    <td>{elem.lowest}</td>
                </tr>
            );
        })
        return all;
    }

    configResize() {
        let windowHeight = window.innerHeight;
        //windowHeight must be converted to div#display-all height
        //value
        let theadHeight = document.getElementById('thead').clientHeight

        if(window.innerWidth > 830)
            document.getElementById('tbody').style.maxHeight = `${windowHeight*0.70 - theadHeight}px`;
        else
            document.getElementById('tbody').style.maxHeight= `${windowHeight*0.40 - theadHeight*3}px`
    }

    render() {
        return (
            <div id='table-container'>
                <table id='table'>
                    <thead id='thead'>
                        <tr>
                            <th>Position</th>
                            <th>Name</th>
                            <th>Challenge 1</th>
                            <th>Challenge 2</th>
                            <th>Challenge 3</th>
                            <th>Average</th>
                            <th>Lowest</th>
                        </tr>
                    </thead>
                    <tbody id='tbody'>
                        {this.displayAll()}
                    </tbody>
                </table>
            </div>
        );
    }

}

export default PrevResults;