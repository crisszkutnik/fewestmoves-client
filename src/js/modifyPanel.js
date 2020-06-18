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
                     <Row>
                        <Col>
                           <h2>{props.challenge}</h2>
                           <hr />
                        </Col>
                     </Row>
                     <Row>
                        <Col>
                           <label for='solution'>Solution</label>
                        </Col>
                     </Row>
                     <Row>
                        <Col>
                           <input id='solution' className='inputField'
                              name='solution'
                              type='text'
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              value={formik.values.solution}></input>
                        </Col>
                     </Row>
                     <Row>
                        <Col className='mt-4'>
                           <label for='explanation'>Explanation</label>
                        </Col>
                     </Row>
                     <Row>
                        <Col className='mb-4'>
                           <textarea className='inputField' name='explanation'
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              value={formik.values.explanation}></textarea>
                        </Col>
                     </Row>
                     <Row>
                        <Col id="end-buttons">
                           <a onClick={props.closePanel}>Cancel</a>
                           <button type='submit'>Submit</button>
                        </Col>
                     </Row>
                  </Container>
               </form>
       </div>
   );
}

export default ModifyPanel;