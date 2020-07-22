import React from 'react'
import {useFormik} from  'formik'

class ModifySection extends React.Component {
   constructor(props) {
      super(props);
      this.state = {resData: {}}
   }

   componentWillMount() {
      fetch('/newChallData/activeChallengeData', {
         method: 'POST',
         headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
         },
         credentials: 'include',
         body: JSON.stringify({reqComb: this.props.match.params.comb})
      })
      .then(res => res.json())
      .then(data => this.setState({resData: data}))
      .catch(e => alert("An error occurred"))
   }

   render() {
      return (<h1>{this.props.match.params.comb}</h1>)
   }
}

export default ModifySection;