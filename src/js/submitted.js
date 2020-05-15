import React from 'react'

class SubmittedSol extends React.Component {
    constructor(props) {
        super(props);
        this.state = {amountReceived: 0, info: [], fetchedData: true}
        this.renderMore = this.renderMore.bind(this);
        this.renderAll = this.renderAll.bind(this);
    }

    renderAll() {
        let render = [];

        this.state.info.forEach((elem) => {
            render.push(
                <div className='other-user-res'>
                    <h1 className='user-name'>Name</h1>
                    <div className='results'> 
                        <p>{elem.comb1.moves}</p>
                        <p>{elem.comb2.moves}</p>
                        <p>{elem.comb3.moves}</p>
                    </div>
                    <span>See solutions</span>
                </div>
            );
        })

        return render;
    }

    componentDidMount() {
        this.renderMore();
    }

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
                    {this.renderAll()}
                    <div id='last-button'><button onClick={this.renderMore}>Load more</button></div>
                </div>
            );
        else
            return (<h1>Loading</h1>);
    }
}
export default SubmittedSol;