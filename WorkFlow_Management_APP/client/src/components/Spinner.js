import styled from "styled-components";
import { keyframes } from "styled-components";
import {ImSpinner3} from "react-icons/im";
import React from 'react';

const Spinner = () =>{

return <Spin><ImSpinner3 size={30}/></Spin>
}; 

// this will set the scale from smaller to bigger
const rotateSpinner = keyframes` 
from {
    /* starting at scale 0 so size will be 0*/
transform: rotate(0deg); 
}
to{
    /* means times(multiplies) 1 in size */
    transform: rotate(360deg); 
}
`;


const Spin = styled.div`
position: absolute;
border-radius: 50%; 
animation: ${rotateSpinner} infinite 1000ms; 
/* forwards means once it goes the opacity goes to 0 it will not go back to 1  */
margin-bottom:20px;
`

export default Spinner;