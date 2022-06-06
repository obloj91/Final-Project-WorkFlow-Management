//const fs = require("file-system");

const { MongoClient, ObjectId } = require("mongodb");
const assert = require("assert");

const { v4: uuidv4 } = require("uuid");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// use this data. Changes will persist until the server (backend) restarts.
const { users,projects,tasks } = require("./data/someData");

const batchImport = async (req,res)=>{
    const client = new MongoClient(MONGO_URI, options);
    try {
        //connect...
        await client.connect();
        // We are using the 'finalproj' database
        const db = client.db("finalproj");
        console.log("Connected!")
    
        // and creating a new collection 'flightsAndReservations'
        //Here we are declaring a variable `result` that will contain the
        // response from the db server. We use `result.insertedCount` to validate 
        // that database received our document and added it to the collection. 
        // _Notice that the collection is called `flightsAndReservations`_. 
        //insert.many is used to insert multiple documents into a collection, array of objects
        const result1 = await db.collection("users").insertMany(users); 
        const result2 = await db.collection("projects").insertMany(projects);
        const result3 = await db.collection("tasks").insertMany(tasks);

        //assert.equal(data.length, result.insertedCount);// insertedCount same thing as doing result.length, we're checking that actual and expected parameters
      // On success
      console.log("Success: ", result1, result2, result3)
    
      } catch (err) {
        // on failure
        console.log(err.stack);
      }
    
      // close...
      client.close();
      console.log("Disconnected!")
      
     // console.log(greetings);
    };


batchImport();
