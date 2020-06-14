import React from 'react'
import {useHistory} from 'react-router-dom'

const LoginPanel = () => {
   const history = useHistory();

   const WCALogin = () => {
      history.push('/wcalogin/login')
   }

   return (
      <div id='login-panel'>
         <button onClick={WCALogin}>Login with WCA</button>
      </div>
   );
}

export default LoginPanel;