import React, {useContext, useState }  from "react";
import backgroundImage from "../assets/background2.png"
import styled from "styled-components";
import { DataContext } from "./DataContext";
import Sidebar from "./Sidebar";
import AdminNewProjectForm from "./AdminNewProjectForm";
import {useNavigate} from "react-router-dom";

const AdminHomepage = () =>{
const {admin} = useContext(DataContext);
const [newProjectStatus, setNewProjectStatus] = useState(false);
let navigate = useNavigate();

    return (
      <>
        <Background />
        <Wrapper>
        <Sidebar newProjectStatus={newProjectStatus} setNewProjectStatus={setNewProjectStatus}/>

          {admin !==null ? (
          <HomeWrapper>
            <Title>
              Welcome administrator
              <i style={{ "color":"#F16436"}}> {admin[0].username}</i>!
            </Title>

           {newProjectStatus === true &&(
           <>
           <AdminNewProjectForm/>
           </>
           )}

          </HomeWrapper>
           ):(
            //if page refreshes we use this message to indicate admin is logged out
          <div style ={{"width" : "600px", "position" : "absolute", "top" :"50%" , "left" :"30%" }}>
          <Title style={{"textAlign":"center", "borderRadius" :"10px", "padding":"10px",
          "background" :"red", 
          }}>Admin signed out, go back to login page!
          <button 
          style ={{"border" : "none", "padding":"7px", "borderRadius": "10px", "background":"#28B0FF", "color":"white"}}
          onClick={()=> navigate("/adminLogin")}><b>Go to Login</b></button></Title>
          </div>
          )}
        </Wrapper>
      </>
    );
    }

  const Wrapper = styled.div`
  display: flex;
  `
  const HomeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items:flex-start;
  width: 900px;
  margin: 50px;
  background: rgba(221, 237, 236, 1);
  border-radius: 5px;
  `
  
  const Background = styled.div`
    z-index: -1;
    background-image: url(${backgroundImage});
    position: absolute; 
    min-width: 100%;
    min-height: 140%;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
  `

const Title = styled.h1`
font-size: 25px;
margin-top: 2%;
margin-left: 3%;

`


    export default AdminHomepage;