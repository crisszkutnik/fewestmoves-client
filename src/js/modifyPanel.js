import React from 'react'
import {useFormik} from  'formik'
import '../css/modifyPanel.css'
import {Container, Row, Col} from 'react-bootstrap'

const ModifyPanel = (props) => {
   const formik = useFormik({
       initialValues: {
           solution: props.resData.sol,
           explanation: props.resData.explanation
       },
       onSubmit: res => {
          props.submitRes(res.solution, res.explanation, props.nComb);
       }
   })

   return (
       <div id='modify-panel'>
               <form onSubmit={formik.handleSubmit} id='submit-solution'>
                  <Container id="modify-container">
                     <Row id='title'>
                        <Col>
                           <h2>{props.challenge}</h2>
                        </Col>
                     </Row>
                     <Row className='label'>
                        <Col >
                           <label for='solution'>Solution</label>
                        </Col>
                     </Row>
                     <Row id='solution'>
                        <Col>
                           <input id='solution' className='inputField'
                              name='solution'
                              type='text'
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              value={formik.values.solution}></input>
                        </Col>
                     </Row>
                     <Row className='label'>
                        <Col>
                           <label for='explanation'>Explanation</label>
                        </Col>
                     </Row>
                     <Row id='explanation'>
                        <Col >
                           <textarea className='inputField' name='explanation'
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              value={formik.values.explanation}></textarea>
                        </Col>
                     </Row>
                     <Row id="end-buttons">
                        <Col xs="2" md="2" lg="1">
                           <a onClick={props.closePanel}>Cancel</a>
                        </Col>
                        <Col xs="4" sm="3" md="2">
                           <button type='submit'>Submit</button>
                        </Col>
                     </Row>
                  </Container>
               </form>
       </div>
   );
}

export default ModifyPanel;