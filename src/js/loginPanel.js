import React from 'react'
import {useHistory} from 'react-router-dom'

const LoginPanel = () => {
   const history = useHistory();

   return (
      <div id='login-panel'>
         <a href='/wcalogin/login'>Login with WCA</a>
      </div>
   );
}

export default LoginPanel;