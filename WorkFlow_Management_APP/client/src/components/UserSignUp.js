import React, {useContext, useState} from "react";
import styled from "styled-components";
import backgroundImage from "../assets/background2.png";
import { DataContext } from "./DataContext";

const UserSignUp = () =>{
const {status, setStatus} = useContext(DataContext);
const [resMessage, setResMessage] = useState("");

const initialFormState = {
    _id: "",
    firstName : "",
    lastName: "",
    username: "",
    email: "",
    type: "",
    password: "" };

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
//setSubStatus("pending");
fetch("/users/newUser", settings)
.then((res)=>res.json())
.then((response)=>{
console.log(response)
const {status, message} = response; //deconstructing response's status to know if succefull or not

if(status===201){
setStatus("idle");//set the status to idle meaning POST was succesfull
setResMessage(message);
//wait 2 seconds then reload page after submit (this is to re-do the GET users endpoint so that we can login without having to manually refresh)
setTimeout( ()=>{
  window.location.reload();
}, 2000)
//clearTimeout(); // if cleared, it will stop the timeout function
}
else {
  setStatus("loading");//set the status to loading meaning POST was not successfull
  setResMessage(message);// setting the received message from server into our response message state
}
})
.catch((error) => console.log("ERROR: ", error)); 

}


    return (
        <>         
          <Background/>
          <Wrapper>
            <FormWrapper onSubmit={handleSubmit}>
              <h2 style={{"marginBottom": "15px","color":"grey"}}>Create your user account</h2>
              <Input type={"text"} 
              name="firstName" 
              required 
              placeholder="First Name" 
              onChange={(ev)=> handleChange(ev.target.value, "firstName")}/>
  
              <Input type={"text"} 
              name="lastName" 
              required 
              placeholder="Last Name"
              onChange={(ev)=> handleChange(ev.target.value, "lastName")} /> 

              <Input type={"text"}
              name="username" 
              required 
              placeholder="Username"
              onChange={(ev)=> handleChange(ev.target.value, "username")} />

              <Input type={"text"}
              name= "email"
              required 
              placeholder="Email" 
              onChange={(ev)=> handleChange(ev.target.value, "email")} />

              <Input type={"password"}
              name="password"
              required 
              placeholder="Password"
              onChange={(ev)=> handleChange(ev.target.value, "password")}/>


        <SubmitInput type="submit" value="Sign Up"/>
    <div>
        {status !== "idle" ? 
        ( <h3 style={{"marginTop": "10px","color":"#D80026", 
        "fontSize":"15px", "textAlign":"center"}} >{resMessage}</h3>) 
        
        : (<h3 style = {{"marginTop": "10px","color":"#D80026", 
        "fontSize":"15px", "textAlign":"center"}} >{resMessage}</h3>)
        }
    </div>
            </FormWrapper>
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
    
    const FormWrapper = styled.form`
    border-radius: 10px; 
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: 4px solid #42c99d;
    box-shadow: 0px 0px 25px 1px rgb(40,176,255);
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
    
    const Background = styled.div`
    background-image: url(${backgroundImage});
    position: fixed; 
    min-width: 100%;
    min-height: 100%;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    `




  export default UserSignUp;