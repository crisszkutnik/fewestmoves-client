import React, {useState, useEffect} from 'react'
import {useFormik} from 'formik'
import {useHistory} from 'react-router-dom'
import '../css/login.css'
import '../css/logReg.css'

const validate = values => {
    const errors = {};
    if (!values.username) {
      errors.username = 'Required';
    } else if (values.username.length < 3 || values.username.length > 25) {
      errors.username = 'Must be 15 characters or less';
    }
  
    if (!values.password) {
      errors.password = 'Required';
    } else if (values.username.length < 3 || values.username.length > 25) {
      errors.password = 'Password is too short';
    }
  
    return errors;
};

const LoginForm = () => {
	const history = useHistory();
	const [resStatus, setStatus] = useState(200);

	useEffect(() => {
		fetch('http://localhost:9000/user/isLogged', {
            method: 'POST',
            headers: {
            	'Accept': 'application/json',
            	'Content-Type': 'application/json'
			},
			credentials: 'include',
			body: ''
		})
		.then(res => {
			if(res.status === 200)
				history.push('/dashboard/actual');
		})
	}, []);

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        validate,
        onSubmit: values => {
            fetch('http://localhost:9000/user/login', {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
			  },
			  credentials: 'include',
              body: JSON.stringify(values)
            })
            .then(res => {
				if(res.status === 200) {
					setStatus(200);
					history.push('/dashboard/actual');
				}
				else
					setStatus(res.status);
			})
			.catch(e => setStatus(500));
        },
    });
    
    return (
      <div id='login-form'>
		{resStatus === 403 &&
			<div className='bad-response'>Failed to login. Check your username or password.</div>
		}
		{resStatus !== 403 && resStatus !== 200 &&
			<div className='bad-response'>Error occurred. If it persists contanct webpage administrator.</div>
		}

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