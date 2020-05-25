import React from 'react'
import '../css/submitted.css'
import LoadingView from './loadingView'

//Receives this.props.combinations[comb]
function extendedSolutionView(combination) {
    let solution, explanation;

    if(combination.moves === 0) {
        solution = 'DNS';
        explanation = "";
    }
    else {
        solution = combination.sol;
        explanation = combination.explanation;
    }

    return (
        <div className='see-all'>
            <h1>Solution</h1>
                <p >{solution}</p>
            <h1>Explanation</h1>
                <textarea readOnly value={explanation}></textarea>
        </div>
    );
}

function showSol(moves) {
    if(moves === 0)
        return <p>DNS</p>
    else if(moves < 0)
        return <p>DNF</p>
    else
        return <p>{moves}</p>
}

class ExtendedView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {selected: 1};
        this.changeSelected = this.changeSelected.bind(this);
    }

    changeSelected(newValue) {
        this.setState({selected: newValue});
    }

    render() {
        let actualSelected = this.state.selected;
        return(
        <div className='extended-view'>
            <div className='navigation'>
                {actualSelected === 1 ? <button className='selected'>Challenge 1</button> : <button onClick={() => this.changeSelected(1)}>Challenge 1</button>}
                {actualSelected === 2 ? <button className='selected'>Challenge 2</button> : <button onClick={() => this.changeSelected(2)}>Challenge 2</button>}
                {actualSelected === 3 ? <button className='selected'>Challenge 3</button> : <button onClick={() => this.changeSelected(3)}>Challenge 3</button>}
            </div>
            {extendedSolutionView(this.props.combinations[`comb${actualSelected}`])}
        </div>  
        );
    }
}

class UserResponse extends React.Component {
    constructor(props) {
        super(props);
        this.state = {completePanel: false};
    }

    render() {
        return(
            <div className='other-user-res'>
            <div className='fast-view-panel'>
                <h1 className='user-name'>{this.props.userData.name} {this.props.userData.surname}</h1>
                <div className='results'> 
                    <p>{showSol(this.props.userData.comb1.moves)}</p>
                    <p>{showSol(this.props.userData.comb2.moves)}</p>
                    <p>{showSol(this.props.userData.comb3.moves)}</p>
                </div>
                <div className='button'>
                    <span onClick={() => this.setState({completePanel: !this.state.completePanel})}>See solutions</span>
                </div>
            </div>
            {this.state.completePanel &&
                <ExtendedView combinations={this.props.userData}/>
            }
            </div>
        );
    }
}

class SubmittedSol extends React.Component {
    constructor(props) {
        super(props);
        this.state = {amountReceived: 0, info: [], fetchedData: false}
        this.renderMore = this.renderMore.bind(this);
        this.renderAll = this.renderAll.bind(this);
    }

    //Renders all stored responses on state
    renderAll() {
        let renderLeft = [];
        let renderRight = [];

        let half = Math.ceil(this.state.info.length / 2);

        this.state.info.forEach((elem, index) => {

            if(index < half)
                renderLeft.push(<UserResponse userData={elem} />);
            else
                renderRight.push(<UserResponse userData={elem} />);
        })

        return [<div className='side-container'>{renderLeft}</div>, <div className='side-container'>{renderRight}</div>];
    }

    componentDidMount() {
        this.renderMore();
    }

    //Loads 10 elements from the user responses
    renderMore() {
        fetch('http://localhost:9000/allRes/otherUsers', {
            method: 'POST',
            headers: {
            	'Accept': 'application/json',
            	'Content-Type': 'application/json'
			},
			credentials: 'include',
			body: JSON.stringify({skip: this.state.amountReceived})
        })
        .then(res => res.json())
        .then(usersRes => {
            setTimeout(() => this.setState({amountReceived: this.state.amountReceived + 10, info: this.state.info.concat(usersRes), fetchedData: true}), 400)
        });
    }

    render() {
        if(this.state.fetchedData)
            return (
                <div id='dashboard-submitted'>
                    <div id='all-responses'>
                        {this.renderAll()}
                    </div>
                    <div id='last-button'><button onClick={this.renderMore}>Load more</button></div>
                </div>
            );
        else
            return (<LoadingView />);
    }
}
export default SubmittedSol;