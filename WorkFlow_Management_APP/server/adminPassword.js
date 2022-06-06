const bcrypt = require('bcryptjs');

const saltRounds = 10;
//since we assume admin is already created and no sign up available, we assign a password
const adminPlaintextPassword = 'admin101!';
const someOtherPlaintextPassword = 'not_bacon'; //used to compare

// encryptedPWD = '';
// //encrypt password
// bcrypt.genSalt(saltRounds, function(err, salt) {
 
//     bcrypt.hash(adminPlaintextPassword, salt, function(err, hash) {
//       // Store hash in your password DB.
//       console.log(hash)
//       encryptedPWD = hash;
//       console.log(encryptedPWD)
//       console.log(adminPlaintextPassword)
//   });

// });





const { MongoClient, ObjectId } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};


const batchImport = async (req,res)=>{
    const client = new MongoClient(MONGO_URI, options);
    try {
        //connect...
        await client.connect();
        // We are using the 'finalproj' database
        const db = client.db("finalproj");
        console.log("Connected!")




        
//decrypt password and compare
// Load hash from your password DB.
//find all users in the users database collection
const findAdmin = await db.collection("users").find({type: "admin"}).toArray();
const hash = findAdmin[0].password;

console.log(hash)

bcrypt.compare(adminPlaintextPassword, hash, function(err, result) {
  // result == true
  console.log(result)
});
bcrypt.compare(someOtherPlaintextPassword, hash, function(err, result) {
  // result == false
  console.log(result)
});

      // On success
    
    
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