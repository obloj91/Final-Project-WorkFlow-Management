import React, { useEffect, useContext }  from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import backgroundImage from "../assets/background2.png"
import { DataContext } from "./DataContext";
var bcrypt = require("bcryptjs");



const AdminLogin = () =>{
let navigate = useNavigate();
const {loginData, setLoginData, setStatus, admin, setAdmin} = useContext(DataContext);

 //setting the name of the inputs and values as what is written inside inputs
 const handleChange = (value, name) =>{
  setLoginData({...loginData, [name]: value}); 
  }

  // //verify username and password function
  //   async function checkUser(databaseUsername,inputUsername, dataBasePassword, inputPassword) {
  //     //... fetch user from a db etc.
  //   const checkPassword = await bcrypt.compare(inputPassword, dataBasePassword);
  //     if(checkPassword===true && (inputUsername === databaseUsername) ) {
  //         //if loginfo checks out we navigate to the Admin HomePage
  //         navigate("/adminHome");
  //     } else{
  //       window.alert("Username or password is invalid!");
  //     }}


  useEffect(() => {
    let isApiSubscribed = true;//this is used for cleanup function , to mount and unmount
    if(isApiSubscribed){
    const fetchAdmin = async () =>{
      //get the data from our api, endpoint is expecting :flight, so we provided the selected flight(from dropdown menu)
      const res = await fetch("/users/type/admin"); 
      //const res = await fetch("/flights/SA231")
      //converting the received data to JSON
      const receivedJSON = await res.json(); //deconstructing response
      //we then set the state with the received data
      setAdmin(receivedJSON.data); //setting the received data into the users state
      setStatus("idle"); // setting the status to idle as data is loaded
    }
    //calling the function
    fetchAdmin()
    //catching any errors if returned
    .catch(error=>console.log("ERROR : ", error));
    }
    return () => {
      // cancel the subscription, unmounting
      isApiSubscribed = false;
  };
  }, []);


  //on submit we get the hashed password from DB and compare to what we inputed in the password field
  function handleSubmit(ev){
    ev.preventDefault();//prevents the page from refreshing if submit unsuccesfull

 bcrypt.compare(loginData.password, admin[0].password,function(err, result) {
  // result == true
  console.log(result)
  if(result && (admin[0].username === loginData.username)){
    navigate("/adminHome", { replace: true });//repalce should clear the history..not sure if it works
   }
   else{
     window.alert("Invalid Username or Password!");
   }

})

//     const settings = {
//       method: 'GET',
//       headers: {
//       Accept: 'application/json',
//      'Content-Type': 'application/json',
//       }
// }
// fetch("/users/type/admin", settings)
// .then((res)=>res.json())
// .then((response)=>{
// const {status, message, data} = response; //deconstructing response
// setAdmin(data); //setting the received data into the users state
// setStatus("idle"); // setting the status to idle as data is loaded
// bcrypt.compare(loginData.password, admin[0].password).then((res) => {
//   // res === true
//   navigate("/adminHome");
// });
// // if(status==200 && status === "idle"){
// //   //we call the function to verify login admin information
// //   checkUser(loginData.username, admin[0].username, admin[0].password, loginData.Password);
// //   }
// //  else if(status === 404){
// //       console.log(message)
// //   }
// })
// .catch((error) => console.log("ERROR: ", error)); 
}



    return (
      <>
        <Background />
        <Wrapper>
          <FormWrapper onSubmit={handleSubmit} >
            <Input type={"text"} 
            name="username" 
            placeholder="Username" 
            required 
            onChange={(ev)=> handleChange(ev.target.value, "username")}

            />

            <Input type={"password"} 
            name="password" 
            placeholder="Password" 
            required 
            onChange={(ev)=> handleChange(ev.target.value, "password")}
            />

      <SubmitInput type="submit" value="Login" disabled={(!loginData.password || !loginData.username)}/>
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
  width: 300px;
  height: 300px;
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
text-align: center;
border: none;
border-radius: 10px;
background: #42c99d;

&:hover{
  color: white;
  background-color: rgb(40,176,255);
  transition: 150ms;
}
&:disabled {
    cursor: not-allowed;
    opacity: 0.6;
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

export default AdminLogin;