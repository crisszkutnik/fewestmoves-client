import React from 'react'
import {useFormik} from  'formik'

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
                   <input id='solution' className='inputField'
              name='solution'
              type='text'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.solution}></input>
                   <textarea className='inputField' name='explanation'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.explanation}></textarea>
                   <div id='options'>
                       <a onClick={props.closePanel}>Cancel</a>
                       <button type='submit'>Submit</button>
                   </div>
               </form>
       </div>
   );
}

export default ModifyPanel;