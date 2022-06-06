
import React, {useContext, useState, useEffect }  from "react";
import backgroundImage from "../assets/background2.png"
import styled from "styled-components";
import { DataContext } from "./DataContext";
import Sidebar from "./Sidebar";
import { useNavigate, useParams} from "react-router-dom";
import EasyEdit, {Types} from 'react-easy-edit';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import Spinner from "./Spinner";
import{BsPatchQuestionFill} from "react-icons/bs";
import Select from "react-select";
import{SiAddthis} from "react-icons/si";

const CurrentProject = () =>{
const {admin,allTasks,updateTaskStatus, setUpdateTaskStatus,
  projectById, setProjectById, allUsers} = useContext(DataContext);

const [newProjectStatus, setNewProjectStatus] = useState(false);
const [tasksOfProject, setTasksOfProject] = useState(null);//state that stores the tasks associated with each project (projectById)
// const [responseObj, setResponseObj] = useState({});

let navigate = useNavigate();

const {_id} = useParams();//getting the PROJECT _id from the URL
const [formData, setFormData] = useState({});//Object state for storing form data from inputs
// const save = (value) => { setFormData({...formData, [name]: value})}
// const cancel = () => {console.log("Cancelled")}

useEffect(() => {
    // TODO: get seating data for selected flight
    let isApiSubscribed = true;//this is used for cleanup function , to mount and unmount
    if(isApiSubscribed){
        const getProjectByID = async () => {
            const res = await fetch(`/projects/${_id}`,  {
                  method:"GET",
                  headers:{
                  Accept: "application/json",
                  "Content-Type": "application/json",},})
             const json = await res.json();
             const findTaksOfProject = allTasks.filter((task) => json.data.tasks.find((el) => task.taskID === el) );
             setProjectById(json.data);
             setTasksOfProject(findTaksOfProject);
              }
              getProjectByID() //calling the function
    //catching any errors if returned
    .catch(error=>console.log("ERROR : ", error));

    }
    return () => {
      // cancel the subscription, unmounting
      isApiSubscribed = false;
  };
  }, [updateTaskStatus]);//useEffect will also execute when selectedFlight changes


  const handleUpdate = async() =>{
    // //if the formData state did not had enough time to update we print a message to wait and if it did we execute the PUT
    // if(!formData.taskID){
    //  console.log("Waiting for forData State to update!")
    // }
    const settings = {
      method: 'PUT',
      body: JSON.stringify(formData),
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
      }
  }
  fetch("/tasks", settings)
  .then((res)=>res.json())
  .then((response)=>{
   window.alert(response.message);//set the received server response in a window alert
   setUpdateTaskStatus(!updateTaskStatus); //sets the status of update to the opposite of current value
  // setResponseObj({status: response.status, message: response.message}); // setting the received response object in a state
}).catch((error) => console.log("ERROR: ", error));
    }

//     //we want to show the returned message response from the server only for 2 seconds
//     const [showMessage, setShowMessage] = useState(false);
// useEffect(() => {
//   setTimeout(() =>{
//     // we set the state showMessage to true for 2 seconds
//     setShowMessage(!showMessage);
//   }, 2000)
// }, []);

