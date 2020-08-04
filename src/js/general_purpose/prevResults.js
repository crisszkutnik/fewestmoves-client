import React from 'react'
import LoadingView from './loadingView'
import {showSol} from '../../functions/func'
import UserSolutions from './userSolutions'
import 'simplebar/dist/simplebar.min.css';
import {Table} from 'react-bootstrap'

class PrevResults extends React.Component {
    constructor(props) {
        super(props);

        this.state = {resData: [], fetchedData: false, display: 0};
        this.getMore = this.getMore.bind(this);

        this.fetch1 = '/prevRes';
        this.fetch2 = '/challData/getAllScrambles';

        this.headers = {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            credentials: 'include'
        };
    }

    componentWillMount() {
        Promise.all([fetch(this.fetch1, this.headers), fetch(this.fetch2, this.headers)])
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
        //this.configResize = this.configResize.bind(this);
    }

    componentDidMount() {
   //     window.addEventListener('resize', this.configResize);

     //   this.configResize();
    }

    componentWillUnmount() {
       // window.removeEventListener('resize', this.configResize);
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

            let moves1 = showSol(elem.comb1);
            let moves2 = showSol(elem.comb2);
            let moves3 = showSol(elem.comb3);

            let average;

            /*
            Verify that the item exists. Then verify if it is greater than zero
            */
            if(elem.comb1 && elem.comb2 && elem.comb3 && elem.comb1.moves > 0 && elem.comb2.moves > 0 && elem.comb3.moves > 0)
                // Check if number is float or integer
                average = elem.average % 1 === 0 ? elem.average : elem.average.toFixed(2);
            else
                average = 'DNF';

            all.push(
                <tr onClick={() => this.props.changeDisplay(index)} key={index} className={className}>
                    <td>{elem.position}</td>
                    <td>{elem.name}</td>
                    <td>{moves1}</td>
                    <td>{moves2}</td>
                    <td>{moves3}</td>
                    <td>{average}</td>
                    <td>{elem.lowest}</td>
                </tr>
            )
        })
        return all;
    }

    render() {
        let width = window.innerWidth;

        return (
            <div id='table-container'>
                <Table>
                    <thead>
                        <tr>
                            <th>{width < 576 ? "Pos." : "Position"}</th>
                            <th>Name</th>
                            <th>{width < 576 ? "Scr. 1" : "Scramble 1"}</th>
                            <th>{width < 576 ? "Scr. 2" : "Scramble 2"}</th>
                            <th>{width < 576 ? "Scr. 3" : "Scramble 3"}</th>
                            <th>Mean</th>
                            <th>Single</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.displayAll()}
                    </tbody>
                </Table>
            </div>
        );
    }

}

export default PrevResults;