import React from 'react'
import ReactMarkdown from 'react-markdown'

class MarkdownRead extends React.Component {
    render() {
        let input = "hello";

        return (
            <div>
                <ReactMarkdown source={input}/>
            </div>
        );
    }
}

export default MarkdownRead;