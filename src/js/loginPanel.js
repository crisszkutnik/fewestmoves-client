import React from 'react'
import '../css/loginPanel.css'
import wca_logo from '../img/wca_logo.svg'
import {Container, Row} from "react-bootstrap"

const LoginPanel = (props) => {
   return (
      <div id="login-background">
         <Container id='login-panel' className="px-5 py-3">
            <Row className="justify-content-end">
               <button onClick={props.closePanel}>x</button>
            </Row>
            <Row className="justify-content-center my-3">
               <h3>Select a method to log in</h3>
            </Row>
            <Row className="justify-content-center">
               <a className="px-3 py-3" href='http://localhost:9000/wcalogin/login'><img alt='WCA Logo' src={wca_logo}></img></a>
            </Row>
         </Container>
      </div>
   );
}

export default LoginPanel;