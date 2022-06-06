"use strict";

// use this package to generate unique ids: https://www.npmjs.com/package/uuid
const { v4: uuidv4 } = require("uuid");
var bcrypt = require("bcryptjs"); //importing bcrypt package
const saltRounds = 10;

const { MongoClient, ObjectId } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const multer = require("multer");

//------------------USERS-------------------------------------------------------------------------------------
// 1. get all users
const getUsers = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  try {
    //connect to Mongo client
    await client.connect();

    const db = client.db("finalproj");
    console.log("Connected!");

    //find all users in the users database collection
    const users = await db.collection("users").find().toArray();

    return res
      .status(200)
      .json({ status: 200, data: users, message: "Success!" });
  } catch (error) {
    console.log(error.stack);
    client.close();
    console.log("Disconnected!");
  }
};

// 2. Get single user by his unique _id
const getSingleUser = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  const singleUserID = req.params._id; //getting the unique user ID from url

  try {
    //connect to Mongo client
    await client.connect();
    const db = client.db("finalproj");
    console.log("Connected!");

    //find all users in the users database collection
    const users = await db.collection("users").find().toArray();

    const findUser = users.find((user) => singleUserID === user._id);

    //if a match is found we return the found user, if not an error message
    findUser
      ? res
          .status(200)
          .json({ status: 200, data: findUser, message: "User found!" })
      : res.status(200).json({
          status: 404,
          data: singleUserID,
          message: "User cannot be found!",
        });
  } catch (error) {
    console.log(error.stack);
    client.close();
    console.log("Disconnected!");
  }
};

// 3. Create a user (only of type users, we assume admin account is already created)
const addUser = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  const newUserID = uuidv4(); //creating a new _id for the new user
  const newUser = req.body; //getting user JSON object from submitted body
  const { _id, firstName, lastName, username, email, type, password } = newUser; //deconstructing user JSON object

  newUser._id = newUserID; // assigning a unique ID to the new user Object
  newUser.type = "user"; // assigning the "user" type to the new created user account
  //encrypt the inputed password
  bcrypt.genSalt(saltRounds, function (err, salt) {
    bcrypt.hash(password, salt, function (err, hash) {
      // Store hash in your password DB.
      newUser.password = hash;
    });
  });

  try {
    //connect to Mongo client
    await client.connect();
    const db = client.db("finalproj");
    console.log("Connected!");

    //get the users array from the users database collection
    const users = await db.collection("users").find().toArray();

    //check to see if information that is submitted is missing
    if (
      !firstName ||
      !lastName ||
      !username ||
      !email ||
      email.includes("@") === false ||
      !password
    ) {
      return res
        .status(200)
        .json({ status: 400, data: newUser, message: "Missing-data!" }); //400 is BAD REQUEST
    }
    //check to see if user name or email account already exists in the database
    else if (
      users.find(
        (user) =>
          user.email === email ||
          user.lastName === lastName ||
          user.firstName === firstName
      )
    ) {
      return res.status(200).json({
        status: 400,
        data: newUser,
        message: "Account already exists!",
      });
    }
    //check to see if chosen Username already is picken by another user in our existing database
    else if (users.find((user) => user.username === username)) {
      return res.status(200).json({
        status: 400,
        data: username,
        message: "Username already taken, please choose another one!",
      });
    }
    // if everything checks out we can add the new user account information in our users database collection
    else {
      await db.collection("users").insertOne(newUser);
      return res
        .status(200)
        .json({ status: 201, message: "New User CREATED!", data: newUser });
    }
  } catch (error) {
    console.log(error.stack);
    client.close();
    console.log("Disconnected!");
  }
};

