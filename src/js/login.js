import React from 'react'
import {useFormik} from 'formik'
import '../css/login.css'

const validate = values => {
    const errors = {};
    if (!values.username) {
      errors.firstName = 'Required';
    } else if (values.username.length < 3 || values.username.length > 25) {
      errors.firstName = 'Must be 15 characters or less';
    }
  
    if (!values.password) {
      errors.password = 'Required';
    } else if (values.username.length < 3 || values.username.length > 25) {
      errors.password = 'Password is too short';
    }
  
    return errors;
};

const LoginForm = () => {
    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        validate,
        onSubmit: values => {
            alert(JSON.stringify(values, null, 2));
        },
    });
    
    return (
      <div id='login-form'>
        <form onSubmit={formik.handleSubmit} id='login-form'>
			<div className='input-field'>
				<label htmlFor='username'>Username</label>
				<input
					id='username'
					name='username'
					type='text'
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					value={formik.values.username}
				/>

				{formik.touched.username && formik.errors.username ? (
				<div className='form-error'>{formik.errors.username}</div>
				) : null}
			</div>
            <div className='input-field'>
				<label htmlFor='password'>Password</label>
				<input
					id='password'
					name='password'
					type='password'
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					value={formik.values.password}
				/>

				{formik.touched.password && formik.errors.password ? (
				<div className='form-error'>{formik.errors.password}</div>
				) : null}
			</div>

            <button type="submit">Submit</button>
        </form>
      </div>
    );
}

export default LoginForm;