// const pula = [
//     {
//     "username": "user-1",
//     "name":"John Doe",
//     "type" : "user",
//     "assign-tasks": true,
//     "accepted-tasks": 2,
//     "tasks":[{
//     "task-name":"Task-1 do this",
//     "due-date": "01-01-2022",
//     "details" : "Do a table with 10 lines"
//     },
//     {
//       "task-name":"Task-2 then do this thing",
//       "due-date": "01-02-2022",
//       "details" : "Submit a PDF that has a resume of the costs"}
//   ],
//     "_id": "00001"
//   },
//   {
//     "username": "user-2",
//     "type":"admin",
//     "tasks":[{
//       "assigned-users" :"John Doe, Apple Smith",
//       "task-name":"Task-1 do this",
//       "due-date": "01-01-2022",
//       "details" : "Do a table with 10 lines"
//       },
//       { "assigned-users" :"John, Apple Smith",
//         "task-name":"Task-2 then do this thing",
//         "due-date": "01-02-2022",
//         "details" : "Submit a PDF that has a resume of the costs"}
//     ],
//     "_id": "00002"
//   }];


const { v4: uuidv4 } = require("uuid");
const newID1 = uuidv4();//generate a new ID
const { randomUUID } = require('crypto');//does same thing as uuidv4()
const newIDD2= randomUUID();
const newIDD3= randomUUID();
const newIDD4= randomUUID();
const newIDD5= randomUUID();



const users = [
  {
    _id: newIDD2,
    firstName: "John",
    lastName: "Doe",
    username: "user-1",
    email: "jd@gmail.com",
    type: "user",
  },

  {
    _id: newID1,
    firstName: "Apple",
    lastName: "Smith",
    username: "user-2",
    email: "appleS@gmail.com",
    type: "admin",
  },
];


const projects = [
  {
    _id: newIDD3,
    projectName: "P1",
    projectType: "costs",
    projectDeadline: "01-01-2022",
    //assignedTasks: true,
    tasks: ["88a33c23", "80a33f453"],
  },

  {
    _id: newIDD4,
    projectName: "P2",
    projectType: "analysis",
    projectDeadline: "02-04-2022",
    //assignedTasks: true,
    tasks: ["10a33c12123", "11a33f45223"],
  },

  {
    _id: newIDD5,
    projectName: "P3",
    projectType: "analysis",
    projectDeadline: "03-06-2022",
    assignedTasks: false,
    tasks: [],
    comments: [""], //OPtional maybe we can add a timestamp!!!
  },
];

//creating an array of ids to assign to the tasks taskID keys
const taskIDs = [];
for (let i=0; i<=4;i++){
  taskIDs.push(uuidv4());
}


const tasks = [
  {
    taskID: taskIDs[0],
    projectName:"P1",
    assignedUsers: ["John Doe", "Apple Smith"],
    taskName: "Task-1 ",
    dueDate: "01-01-2022",
    details: "Do a table with 10 lines",
    nbrDeliverables: 3,
    //fileType: "PDF etc..."
    status: "started",
    comments: [""], //OPtional maybe we can add a timestamp!!!
  },
  {
    taskID: taskIDs[1],
    projectName:"P1",
    assignedUsers: ["John Doe", "Apple Smith"],
    taskName: "Task-2 ",
    dueDate: "01-02-2022",
    details: "Submit a PDF that has a resume of the costs",
    nbrDeliverables: 2,
    //fileType: "PDF etc..."
    status: "started",
    comments: [""], //OPtional maybe we can add a timestamp!!!
  },
  {
    taskID: taskIDs[2],
    projectName:"P2",
    assignedUsers: ["Donald McClellan"],
    taskName: "Task-1 ",
    dueDate: "05-05-2022",
    details: "Do a table with 10 lines",
    nbrDeliverables: 4,
    //fileType: "PDF etc..."
    status: "started",
    comments: [""], //OPtional maybe we can add a timestamp!!!
  },
  {
    taskID: taskIDs[3],
    projectName:"P3",
    assignedUsers: ["Bowser Dragon"],
    taskName: "Task-2 ",
    dueDate: "07-04-2022",
    details: "Submit a PDF that has a resume of the costs",
    nbrDeliverables: 1,
    //fileType: "PDF etc..."
    status: "done",
    comments: ["Great Job! 100% complete", "good"],
  },
];



module.exports = { users, projects, tasks };