// 4. Get admin account
const getAdmin = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  // const accountType = req.params.type; //getting the type from the URL

  try {
    //connect to Mongo client
    await client.connect();
    const db = client.db("finalproj");
    console.log("Connected!");

    //find all users in the users database collection
    const findAdmin = await db
      .collection("users")
      .find({ type: "admin" })
      .toArray();

    //const findAdmin = users.find(user => "admin" === user.type );

    //if a match is found we return the found admin, if not an error message
    findAdmin
      ? res.status(200).json({
          status: 200,
          data: findAdmin,
          message: "Administrator account found!",
        })
      : res.status(200).json({
          status: 404,
          data: findAdmin,
          message: "Administrator account cannot be found!",
        });
  } catch (error) {
    console.log(error.stack);
    client.close();
    console.log("Disconnected!");
  }
};

//------------------PROJECTS---------------------------------------------------------------------------------------
//5. Get all projects
const getProjects = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  try {
    //connect to Mongo client
    await client.connect();

    const db = client.db("finalproj");
    console.log("Connected!");

    //find all projects from projects database collection
    const projects = await db.collection("projects").find().toArray();

    return res
      .status(200)
      .json({ status: 200, data: projects, message: "Success!" });
  } catch (error) {
    console.log(error.stack);
    client.close();
    console.log("Disconnected!");
  }
};

// 6. Get a single project by _id
const getSingleProject = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  const singleProjectID = req.params._id; //getting the unique Project ID from url

  try {
    //connect to Mongo client
    await client.connect();
    const db = client.db("finalproj");
    console.log("Connected!");

    const projects = await db.collection("projects").find().toArray();

    const findProject = projects.find((proj) => singleProjectID === proj._id);

    //if a match is found we return the found project, if not an error message
    findProject
      ? res
          .status(200)
          .json({ status: 200, data: findProject, message: "Project found!" })
      : res.status(200).json({
          status: 404,
          data: singleProjectID,
          message: "Project cannot be found!",
        });
  } catch (error) {
    console.log(error.stack);
    client.close();
    console.log("Disconnected!");
  }
};

// 7. Create a new Project
const addProject = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  const newProjectID = uuidv4(); //creating a new _id for the new Project
  const newProject = req.body; //getting user JSON object from submitted body
  const { projectName, projectType, projectDeadline } = newProject; //deconstructing project JSON object

  newProject._id = newProjectID; // assigning a unique ID to the new Project Object
  newProject.tasks = []; // assignign an empty array of tasks

  try {
    //connect to Mongo client
    await client.connect();
    const db = client.db("finalproj");
    console.log("Connected!");

    const projects = await db.collection("projects").find().toArray();

    //check to see if information that is submitted is missing
    if (!projectName || !projectType || !projectDeadline) {
      return res.status(200).json({
        status: 400,
        data: newProject,
        message: "BAD REQUEST: missing keys or values!",
      });
    }
    //check to see if Project already exists in the database
    else if (projects.find((proj) => proj.projectName === projectName)) {
      return res.status(200).json({
        status: 400,
        data: newProject,
        message: "Project already exists!",
      });
    }
    // if everything checks out we can add the new PROJECT in our PROJECTS database collection
    else {
      await db.collection("projects").insertOne(newProject);
      return res.status(200).json({
        status: 201,
        message: "New Project CREATED!",
        data: newProject,
      });
    }
  } catch (error) {
    console.log(error.stack);
    client.close();
    console.log("Disconnected!");
  }
};

//---------------TASKS---------------------------------------------------------------------------------------

//8. Get all tasks
const getTasks = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  try {
    //connect to Mongo client
    await client.connect();

    const db = client.db("finalproj");
    console.log("Connected!");

    //find all tasks from projects database collection
    const tasks = await db.collection("tasks").find().toArray();

    return res
      .status(200)
      .json({ status: 200, data: tasks, message: "Success!" });
  } catch (error) {
    console.log(error.stack);
    client.close();
    console.log("Disconnected!");
  }
};

