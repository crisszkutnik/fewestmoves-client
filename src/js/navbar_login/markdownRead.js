import React from 'react'
import GitHubButton from 'react-github-btn'
import ReactMarkdown from 'react-markdown'
import { toggle_bg_blur } from '../../functions/func'

class MarkdownRead extends React.Component {
    constructor(props) {
        super(props);

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

        toggle_bg_blur("#md-contaiener");
    }

    componentWillUnmount() {
        toggle_bg_blur("#md-contaiener");
    }

    render() {
        if(this.state.loaded)
            return (
                <div id="md-container">
                    <div id='md-text'>
                        <button onClick={this.props.closePanel}>X</button>
                        <ReactMarkdown source={this.state.text}/>
                        <div id='github-btns'>
                            <GitHubButton 
                                href="https://github.com/crisszkutnik/fewestmoves-client" 
                                data-color-scheme="no-preference: dark; light: dark; dark: dark;" 
                                data-icon="octicon-star" 
                                data-size="large"
                                data-show-count="true" 
                                aria-label="Star crisszkutnik/fewestmoves-client on GitHub"
                            >
                            Star
                            </GitHubButton>
                            <GitHubButton 
                                href="https://github.com/crisszkutnik/fewestmoves-client/issues" 
                                data-color-scheme="no-preference: dark; light: dark; dark: dark;" 
                                data-icon="octicon-issue-opened" 
                                data-size="large"
                                data-show-count="true"
                                aria-label="Issue crisszkutnik/fewestmoves-client on GitHub"
                            >
                            Issue
                            </GitHubButton>
                        </div>
                    </div>
                </div>
            );
        else
            return (<div></div>);
    }
}

export default MarkdownRead;