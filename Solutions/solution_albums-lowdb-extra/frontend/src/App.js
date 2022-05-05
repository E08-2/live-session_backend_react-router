import React, {useState, useEffect} from "react";

const App = () => {
    const [band, setBand] = useState("");
    const [albumTitle, setAlbumTitle] = useState("");
    const [albumYear, setAlbumYear] = useState("");
    const [albums, setAlbums] = useState([]);
    
    useEffect(() => {
        console.log("Current value of 'albums' state variable", albums);
    }, [albums])

    // Function to change the state variable corresponding to a form input the user tried to change
    const changeData = event => {
        switch(event.target.name) {
            case "band":
                setBand(event.target.value);
                break;
            case "title":
                setAlbumTitle(event.target.value);
                break;
            case "year":
                setAlbumYear(event.target.value);
                break;
            default:
                break;
        }
    }

    // Function to submit the form to our server using a POST request
    const submitForm = event => {
        event.preventDefault();

        // Create new album object
        const newAlbum = {
            band: band,
            albumTitle: albumTitle,
            albumYear: albumYear
        }

        // Set up the post request we will shortly make
        const settings = {
            method: "POST",
            body: JSON.stringify(newAlbum), // "Translate" the data to send in the request body into a JSON string
            headers: {
                "Content-Type": "application/json"
            }
        }

        // Make a post request to our server, containing the new data in req.body
        fetch("http://localhost:3001/new-album", settings)
        .then(response => response.json())
        .then(data => {
            // ? We just received a response from the server containing data
            // ? Case 1: The album we created was original, so we added it to the "albums" array in our db, and sent back the new array
            // ? Case 2: The album we created was a duplicate, so we sent back the "albums" array WITHOUT making any changes to it

            // * So...
            // * We either get back a new array of albums (with the new album added)
            // * Or...
            // * We get back the same array of albums we started with, unchanged

            if (data.length === albums.length) {
                alert("Album was not added as it was identical to an existing album!");
            }
            
            // When we have received our response from the server, and "translated" it back to standard JS
            
            // Update the "albums" state variable
            // This will be an array with all previous album objects...
            // Plus the one you sent to the server in the current POST request
            setAlbums(data);
            // Reset the values of the inputs
            setBand("");
            setAlbumTitle("");
            setAlbumYear("");
            // Log the array of albums we received back from the server
            console.log("Data received in server response =", data);
        })
    }

    const deleteAlbums = () => {
        const settings = {
            method: "DELETE"
        }

        fetch("http://localhost:3001/delete-albums", settings)
        .then(response => response.json())
        .then(data => setAlbums(data));
    }

    return (
        <div>
            <h1>Add an Album to the Collection!</h1>

            <form onSubmit={submitForm}>
                <div>
                    <label>Band</label>
                    <input name="band" onChange={changeData} value={band} />
                </div>
                <div>
                    <label>Title</label>
                    <input name="title" onChange={changeData} value={albumTitle} />
                </div>
                <div>
                    <label>Year</label>
                    <input name="year" onChange={changeData} value={albumYear} />
                </div>
                <button>Submit Album</button>
            </form>
            <button onClick={deleteAlbums}>Delete all albums!</button>

            <div>
                <h2>Current Albums</h2>
                <ul>
                    {
                        albums.map(album => {
                            return <li>{album.albumTitle} by {album.band} ({album.albumYear})</li>
                        })
                    }
                </ul>
            </div>
        </div>
    )
}

export default App;
