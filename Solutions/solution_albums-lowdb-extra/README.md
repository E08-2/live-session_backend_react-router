# Albums Project - lowdb

Let's add some extra features to our "albums" server...

## Instructions

---

1. Install `uuid` and use it in your server to make sure all your albums have a truly unique ID.

>- You should test whether this is working by creating an album and checking its `id` property in your database file.

**Note:** Just like we discussed in the last module, it is not a great idea to link a data item's `id` to its place in the data (e.g. by using `data.length` to create the id). This would start giving us problems if we wanted to later **change** the data, e.g. by deleting items and then adding new ones...

---

2. Make sure a user cannot add the same album to the "albums" array twice!

**Hint:** When the user submits a new album to the server via a `POST` request, you will have to:

>- Check the album's details and compare its details to all the other albums which have already been added to the database. There are several ways to do this, but the array method `.find()` may be especially helpful!
>- If the new album **does not** already exist, add it to the database and send a response containing the latest array of albums (we are already doing this).
>- Else, you should send back a response containing the **unchanged** array of albums.
>- **Bonus**: Try to use some logic in your frontend to check the response you get back from the server, and display an `alert` if the response data is the same as your current `albums` state variable. The alert should tell the user that they cannot add the same album twice.

---

3. Add a button to your UI with the content "Delete all albums!". When you click this button, you should delete all albums from your backend database.

>- You should send a `DELETE` request to the "/delete-albums" route to tell your server to delete all albums from the database.
>- You should therefore set up a new route in your server to handle this operation.
>- Remember that, thanks to lowdb, you can use vanilla JS to update your database using the `db` object's `data` property.
>- Once you have made sure there are no albums in the database's `albums` array, you should send the latest (empty) version of the `albums` array in your response back to the frontend.
>- Back in your frontend, you can then finish your `fetch` request by updating your state. If you do this correctly, all your albums should disappear from the UI!
>- Make sure to check that the albums have been deleted from your backend database as well as your frontend!
