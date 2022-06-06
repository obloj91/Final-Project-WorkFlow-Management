import React  from "react";
import styled from "styled-components";
import GlobalStyle from "./GlobalStyle";

import{BsFillPlusCircleFill} from "react-icons/bs";
import { NavLink, useNavigate} from "react-router-dom";




const Sidebar = ({newProjectStatus, setNewProjectStatus}) =>{
  let navigate = useNavigate();

  const handleClick = async() =>{
  //when admin clicks Create Project button, it will set the newProjectStatus state to true
  //therefore rendering the project sign up form on the Admin Homepage, this is also achievable by creating a new route and using useNavigate or Navlink
  setNewProjectStatus(true);
  navigate("/adminHome");
  }
    return (
      <ListWrapper>
          <ListedItem>
        <Button onClick={handleClick}>
         <span><BsFillPlusCircleFill size={30} /></span> 
          <p>Home/Create Project</p>
        </Button>
        </ListedItem>

        <ListedItem>
            <NavigationLink to={"/adminHome/myProjects"} onClick={handleClick}>
                My Projects
            </NavigationLink>
        </ListedItem>

        
        <ListedItem>
            <NavigationLink to={"#"}>
                My Settings
            </NavigationLink>
        </ListedItem>


      </ListWrapper>
    );
}




const ListWrapper = styled.ul`
list-style-type: none;
display: flex;
flex-direction: column;
font-weight: bold;
padding: 20px 0px 20px 20px;
background: #42c99d;
width: 15rem;
height: 140vh;
`



const ListedItem = styled.li`
/*  adds space between listed items instead of using margin-top */
display: flex;
align-items: center;
color: black;
margin-top:30px;
p{
 margin-left: 10px;
}
`

const NavigationLink = styled(NavLink)`
border-radius: 5px;
color: black;
text-decoration: none;
border: none;
background: #DDEDEC;
padding: 17px 52px 17px 52px;
  &:hover{
    color: white;
    background-color: rgb(40,176,255);
    transition: 150ms;
  }
`

const Button = styled.button`
display: flex;
align-items: center;
color: black;
text-decoration: none;
max-width: 193px;
border: none;
background: #DDEDEC;
padding: 13px 20px 10px 20px;
font-weight: bold;
border-radius: 5px;
font-size: 17px;
  &:hover{
    color: white;
    background-color: rgb(40,176,255);
    transition: 150ms;
    span{
        color: black;
    transform: scale(1.3);
    transition: 50ms;
  }
  }
`

export default Sidebar;