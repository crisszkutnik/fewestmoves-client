import React from 'react'
import {useFormik} from  'formik'
import '../css/solPanel.css'

const SolPanel = (props) => {
    const formik = useFormik({
        initialValues: {
            solution: props.uRes
        },
        onSubmit: res => {
            props.updateResponse(res.solution);
        }
    })

    return (
        <div id='sol-panel-all'>
                <a onClick={props.handleChange}>X</a>
                <form onSubmit={formik.handleSubmit} id='submit-solution'>
                    <input id='solution'
					name='solution'
					type='text'
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					value={formik.values.solution}></input>
                    <button type='submit'>Submit</button>
                </form>
        </div>
    );
}

export default SolPanel