import React from "react";
import { Grid } from "@material-ui/core";
import FormNotes from "./FormNotes";
import axios from "axios";

/**
 * 
 * @param {String} title Title that the new note will contain
 * @param {String} content Content that the new note will contain
 * @param {String} author Author created in New users section 
 */
const handleSubmit = async (title, content, author) => {
  await axios.post(`https://sticknote.herokuapp.com/api/notes`, {
    title: title,
    content: content,
    author: author,
  });
};

/**
 * 
 * @returns Component to create a new note
 */
export default function CreateNotes() {
  return (
    <>
      <Grid container justify="center">
        <Grid item xs={12} md={3}>
          <FormNotes handleSubmit={handleSubmit} />
        </Grid>
      </Grid>
    </>
  );
}