//9. Get single task by id (taskID)
const getSingleTask = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  const singleTaskID = req.params.taskID; //getting the unique Project ID from url

  try {
    //connect to Mongo client
    await client.connect();
    const db = client.db("finalproj");
    console.log("Connected!");

    const tasks = await db.collection("tasks").find().toArray();

    const findTask = tasks.find((task) => singleTaskID === task.taskID);

    //if a match is found we return the found task, if not an error message
    findTask
      ? res
          .status(200)
          .json({ status: 200, data: findTask, message: "Task found!" })
      : res.status(200).json({
          status: 404,
          data: singleTaskID,
          message: "Task cannot be found!",
        });
  } catch (error) {
    console.log(error.stack);
    client.close();
    console.log("Disconnected!");
  }
};

// 10. Create Task
const addTask = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  const newTaskID = uuidv4(); //creating a new taskID for the new TASK
  const newTask = req.body; //getting user JSON object from submitted body
  const {
    taskName,
    projectName,
    dueDate,
    taskID,
    assignedUsers,
    details,
    nbrDeliverables,
    status,
    comments,
  } = newTask; //deconstructing Task JSON object

  newTask.taskID = newTaskID; // assigning a unique ID to the new TASK Object
  newTask.status = "Started"; //we assign the default state "started" to each newly created task

  try {
    //connect to Mongo client
    await client.connect();
    const db = client.db("finalproj");
    console.log("Connected!");
    const users = await db.collection("users").find().toArray(); //get all users from DB

    //check to see if any submitted info is missing, also check if we assigned users to the tasks (at least 1 user needs to be assigned)
    if (
      !projectName ||
      !taskName ||
      !dueDate ||
      !details ||
      !nbrDeliverables ||
      assignedUsers.length < 1
    ) {
      return res.status(200).json({
        status: 400,
        data: newTask,
        message: "BAD REQUEST: missing keys or values!",
      });
    }

    // //check to see if TASK name already exists in the database -> NOT NECESSARY????
    // else if(tasks.find((proj) => proj.projectName === projectName )){
    //   return res.status(200).json({status: 400, data: newProject, message: "Project already exists!"})
    // }
    else {
      // we add the new task to our tasks database collection
      await db.collection("tasks").insertOne(newTask);

      // we need to add the taskID to the Projects tasks array
      const updatedTasksIDArray = await db.collection("projects").updateOne(
        { projectName: projectName }, //query
        { $push: { tasks: newTask.taskID } }
      ); //new values added

      // we need to add the taskID to the USERS tasks array
      //const findUserMatch = users.find((user) =>(assignedUsers[index].firstName === user.firstName ) && (assignedUsers[index].lastName===user.lastName ));

      //if(findUserMatch){
      //const updatedTasksIDArrayUsers = await db.collection("users").updateMany({["assignedUsers.$[].firstName"]: {$elemMatch: {firstName:"Joey"}}}, //query
      //const updatedTasksIDArrayUsers = await db.collection("users").updateMany({firstName: "John"}, //assignedUsers: {$elemMatch: {firstName: "John"}}} , //query
      //{$push:{tasks: newTask.taskID}});   //new values added

      return res.status(200).json({
        status: 201,
        message: "New Task CREATED!",
        data: newTask,
        data2: updatedTasksIDArray,
      });
      //}
      //else{
      // return res.status(200).json({status: 400, data: newTask, message: "BAD REQUEST: User not found in database!"})
      //}
    }
  } catch (error) {
    console.log(error.stack);
    client.close();
    console.log("Disconnected!");
  }
};

