import React from 'react'
import {useFormik} from  'formik'
import {Container, Row, Col} from 'react-bootstrap'

const ModifyPanel = (props) => {
   const formik = useFormik({
       initialValues: {
           solution: props.resData.sol,
           explanation: props.resData.explanation
       },
       onSubmit: res => {
          document.getElementById('modify-container').classList.add('fade-out-big');
          setTimeout(() => props.submitRes(res.solution, res.explanation, props.nComb), 250);
       }
   })

   return (
       <div id='modify-panel'>
               <form onSubmit={formik.handleSubmit} className='fade-in' id='submit-solution'>
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
                           <textarea spellcheck='false' className='inputField' name='explanation'
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              value={formik.values.explanation}></textarea>
                        </Col>
                     </Row>
                     <Row id="end-buttons">
                        <Col>
                           <button id='cancel'>Cancel</button>
                           <button type='submit'>Submit</button>
                        </Col>
                     </Row>
                  </Container>
               </form>
       </div>
   );
}

export default ModifyPanel;