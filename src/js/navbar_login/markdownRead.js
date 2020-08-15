import React from 'react'
import ReactMarkdown from 'react-markdown'

class MarkdownRead extends React.Component {
    constructor() {
        super();

        this.state = {
            text: '',
            loaded: false
        }
    }

    componentWillMount() {
        fetch("https://raw.githubusercontent.com/crisszkutnik/fewestmoves-client/master/public/markdown/about.md")
        .then(res => res.text())
        .then(res => this.setState({text: res, loaded: true}))
        .catch(() => alert("An error occurred"));
    }

    render() {
        if(this.state.loaded)
            return (
                <div id="md-container">
                    <div id='md-text'>
                        <ReactMarkdown source={this.state.text}/>
                    </div>
                </div>
            );
        else
            return (<div></div>);
    }
}

export default MarkdownRead;