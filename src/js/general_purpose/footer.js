import React from 'react'
import GitHubButton from 'react-github-btn'

class Footer extends React.Component {
    render() {
        return (
            <footer>
                <p>Weekly fewest moves competition.</p>
                <p>Developed by <a href='https://github.com/crisszkutnik'>Cristobal Szkutnik</a> in collaboration with <a href='https://github.com/GuidoDipietro'>Guido Dipietro</a></p>
                <div>
                <p>View on <a href='https://github.com/crisszkutnik/fewestmoves-client'>GitHub</a></p>
                    <GitHubButton 
                    href="https://github.com/crisszkutnik/fewestmoves-client" 
                    data-color-scheme="no-preference: dark; light: dark; dark: dark;" 
                    data-icon="octicon-star"
                    data-show-count="true" 
                    aria-label="Star crisszkutnik/fewestmoves-client on GitHub">
                    Star
                    </GitHubButton>
                    <GitHubButton 
                    href="https://github.com/crisszkutnik/fewestmoves-client/issues" 
                    data-color-scheme="no-preference: dark; light: dark; dark: dark;" 
                    data-icon="octicon-issue-opened" 
                    data-show-count="true" 
                    aria-label="Issue crisszkutnik/fewestmoves-client on GitHub">
                    Issue
                    </GitHubButton>
                </div>
            </footer>
        );
        
    }
}

export default Footer;