// to resolve error "Expected an assignment or function call and instead saw an expression"
/* eslint-disable */


import { useState } from 'react';
// import axios from 'axios';

export default function useEntryData() {

  const [ state, setState ] = useState({
    title: "", content: "", mood: undefined, privacy: true
  });

  console.log("STATE ", state);
  
  const submitContent = () => {
    

    // axios.post('api/entries', {state}) 
    //   .then(res => console.log("POST", res.data))
    //   .catch(err => console.log("ERROR", err));
  }

  return { state, setState, submitContent };

}
