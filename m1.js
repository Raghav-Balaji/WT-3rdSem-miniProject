const { MongoClient } = require('mongodb');     //including the mongodb module and MongoClient class from mongodb module

// Connection URI
const url = 'mongodb://127.0.0.1:27017';            //connect to the database using the url (mongodb compass link)
let client;
MongoClient.connect(url)        //establishing connection
.then((connectedClient) => {
    client=connectedClient;
    const dbo=client.db("wanderwise");         //creating a database by calling the function db
    console.log(connectedClient);       //info on connection, Logging the connected client object for debugging purposes.
    return dbo.createCollection("userinfo");
})
//even if this database and collection exist, it will just go to that, no duplicates are created

//promise object always holds the information
.then((res)=>{
    console.log("database and collection created");
    console.log(res);       //information about the collection
    //close the connection
    client.close(); // Closes the connection to the MongoDB server to free up resources.
})
.catch((err)=>{
    console.error("an error has occoured:",err);
});