// 11. Update Task
const updateTask = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  const existingTask = req.body; //getting user JSON object from submitted body

  const {
    taskName,
    projectName,
    dueDate,
    taskID,
    assignedUsers,
    details,
    nbrDeliverables,
    status,
    delivrablesPathsArr,
  } = existingTask; //deconstructing Task JSON object

  try {
    //connect to Mongo client
    await client.connect();
    const db = client.db("finalproj");
    console.log("Connected!");

    const tasks = await db.collection("tasks").find().toArray();

    //look for a matching taskID in our collection
    const findTask = tasks.find((task) => task.taskID === taskID);

    if (findTask === undefined) {
      return res.status(200).json({
        status: 404,
        data: existingTask,
        message: "Task cannot be found!",
      });
    }

    //check to see if any submitted info is missing, also check if we assigned users to the tasks (at least 1 user needs to be assigned)
    // if(!taskName || !dueDate || !details || !nbrDeliverables || assignedUsers.length < 1 ){
    //   return res.status(200).json({status: 400, data: existingTask, message: "BAD REQUEST: missing keys or values!"})
    // }

    // if a task is found (that has a taskID that matched)
    else if (findTask) {
      const query = { taskID: existingTask.taskID };

      //Limiting the updating to only these values by targeting only these keys in the req.body JSON
      const newValues = {
        $set: {
          dueDate: req.body.dueDate,
          details: req.body.details,
          status: req.body.status, //NEEDS TO BE DONE
          comments: req.body.comments,
          nbrDeliverables: req.body.nbrDeliverables,
          assignedUsers: req.body.assignedUsers, // NEEDS TO BE DONE
        },
      }; //ignores everything else in the body

      const updatedTask = await db
        .collection("tasks")
        .updateOne(query, newValues);

      res.status(200).json({
        status: 200,
        data: updatedTask,
        message: "Task updated successfully!",
      });
    }
  } catch (error) {
    console.log(error.stack);
    client.close();
    console.log("Disconnected!");
  }
};

// 12. Delete Task
const deleteTask = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  const singleTaskID = req.params.taskID; //getting the unique Project ID from url

  try {
    //connect to Mongo client
    await client.connect();
    const db = client.db("finalproj");
    console.log("Connected!");

    const tasks = await db.collection("tasks").find().toArray(); //get all tasks from our database task collection

    const findTask = tasks.find((task) => task.taskID === singleTaskID); // find the corresponding task ID from our tasks array that matches our taskID from URL

    //if no corresponding taks is found we send a message
    if (findTask === undefined) {
      return res.status(200).json({
        status: 404,
        data: singleTaskID,
        message: "Task cannot be found!",
      });
    } else {
      //delete the taskID (id of task that is getting deleted) from the Projects tasks array
      //const findIndexOfCorrespondingTaskID = tasks.indexOf(findTask);
      const deleteTaskIDFromProjects = await db
        .collection("projects")
        .updateOne(
          { projectName: findTask.projectName }, //query
          { $pull: { tasks: singleTaskID } }
        ); //delete taskID values

      //delete the task from tasks database collection
      const deleteTask = await db
        .collection("tasks")
        .deleteOne({ taskID: singleTaskID });

      res.status(200).json({
        status: 200,
        data: deleteTask,
        data2: deleteTaskIDFromProjects,
        message: "Task deleted successfully!",
      });
    }
  } catch (error) {
    console.log(error.stack);
    client.close();
    console.log("Disconnected!");
  }
};

// 13 Upload One File To Server

const fileStorageEngine = multer.diskStorage({
  // cb is the callback function
  destination: (req, files, cb) => {
    cb(
      null,
      "/Users/oliverbloj/Documents/Concordia BootCamp/36.1 WM 5.5.2022/WorkFlow_Management_APP/server/Uploads"
    );
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + " " + file.originalname);
  },
});
const upload = multer({ storage: fileStorageEngine });

const uploadFile = async (req, res) => {
  try {
    console.log(req.file);
    res.send(" File Uploaded");
  } catch (error) {
    console.log(error.stack);
  }
};

// 14 Upload Multiple Files to Server (max 20 files)

const uploadFiles = async (req, res) => {
  try {
    console.log(req.files);
    res.send(" Files Uploaded");
  } catch (error) {
    console.log(error.stack);
  }
};

module.exports = {
  getUsers,
  getSingleUser,
  addUser,
  getProjects,
  getSingleProject,
  addProject,
  getTasks,
  getSingleTask,
  addTask,
  updateTask,
  deleteTask,
  getAdmin,
  upload,
  uploadFile,
  uploadFiles,
};
