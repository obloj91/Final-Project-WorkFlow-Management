import React, {useContext, useState} from "react";
import styled from "styled-components";
import { DataContext } from "./DataContext";
import Tooltip from '@mui/material/Tooltip';
import EasyEdit, {Types} from 'react-easy-edit';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";

const AdminNewProjectForm= () =>{
const {setUpdateProjectStatus,updateProjectStatus} = useContext(DataContext);
const [responseObj, setResponseObj] = useState({});
//const [projectDate, setProjectDate] = useState(new Date());

const initialFormState = {
    projectName: "",
    projectType: "",
    projectDeadline: "Deadline date (yyyy-mm-dd)" };

const [formData, setFormData] = useState(initialFormState);//Object state for storing form data from inputs
//const [errMessage, setErrMessage] = useState("");//state used to store error message

//setting the key and values as what is written inside inputs, keeps the keys from initialStateForm that are not used (e.g. _id, type)
const handleChange = (value, name) =>{
  setFormData({...formData, [name]: value}); 
 }

//on submit we 
function handleSubmit(ev){
  ev.preventDefault();//prevents the page from refreshing if submit unsuccesfull
  const settings = {
    method: 'POST',
    body: JSON.stringify(formData),
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    }

}
fetch("/projects/newProject", settings)
.then((res)=>res.json())
.then((response)=>{
console.log(response)
//const {status, message} = response; //deconstructing response's status to know if successfull or not
setResponseObj({status: response.status, message: response.message}); // setting the received response object in a state 
setUpdateProjectStatus(!updateProjectStatus);//will trigger re-render of get all projects as it has a dependancy for updateProejctStatus
// if(status===201){
// //setResStatus("success");//set the status meaning POST was successfull
// setResMessage(response);
// }
// else {
// //setResStatus("failed");//set the status meaning POST was not successfull
// setResMessage(response);// setting the received message from server into our response message state
// }
})
.catch((error) => console.log("ERROR: ", error)); 

}


    return (
        <>         
          <Wrapper>
            <FormWrapper onSubmit={handleSubmit}>
              <h2 style={{"marginBottom": "15px","color":"grey"}}>Create a New Project</h2>
              <Tooltip title="Give your project a cool name!" placement="right">
              <Input type={"text"} 
              name="projectName" 
              required 
              placeholder="Project Name" 
              onChange={(ev)=> handleChange(ev.target.value, "projectName")}/>
              </Tooltip>
  <Tooltip title="What type of project is it? (e.g. costs, statistics, analysis)" placement="right">
              <Input type={"text"} 
              name="projectType" 
              required 
              placeholder="Project Type"
              onChange={(ev)=> handleChange(ev.target.value, "projectType")} /> 
</Tooltip>
              <DateDiv>
              <EasyEdit
              required
              type={Types.DATE}
              value={formData.projectDeadline}
              onSave={(value) =>  setFormData({...formData, projectDeadline: value})}
              saveButtonLabel={<FontAwesomeIcon icon={faCheck} />}
              cancelButtonLabel={<FontAwesomeIcon icon={faTimes} />} />
              </DateDiv>
            


        <SubmitInput type="submit" value="Create New Project"/>
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
                Go to <b>My Projects</b> section to see your created Projects!</p>
            </>
        )
        }
    </div>
            </FormWrapper>
        </Wrapper>
    </>

    

    );
  }

  const Wrapper = styled.div`
       display: flex;
      justify-content: center;
      align-items: center;
      margin: 25px ;
    `
    
    const FormWrapper = styled.form`
    border-radius: 10px; 
    display: flex;
    flex-direction: column;
    /* border: 4px solid #42c99d; */
    background: #DDEDEC;
    width: 350px;
    height: 450px;
    `
    
    const Input= styled.input`
    border: none;
    background: #42c99d;
    font-size: 16px;
    height: 35px;
    margin: 0px 0px 20px 0px;
    padding:15px;
    border-radius: 10px; 
    `
    
  const SubmitInput = styled.input`
  color: white;
  font-weight: bold;
  padding: 12px 35px 12px 35px;
  margin-bottom: 10px;
  text-align: center;
  border: none;
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

const DateDiv = styled.div`
    display: flex;
    flex-direction: column;
   border: none;
    background: #42c99d;
    font-size: 16px;
    height: 35px;
    margin: 0px 0px 20px 0px;
    padding: 10px 0px 30px 15px;
    border-radius: 10px; 

`



  export default AdminNewProjectForm;