const handleDelete = async() =>{
  const settings = {
    method: 'DELETE',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    }
}
fetch(`/tasks/${checkedValue.taskID}`, settings)
.then((res)=>res.json())
.then((response)=>{
 window.alert(response.message);//set the received server response in a window alert
 setUpdateTaskStatus(!updateTaskStatus); //sets the status of update to the opposite of current value
// setResponseObj({status: response.status, message: response.message}); // setting the received response object in a state
}).catch((error) => console.log("ERROR: ", error));
  }

  //State used for checked radio button for each task before deleting
  const [checkedValue, setCheckedValue] = useState({taskID:""});
  const handleChange = (ev) => {
    setCheckedValue({taskID: ev.target.value});
  };


  // Drop Down Progress Menu
  const options = [
    { value: "status", label: "Work in progress" },
    { value: "status", label: "Submitted for review" },
    { value: "status", label: "Started" },
  ];
  // const [progress, setProgress] = useState();
  // const progressUpdate = (e) => {
  //   setProgress(e.label);
  // };
  //optionlist to select users for a task
  const generateOptionsList = () => {
const optionsList =[];
    allUsers.map((user)=>{
      return optionsList.push({ label: user.firstName + " " + user.lastName,
       value: user.firstName + " " + user.lastName})
    })
    return optionsList;
  };

  
  const handleClick = async() =>{
    //when admin clicks Create Project button, it will set the newProjectStatus state to true
    //therefore rendering the project sign up form on the Admin Homepage, this is also achievable by creating a new route and using useNavigate or Navlink
    navigate(`/adminHome/myProjects/${_id}/newTask`);
    }

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
              {projectById !== null &&
              <h2 style={{marginLeft: "3%","color":"#F16436", marginTop: "20px"}}> Project - {projectById.projectName} </h2> }

              <ListWrapper>
               {(projectById !== null && tasksOfProject!==null) ? (
               tasksOfProject.map((task)=>{
                   return (
                     <TaskWrapper key={task.taskID} >

                      <span className="tooltip">
                       <h3 style={{ "color":"#FED980"}}>Task Name: {task.taskName}
                       <BsPatchQuestionFill size={20} style ={{position: "absolute", right: "0"}}/></h3>
                       <span className="tooltiptext"  style={{fontSize: "12px"}}>
                         Click on each task value to edit and update or select the task to delete!</span>
                       </span>

                       <span style={{ display:"flex"}}>
                       <p style={{ "color":"white", marginRight: "5px"}}> Due Date: </p>
                         <EasyEdit
                           type={Types.DATE}
                           value={task.dueDate}
                           onSave={(value) => { setFormData({dueDate: value, taskID: task.taskID,
                            nbrDeliverables: task.nbrDeliverables, details: task.details, 
                            assignedUsers: task.assignedUsers, comments: task.comments})}}
                           saveButtonLabel={<FontAwesomeIcon icon={faCheck} />}
                           cancelButtonLabel={
                             <FontAwesomeIcon icon={faTimes} />
                           } />
                        </span>

                       <span style={{ display:"flex"}} >
                       <p style={{ "color":"white", marginRight: "5px"}}> Number of Deliverables: </p>
                         <EasyEdit
                           type={Types.TEXT}
                           value={task.nbrDeliverables}
                           onSave={(value) => {
                             setFormData({nbrDeliverables: value, taskID: task.taskID, status:task.status,
                              dueDate: task.dueDate, details: task.details, 
                              assignedUsers: task.assignedUsers, comments: task.comments})}}
                           saveButtonLabel={<FontAwesomeIcon icon={faCheck} />}
                           cancelButtonLabel={
                             <FontAwesomeIcon icon={faTimes} />
                           } />
                        </span>

                       <span style={{ display:"flex"}} >
                       <p style={{ "color":"white", marginRight: "5px"}}> Task Details: </p>
                         <EasyEdit
                           type={Types.TEXT}
                           value={task.details}
                           onSave={(value) => {
                            setFormData({details: value, taskID: task.taskID, nbrDeliverables: task.nbrDeliverables,
                              status:task.status, dueDate: task.dueDate, 
                              assignedUsers: task.assignedUsers, comments: task.comments})}}
                           saveButtonLabel={<FontAwesomeIcon icon={faCheck} />}
                           cancelButtonLabel={
                             <FontAwesomeIcon icon={faTimes} />
                           }/>
                       </span>

                       <span style={{ display:"flex"}} >
                       <p style={{ "color":"white", marginRight: "5px"}}> Comments: </p>
                         <EasyEdit
                           type={Types.TEXT}
                           value={task.comments !== "" ? task.comments : "Click to edit" }
                           onSave={(value) => {
                            setFormData({comments: value, taskID: task.taskID, nbrDeliverables: task.nbrDeliverables,
                              status:task.status, dueDate: task.dueDate, 
                              assignedUsers: task.assignedUsers, details: task.details})}}
                           saveButtonLabel={<FontAwesomeIcon icon={faCheck} />}
                           cancelButtonLabel={
                             <FontAwesomeIcon icon={faTimes} />
                           } />
                        </span>
                       
                       <div style={{ display: "flex", marginTop: "1%"}}>
                       <p style={{ "color":"white", marginRight: "5px"}}> Assigned Users: </p>
                       <EasyEdit
                        type={Types.CHECKBOX}
                        options={generateOptionsList()}
                        onSave={(value) => {
                          const splittedValues = value.toString().split(",");//value is an Object, we have to convert to String then split it
                          const arrOfSplitted = splittedValues.map((el)=>{
                            const splittedEl = el.split(" ")//we have to split each element ["john doe"] to get ["john", "doe"]
                            return {firstName: splittedEl[0], lastName: splittedEl[1]}
                          });
                          return (
                          setFormData({ assignedUsers: arrOfSplitted//[{firstName: splittedValue[0], lastName: splittedValue[1]}]
                            , comments: task.comments, taskID: task.taskID, 
                            nbrDeliverables: task.nbrDeliverables, status:task.status, dueDate: task.dueDate, details: task.details})
                          )
                          }}
                        
                            value={ formData.taskID !== task.taskID ? task.assignedUsers.map((user)=>{
                          return(`${user.firstName + " " + user.lastName}`)
                        }) : formData.assignedUsers.map((usr)=>{
                          return(`${usr.firstName + " " + usr.lastName}`)
                        })} // this will preselect the names of assigned users to the task(as displayed values), if the form hasn't changed it will display the users from the mapped task
                        />
                       </div>

                       
                    <div style={{ display: "flex", alignItems: 'center', marginTop: "1%", fontSize: "16px" }}>
                    <p style={{ "color":"white", marginRight: "5px"}}> Status: </p>
                       <Select options={options} 
                               placeholder ={task.status}
                       onChange={(ev) => { setFormData({status: ev.label, dueDate: task.dueDate, taskID: task.taskID,
                            nbrDeliverables: task.nbrDeliverables, details: task.details, 
                            assignedUsers: task.assignedUsers, comments: task.comments})}} />
                    </div>

                        <div style={{display:"flex"}}>
                        <Button onClick={handleUpdate} disabled = {(!formData.taskID)}>
                         Update Task
                        </Button>

                        <Button2 onClick={handleDelete} disabled = {(!checkedValue.taskID)}>
                         Delete Task
                        </Button2>
                      
                        <label style={ {display: "flex", alignItems:"center", position:"relative", top:"10%"}}>
                          <input type="radio" value= {`${task.taskID}`} checked={checkedValue.taskID === `${task.taskID}`} onChange={handleChange}/>
                          <span style={{
                            fontSize: "11px", overflowWrap:"break-word"}}>
                              <p  style={{width: "70%"}} >Select task to delete!</p></span>
                          </label>
                        
                        </div>  
        {/* responseObj.status !== 201 ?
         showMessage && <>
              <h3 style={{"marginTop": "10px","color":"#D80026",
             "fontSize":"15px", "textAlign":"center"}} >{responseObj.message}</h3>
            </>
         :
         (showMessage===false) &&  <>
            <h3 style={{"marginTop": "10px","color":"#D80026",
            "fontSize":"15px", "textAlign":"center"}} >{responseObj.message}</h3>
            {/* <p style={{"marginTop": "10px","color":"#D80026",
            "fontSize":"15px", "textAlign":"center"}}>
                Go to <b>My Projects</b> section to see your created Projects!</p> </>*/}
  </TaskWrapper>
  
  )}))  : (  <SWrapper>
                <Spinner/>
                 <p>Loading...</p>
              </SWrapper>)

               }
              </ListWrapper>
         
              {(projectById !== null && tasksOfProject!==null) &&(
               <Button3 onClick={handleClick}>
                  <span><SiAddthis size={25} /></span> 
                  <p>Create New Task</p>
                </Button3>
                )}

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
          )
          }
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

