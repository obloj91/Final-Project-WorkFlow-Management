//requiring the MongoClient
const { MongoClient } = require("mongodb");
const express = require("express");
const morgan = require("morgan");

//In order to access the database, we need the `uri` that we saved in the `.env` file.
require("dotenv").config();
const cors = require("cors");

const { MONGO_URI } = process.env;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const PORT = 4000; //server will listen on port 4000

//importing handler functions
const {
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
} = require("./handlers");

express()
  .use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Methods",
      "OPTIONS, HEAD, GET, PUT, POST, DELETE"
    );
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  })
  .use(morgan("tiny"))
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use("/", express.static(__dirname + "/"))
  // it means to let any website access the API
  .use(cors({ origin: "*" }))

  //REST endpoints
  //USERS
  .get("/users", getUsers)
  .get("/users/:_id", getSingleUser)
  .get("/users/type/admin", getAdmin)
  .post("/users/newUser", addUser)

  //PROJECTS
  .get("/projects", getProjects)
  .get("/projects/:_id", getSingleProject)
  .post("/projects/newProject", addProject)

  //TASKS
  .get("/tasks", getTasks)
  .get("/tasks/:taskID", getSingleTask)
  .post("/tasks/newTask", addTask)
  .put("/tasks", updateTask)
  .delete("/tasks/:taskID", deleteTask)
  .post("/upload", upload.single("pdf"), uploadFile)
  .post("/uploads", upload.array("files", 20), uploadFiles)

  .listen(PORT, () => console.info(`Listening on port ${PORT}`));
