import React from 'react'
import {useHistory} from 'react-router-dom'

const LoginPanel = () => {
   const history = useHistory();

   return (
      <div id='login-panel'>
         <a href='http://localhost:9000/wcalogin/login'>Login with WCA</a>
      </div>
   );
}

export default LoginPanel;