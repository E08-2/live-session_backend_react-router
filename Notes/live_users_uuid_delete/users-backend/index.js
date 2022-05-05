import express from "express";
import cors from "cors";

// Import lowdb
// You can use lowdb in your server to read data from, and write data to, the "data/db.json" file.
import { Low, JSONFile } from "lowdb";

// lowdb uses adapters for reading from, and writing to, JSON files
// "An adapter is a simple class that just needs to expose two methods: read and write"
const adapter = new JSONFile("./data-folder/db.json");
const db = new Low(adapter);

// ? "What is inside db.json?"
await db.read();

// Note: db.data now has a copy of all the data stored in "data/db.json"
console.log("!", db.data);

const app = express();

app.use(express.json());

app.use(cors());

app.get("/", (req, res, next) => {
    res.send("<h1>The server received a GET request from the client!</h1>")
})

app.post("/", async (req, res, next) => {
    const { name, age } = req.body;

    const newUser = {
        name: name,
        age: age,
        id: db.data.users.length + 1
    }

    // Update the "currentData" array with the new user
    db.data.users.push(newUser);

    await db.write();

    res.json(db.data.users) // Updated array, with the new user object inside it
})

// A route to delete the last user created
app.delete("/delete-user", async (req, res) => {
    // Remove the last item in the db.data.users array
    db.data.users.pop();  

    // Write this change to our database file
    await db.write();

    // Send a response with the latest version of the users array (minus the user we deleted!)
    res.json(db.data.users);
})

app.listen(3001, () => {
    console.log("Server listening for requests on port 3001...")
})