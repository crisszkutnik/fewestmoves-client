import React from 'react'

import wca_logo from '../../img/wca_logo.svg'
import {Container, Row, Col} from "react-bootstrap"

const LoginPanel = (props) => {
   const closePanel = () => {
      document.getElementById('login-panel').classList.add('fade-out-big');
      setTimeout(() => props.closePanel(), 250);
   };

   return (
      <div id="login-background">
      <div></div>
         <Container id='login-panel' className="fade-in">
            <Row>
               <Col>
                  <button onClick={closePanel}>x</button>
               </Col>
            </Row>
            <Row>
               <Col>
                  <h3>Select a method to log in</h3>
               </Col>
            </Row>
            <Row id='options'>
               <Col>
                  <a  href='http://localhost:9000/wcalogin/login'><img alt='WCA Logo' src={wca_logo}></img></a>
               </Col>
            </Row>
         </Container>
      </div>
   );
}

export default LoginPanel;