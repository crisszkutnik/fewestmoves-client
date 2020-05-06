import React, {useState} from 'react'
import {useFormik} from 'formik'
import {useHistory} from 'react-router-dom'
import '../css/register.css'

const validate = values => {
    const errors = {};
    if (!values.username) {
      errors.username = 'Required';
    } else if (values.username.length < 3 || values.username.length > 25) {
      errors.username = 'Must be 15 characters or less';
    }
  
    if (!values.password) {
      errors.password = 'Required';
    } else if (values.password.length < 3 || values.password.length > 25) {
      errors.password = 'Password is too short';
	}
	
	if(!values.name) errors.name = 'Required';

	if(!values.surname) errors.surname = 'Required';
  
    return errors;
};

const RegisterForm = () => {
	const history = useHistory();

	const [resStatus, setStatus] = useState(0);

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
            name: '',
            surname: ''
        },
        validate,
        onSubmit: values => {
			fetch('http://localhost:9000/user/register', {
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(values)
			})
			.then(res => {
				if(res.status == 201) {
					setStatus(res.status);
					setTimeout(() => history.push('/login'), 4000);
				} else if(res.status == 500 || res.status == 400)
					setStatus(res.status);
			})
			.catch(e => setStatus(500));
        },
    });
    
    return (
      <div id='register-form'>
		{resStatus == 201 &&
			<div class='response ok-response'>Account created correctly. Redirecting.</div>
		}
		{resStatus == 500 &&
			<div class='response bad-response'>Error occurred. If it persists contanct webpage administrator.</div>
		}
		{resStatus == 400 &&
			<div class='response bad-response'>Error occurred. Username already taken or you have already created an account.</div>
		}
        <form onSubmit={formik.handleSubmit}>
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

			<div className='input-field'>
				<label htmlFor='name'>Name</label>
				<input
					id='name'
					name='name'
					type='text'
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					value={formik.values.name}
				/>
				{formik.touched.name && formik.errors.name ? (
				<div className='form-error'>{formik.errors.name}</div>
				) : null}
			</div>

			<div className='input-field'>
				<label htmlFor='surname'>Name</label>
				<input
					id='surname'
					name='surname'
					type='text'
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					value={formik.values.surname}
				/>
				{formik.touched.surname && formik.errors.surname ? (
				<div className='form-error'>{formik.errors.surname}</div>
				) : null}
			</div>

            <button type="submit">Submit</button>
        </form>
      </div>
    );
}

export default RegisterForm;