const SWrapper = styled.div`
display: flex;
flex-direction:column;
justify-content: center;
align-items: center;
p{
    margin-top: 50px ;
}
`

const TaskWrapper = styled.div`
width: 40vw;
margin-left: 3%;
margin-bottom: 20px;
border-radius: 5px;
padding:10px;
display: flex;
flex-direction: column;
background: #42C99D;
/* align-items:baseline; */
font-weight:normal;
h3{
  border-bottom: 1px solid;
  margin-bottom: 5px;
}
p{
  color: white;
}


  .tooltip {
  position: relative;
  display: inline-block;
}

.tooltip .tooltiptext {
  visibility: hidden;
  width: 120px;
  background-color: #5B9BD5;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px 0;

  /* Position the tooltip */
  position: absolute;
  z-index: 1;
  top: -5px;
  left: 105%;
}

.tooltip:hover .tooltiptext {
  visibility: visible;
}
`

const Button = styled.button`
border-radius: 5px;
font-size: 15px;
border: none;
background: #F16436;
padding: 10px;
width: 150px;
margin-top: 15px;
color: white;
  &:hover{
    color: white;
    background-color: rgb(40,176,255);
    transition: 150ms;
  }
  &:disabled {
    cursor: not-allowed;
    opacity: 0.7;
  }
`

const Button2 =styled(Button)`
margin-left: 15px;
`


const Button3 = styled.button`
display: flex;
align-items: center;
color: white;
text-decoration: none;
margin-left: 25px;
border: none;
background: #F16436;
padding: 13px 10px 10px 10px;
font-weight: bold;
border-radius: 10px;
font-size: 15px;
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
  p{
    margin-left:10px
  }
`

export default CurrentProject;