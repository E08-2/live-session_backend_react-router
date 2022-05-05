// * In this live coding, we will create an Express ROUTER to handle:
// * POST and DELETE requests...
// * To the "/users" endpoint
// * This will also have the benefit of making index.js much smaller (more understandable!)
// * (We can import and export when we need to use functionality in other modules...)

// =============================

import express from "express";
import cors from "cors";

// Import lowdb
// You can use lowdb in your server to read data from, and write data to, the "data/db.json" file.
import { Low, JSONFile } from "lowdb";
// Import the router handling all requests to "/users"
import usersRouter from "./routes/users.js";

// lowdb uses adapters for reading from, and writing to, JSON files
// "An adapter is a simple class that just needs to expose two methods: read and write"
const adapter = new JSONFile("./data-folder/db.json");
export const db = new Low(adapter);

// ? "What is inside db.json?"
await db.read();

// Note: db.data now has a copy of all the data stored in "data/db.json"
console.log("!", db.data);

const app = express();

app.use(express.json());

app.use(cors());

// GET "localhost:3001/"
app.get("/", (req, res, next) => {
    res.send("<h1>The server received a GET request from the client!</h1>")
})

// If we receive ANY request to the "/users" endpoint, forward that request to the "users" router
app.use("/users", usersRouter);

app.listen(3001, () => {
    console.log("Server listening for requests on port 3001...")
})