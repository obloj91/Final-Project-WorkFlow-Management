import React, {useState, useContext} from "react";
import styled from "styled-components";
import backgroundImage from "../assets/background2.png";
import Sidebar from "./Sidebar";
import { DataContext } from "./DataContext";
import EasyEdit, {Types} from 'react-easy-edit';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { NavLink, useNavigate } from "react-router-dom";

const AdminNewTaskForm= () =>{
  let navigate = useNavigate();
const {projectById,allUsers, updateTaskStatus, 
      setUpdateTaskStatus} = useContext(DataContext);

const [newProjectStatus, setNewProjectStatus] = useState(false);
const [responseObj, setResponseObj] = useState({});

const initialFormState = {
    taskID:"",
    assignedUsers:[],
    taskName: "",
    projectName: projectById !== null ? projectById.projectName : "", //this is fixed and cannot be edited as we create a task inside of current Project
    dueDate: "yyyy-mm-dd",
    details: "",
    nbrDeliverables: "",
    status: "",
    comments: "" };

const [formData, setFormData] = useState(initialFormState);//Object state for storing form data from inputs

//setting the key and values as what is written inside inputs, keeps the keys from initialStateForm that are not used (e.g. _id, type) because we use spread operator (...)
// const handleChange = (value, name) =>{
//   setFormData({...formData, [name]: value}); 
//  }

//on submit we submit the New Task data tp the server
function handleSubmit(ev){
  ev.preventDefault();//prevents the page from refreshing if submit unsuccesfull
  const settings = {
    method: 'POST',
    body: JSON.stringify(formData),
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    }}
fetch("/tasks/newTask", settings)
.then((res)=>res.json())
.then((response)=>{
console.log(response)
//const {status, message} = response; //deconstructing response's status to know if successfull or not
setResponseObj({status: response.status, message: response.message}); // setting the received response object in a state 
setUpdateTaskStatus(!updateTaskStatus); //sets the status of update to the opposite of current value to trigger dependacy array of allTasks
})
.catch((error) => console.log("ERROR: ", error)); 

}

