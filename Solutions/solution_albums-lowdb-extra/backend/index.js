import express from "express";
import cors from "cors";
import { Low, JSONFile } from "lowdb";
import { v4 as uuid } from "uuid";

const app = express();

const adapter = new JSONFile("./data/db.json");
const db = new Low(adapter);

// Get a copy of the current data from the "data/db.json" file.
await db.read();

// This allows ALL cors requests to all our routes
app.use(cors());

// We can use express's .json() method to parse JSON data received in any request
app.use(express.json());

// Create an "/albums" route serving GET requests
// This will send a response containing the current array of album objects, in JSON format 
app.get("/albums", (req, res) => {
    res.json(albums);
})

// Create a "/new-album" route serving POST requests
// This should receive data in the format { "band": "x", "albumTitle": "y", "albumYear": "z" }
app.post("/new-album", async (req, res) => {
    const { band, albumTitle, albumYear } = req.body;

    // Here we can use .find() to check if the new album already exists in our db.data
    // Two options:
    //  - If we find an album in our data with the same band, title and year as the album sent from the frontend, "found" will return the album that was found
    //  - If we find NO album with the same band, title and year as the album sent from the frontend, "found" will return "undefined"
    const found = db.data.albums.find(album => album.band === band && album.albumTitle === albumTitle && album.albumYear === albumYear)

    // "If we DIDN'T find a matching album in our data"
    // Create the new album object, give it an id, add it to our db, and send a response with the updated album list
    if (!found) {
        const newAlbum = {
            id: uuid(),
            band: band,
            albumTitle: albumTitle,
            albumYear: albumYear
        }
    
        db.data.albums.push(newAlbum);
    
        await db.write();
        
        console.log(`New album added to the albums array with id ${newAlbum.id}`);
            
        res.status(201).json(db.data.albums);
    } else {
        // Else, if we DID find a matching album...
        // Don't do anything - just respond with the list of albums unchanged
        res.json(db.data.albums);   
    }
})

// localhost:3000/route --> Change what the user can see -> React routing - load a new component in the frontend
// localhost:3001/route --> Change something in the backend - invisible to the user -> send/get some data -> send response to the frontend so it is up to date

app.delete("/delete-albums", async (req, res) => {
    // Reset db.data.albums to an empty array
    db.data.albums = [];

    // Update the db.json file
    await db.write();

    // Send the new, empty array in your response to the frontend
    res.json(db.data.albums);
})

app.listen(3001, () => {
    console.log("Server has started on port 3001!");
})