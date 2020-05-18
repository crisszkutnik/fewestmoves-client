import React from 'react'
import '../css/submitted.css'

class SubmittedSol extends React.Component {
    constructor(props) {
        super(props);
        this.state = {amountReceived: 0, info: [], fetchedData: true, completePanel: false}
        this.renderMore = this.renderMore.bind(this);
        this.renderAll = this.renderAll.bind(this);
    }

    //Renders all stores responses on state
    renderAll() {
        let renderLeft = [];
        let renderRight = [];

        let half = Math.ceil(this.state.info.length / 2);

        this.state.info.forEach((elem, index) => {
            let toPush = (<div className='other-user-res'>
            <h1 className='user-name'>{elem.name} {elem.surname}</h1>
            <div className='results'> 
                <p>{elem.comb1.moves}</p>
                <p>{elem.comb2.moves}</p>
                <p>{elem.comb3.moves}</p>
            </div>
            <div className='button'>
                <span onClick={() => this.setState({completePanel: !this.state.completePanel})}>See solutions</span>
            </div>
            {this.state.completePanel && 
            <div className='complete-panel'>
                <h1>{elem.name} {elem.surname} responses</h1>
            </div>
            }
        </div>);

            if(index < half)
                renderLeft.push(toPush);
            else
                renderRight.push(toPush);
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
            this.setState({amountReceived: this.state.amountReceived + 10, info: this.state.info.concat(usersRes)});
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
            return (<h1>Loading</h1>);
    }
}
export default SubmittedSol;