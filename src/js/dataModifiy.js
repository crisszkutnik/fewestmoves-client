import React from 'react'
import {useFormik} from  'formik'
import '../css/solPanel.css'

const SolPanel = (props) => {
    const formik = useFormik({
        initialValues: {
            solution: props.uRes,
            explanation: props.uExp
        },
        onSubmit: res => {
            console.log(res);
            props.updateResponse(res.solution, res.explanation);
        }
    })

    return (
        <div id='sol-panel-all'>
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
                        {!props.isSolution &&
                        <p>The solution is not correct!</p>}
                        <a onClick={props.handleChange}>Cancel</a>
                        <button type='submit'>Submit</button>
                    </div>
                </form>
        </div>
    );
}

export default SolPanel