//optionlist to select users for a task
const generateOptionsList = () => {
  const optionsList =[];
      allUsers.map((user)=>{
        return optionsList.push({ label: user.firstName + " " + user.lastName,
         value: user.firstName + " " + user.lastName})
      })
      return optionsList;
    };

    
  // Drop Down Progress Menu option list
  const options = [
    { value: "status", label: "Work in progress" },
    { value: "status", label: "Submitted for review" },
    { value: "status", label: "Started" },
  ];
  
    return (
        <div style={{display: "flex"}}>
          <Background />         
          <Sidebar newProjectStatus={newProjectStatus} setNewProjectStatus={setNewProjectStatus}/>
          <HomeWrapper>
          <Wrapper>
          {projectById !==null ? (
            <FormWrapper onSubmit={handleSubmit}>
              <h2 style={{"marginBottom": "15px","color":"#F16436"}}>
                Project {projectById.projectName} - New task</h2>

          <div style={{display: "flex", alignItems:"center", marginBottom:"10px"}}>
          <p style={{ marginRight: "5px"}}> Task Name: </p>
          <Input type={"text"} 
              name="taskName" 
              required 
              placeholder="Give your task a name"
              onChange={(ev)=> setFormData({...formData, taskName:ev.target.value })} /> 
        </div>

          <span style={{ display:"flex", alignItems:"center", marginBottom:"10px"}}>
            <p style={{ marginRight: "5px"}}> Due Date: </p>
             <Div>
              <EasyEdit
              required
              type={Types.DATE}
              value={formData.dueDate}
              onSave={(value) =>  setFormData({...formData, dueDate: value})}
              saveButtonLabel={<FontAwesomeIcon icon={faCheck} />}
              cancelButtonLabel={<FontAwesomeIcon icon={faTimes} />} />
            </Div>
          </span>

          <div style={{display: "flex", alignItems:"center", marginBottom:"10px"}}>
          <p style={{ marginRight: "5px"}}> Number of Deliverables: </p>
          <Input type={"text"} 
              name="nbrDeliverables" 
              required 
              placeholder="Specify a number"
              onChange={(ev)=> setFormData({...formData, nbrDeliverables:ev.target.value })} /> 
        </div>
        
        <div style={{display: "flex", alignItems:"center", marginBottom:"10px"}}>
          <p style={{ marginRight: "5px"}}> Task Details: </p>
          <Input type={"text"} 
              name="taskDetails" 
              required 
              placeholder="Add some details"
              onChange={(ev)=> setFormData({...formData, details: ev.target.value })} /> 
        </div>
        
        <div style={{display: "flex", alignItems:"center", marginBottom:"10px"}}>
          <p style={{ marginRight: "5px"}}> Comments: </p>
          <Input type={"text"} 
              name="comments" 
              placeholder="Optional comments"
              onChange={(ev)=> setFormData({...formData, comments:ev.target.value })} /> 
        </div>

        <div style={{ display: "flex", alignItems:"center", marginBottom:"10px"}}>
                       <p style={{marginRight: "5px"}}> Assigned Users: </p>
                       <Div>
                       <EasyEdit
                       required
                        type={Types.CHECKBOX}
                        options={generateOptionsList()}
                        onSave={(value) => {
                          const splittedValues = value.toString().split(",");//value is an Object, we have to convert to String then split it
                          const arrOfSplitted = splittedValues.map((el)=>{
                            const splittedEl = el.split(" ")//we have to split each element ["john doe"] to get ["john", "doe"]
                            return {firstName: splittedEl[0], lastName: splittedEl[1]}
                          });
                          return (
                          setFormData({ ...formData, assignedUsers: arrOfSplitted//[{firstName: splittedValue[0], lastName: splittedValue[1]}]
                                      }))
                          }}
                         value={formData.assignedUsers.length !== 0 ?
                          formData.assignedUsers.map((usr)=>{
                            return(`${usr.firstName + " " + usr.lastName}`)
                          })  : ["Add users to this task"]} // 
                        />
                        </Div>
         </div>

        <div>
        <SubmitInput type="submit" value="Create New Task"/>
        </div>
    <div>
        {responseObj.status !== 201 ? 
        ( <>
        <h3 style={{"marginTop": "10px","color":"#D80026", 
        "fontSize":"15px", "textAlign":"center"}} >{responseObj.message}</h3>
        </>
        ) : (
            <>
            <h3 style={{"marginTop": "10px","color":"#D80026", 
            "fontSize":"15px", "textAlign":"center"}} >{responseObj.message}</h3>
            <p style={{"marginTop": "10px","color":"#D80026", 
            "fontSize":"15px", "textAlign":"center"}}>
            Go back to <NavLink to={`/adminHome/myProjects/${projectById._id}`}>
             <b>{projectById.projectName}</b> 
            </NavLink>
            </p>
            </>
        )
        }
    </div>
            </FormWrapper>
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
          )
          
          }
        </Wrapper>
        </HomeWrapper>
    </div>

    );
  }

  const Wrapper = styled.div`
      margin: 25px ;
      font-size: 16px;
    `
    
    const FormWrapper = styled.form`
    border-radius: 10px; 
    display: flex;
    flex-direction: column;
    /* border: 4px solid #42c99d; */
    background: #DDEDEC;
    width: 100%;
    height: 100%;
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
    
    const Div= styled.div`
    border: none;
    background: #42c99d;
    padding:5px;
    border-radius: 10px; 
    `
        
    const Input= styled.input`
    border: none;
    background: #42c99d;
    font-size: 16px;
    height: 35px;
    padding:5px;
    border-radius: 10px; 
        `
    
  const SubmitInput = styled.input`
  color: white;
  font-weight: bold;
  padding: 12px 35px 12px 35px;
  margin: 10px 0px 0px -5px;
  text-align: center;
  border: none;
  border-radius: 10px;
  background:  #F16436;
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


  export default AdminNewTaskForm;