import React, {useEffect,useState} from "react";
export const DataContext = React.createContext(null);

export const DataContextProvider = ({children}) =>{
const [allUsers, setAllUsers] = useState();//state that contains an array of  all users 
const[allTasks, setAllTasks] = useState(null);//state that contains all tasks from DB
const[allProjects, setAllProjects] = useState(null);//state that contains all tasks from DB
const [status, setStatus] = useState("loading");//default loading state
const [loginData, setLoginData] = useState({password: "", username: ""}); //used to store the data from input fields at login
const[currentLoggedUser, setCurrentLoggedUser] = useState(null);//used to store current logged User Data
const [admin, setAdmin] = useState(null);//state that stores receive Admin Data from server
const [updateTaskStatus, setUpdateTaskStatus] = useState(false);//we use this state to know when to relaunch useEffect for get tasks and get project by ID
const [projectById, setProjectById] = useState(null);// state for storing PROJECT by ID
const[updateProjectStatus, setUpdateProjectStatus] = useState(false);// we use thsi state to know when to trigger useEffect to grab all projects again so no reload is needed

//creatign a useEffect that will execute the GET methods on mount and anytime there's a change in the data
useEffect(()=>{
    //getting the users array from the server
    fetch("/users", {
        method:"GET",
        headers:{
        Accept: "application/json",
        "Content-Type": "application/json",},})
    .then((res)=>res.json())
    .then((response)=>{
        setStatus("idle") // setting the status to idle as data is loaded
      return setAllUsers(response.data) //setting the received data into the users state
    })
    .catch((error) => console.log("ERROR: ", error));
    
     //getting the TASKS array from the server
     fetch("/projects", {
        method:"GET",
        headers:{
        Accept: "application/json",
        "Content-Type": "application/json",},})
    .then((res)=>res.json())
    .then((response)=>{
        setStatus("idle") // setting the status to idle as data is loaded
      return setAllProjects(response.data) //setting the received data into the users state
    })
    .catch((error) => console.log("ERROR: ", error));
    },[updateProjectStatus]) // executes on mount (or each time a new project is created)

    //get Tasks will excecute on mount and when updateTaskStatus changes
    // so when user clicks update on a task, this is to render the changes
    // on the Project task page without having to refresh the page manually each time
useEffect(() =>{
     //getting the TASKS array from the server
     fetch("/tasks", {
        method:"GET",
        headers:{
        Accept: "application/json",
        "Content-Type": "application/json",},})
    .then((res)=>res.json())
    .then((response)=>{
        setStatus("idle") // setting the status to idle as data is loaded
      return setAllTasks(response.data) //setting the received data into the users state
    })
    .catch((error) => console.log("ERROR: ", error));
},[updateTaskStatus])


    return (

        <DataContext.Provider value = {{
                allUsers, setAllUsers, status, setStatus,
                loginData, setLoginData,currentLoggedUser, 
                setCurrentLoggedUser, admin, setAdmin,
                allTasks, setAllTasks,allProjects, setAllProjects,
                updateTaskStatus, setUpdateTaskStatus,
                projectById, setProjectById, 
                updateProjectStatus, setUpdateProjectStatus
        }}>
            {children}
        </DataContext.Provider>
    )
}