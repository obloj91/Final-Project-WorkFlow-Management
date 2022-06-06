import React from "react";
import styled from "styled-components";
//import { useNavigate } from "react-router-dom";
import {NavLink} from "react-router-dom";

import backgroundImage from "../assets/background2.png"

const Homepage = () =>{

    return (
      <>
       <Background/> 
<Wrapper>
    <ListWrapper>
   
            <ListedItem>
              <NavigationLink to="/adminLogin"> Admin Login </NavigationLink>
            </ListedItem>
            
            <ListedItem>
            <NavigationLink to="/userLogin"> User Login </NavigationLink>
            </ListedItem>
      
     </ListWrapper>
 </Wrapper>
     
     
      </>
    );
}

const Wrapper = styled.div`
  /* display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  min-height: 100vh; */
  position: absolute;
  top: 50%;
  left: 50%;
  margin-right: -50%;
  transform: translate(-50%, -50%);
  
`

const ListWrapper = styled.ul`
 z-index: 100;
list-style-type: none;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
border: 4px solid #42c99d;
box-shadow: 0px 0px 25px 1px rgb(40,176,255);
background: #DDEDEC;
width: 300px;
height: 300px;
border-radius: 10px; 
`


const ListedItem = styled.li`
/*  adds space between listed items instead of using margin-top */
line-height: 5em;
`

const NavigationLink = styled(NavLink)`
color: white;
font-weight: bold;
text-decoration: none;
padding: 10px 30px 10px 30px;
text-align: center;
box-sizing: border-box;
border-radius: 10px;
background: #42c99d;
/* &.active{
  color: white;
} */
&:hover{
  color: white;
  background-color: rgb(40,176,255);
  transition: 150ms;
}
`

const Background = styled.div`
background-image: url(${backgroundImage});
position: fixed; 
min-width: 100%;
min-height: 100%;
background-repeat: no-repeat;
background-size: cover;
background-position: center;
`

export default Homepage;