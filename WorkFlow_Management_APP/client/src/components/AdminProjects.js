
import React, {useContext, useState }  from "react";
import backgroundImage from "../assets/background2.png"
import styled from "styled-components";
import { DataContext } from "./DataContext";
import Sidebar from "./Sidebar";
import { NavLink, useNavigate} from "react-router-dom";

const AdminProjects = () =>{
    const {admin,allProjects} = useContext(DataContext);
    const [newProjectStatus, setNewProjectStatus] = useState(false);
    let navigate = useNavigate();


    return (
      <>
        <Background />
        <Wrapper>
          <Sidebar
            newProjectStatus={newProjectStatus}
            setNewProjectStatus={setNewProjectStatus}
          />

          {newProjectStatus === true || admin !== null ? (
            <HomeWrapper>
              <Title>My Projects</Title>
              <ListWrapper>
                {allProjects.map((proj) => {
                  return (
                   
                    <ListedItem key={proj._id}>
                      <Button onClick={()=> navigate(`/adminHome/myProjects/${proj._id}`)}>
                      <h3>{proj.projectName}</h3>
                      <p>
                        Project Type: <i>{proj.projectType}</i>
                      </p>
                      <p>
                        Project Deadline: <i>{proj.projectDeadline}</i>
                      </p>
                      </Button>
                    </ListedItem>
                
                  );
                })}
              </ListWrapper>
            </HomeWrapper>
          ) : (
            //if page refreshes we use this message to indicate admin is logged out
            <div
              style={{
                width: "600px",
                position: "absolute",
                top: "50%",
                left: "30%",
              }}
            >
              <Title
                style={{
                  textAlign: "center",
                  borderRadius: "10px",
                  padding: "10px",
                  background: "red",
                }}
              >
                Admin signed out, go back to login page!
                <button
                  style={{
                    border: "none",
                    padding: "7px",
                    borderRadius: "10px",
                    background: "#28B0FF",
                    color: "white",
                  }}
                  onClick={() => navigate("/adminLogin")}
                >
                  <b>Go to Login</b>
                </button>
              </Title>
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



const ListWrapper = styled.ul`
list-style-type: none;
display: flex;
flex-direction: column;
font-weight: bold;
padding: 20px 0px 20px 20px;
width: 17rem;
`



const ListedItem = styled.li`
/*  adds space between listed items instead of using margin-top */
`

const Button = styled.button`
text-decoration: none;
border: none;
border-radius: 5px;
margin-bottom:20px;
color: black;
text-decoration: none;
text-align: center;
font-size: 15px;
border: none;
background: #F16436;
padding: 20px;
  &:hover{
    color: white;
    background-color: rgb(40,176,255);
    transition: 150ms;
  }
`

// const NavigationLink = styled(NavLink)`
// text-decoration: none;
// `
export default AdminProjects;