import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  makeStyles,
  Grid,
  Divider,
  Card,
  CardContent,
} from "@material-ui/core";
import ListUser from "./ListUser";
import FormUser from "./FormUser";

/**
 * CSS style generator provided by the Material UI framework
 */
const useStyle = makeStyles((theme) => ({
  gridContainer: {
    scrollSnapType: "y mandatory",
    position: "relative",
    scrollBehavior: "smooth",
  },
  img: {
    paddingTop: "2%",
    width: "90%",
    height: "60vh",
  },
}));

/**
 *
 * @returns Component to create a new user
 */
export default function CreateUser() {
  const [user, setUser] = useState([]); //Contains the users arriving from the API
  const [list, setList] = useState(false); //Control component rendering when creating or deleting a user
  const classes = useStyle(); //An instance of the useStyle function that captures the styles defined in the makeStyles object

  /**
   * 
   * @param {String} id Identification number for the user to be deleted
   */
  async function handleDelete(id) {
    await axios.delete(`https://sticknotes-api.herokuapp.com/api/users/${id}`);

    setList(!list);
  }

  /**
   * 
   * @param {String} values Name that comes from the FormUser component
   */
  async function handleCreate(values) {
    await axios.post(`https://sticknotes-api.herokuapp.com/api/users`, {
      username: values,
    });

    setList(!list);
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(`https://sticknotes-api.herokuapp.com/api/users`);
        const json = await res.data;

        setUser(json);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [list]);

  return (
    <Grid container justify="center" className={classes.gridContainer}>
      <Grid item xs={12} className={classes.secHead} id="users">
        <img src="images/createUser.svg" alt="Banner" className={classes.img} />
        <Divider light />
      </Grid>
      <Grid container item xs={10} md={3}>
        <FormUser handleCreate={handleCreate} />
        <Divider />
      </Grid>
      <Grid item xs={12}>
        <Card className={classes.sec} id="sec">
          <CardContent>
            {user.length === 0 ? (
              <h3>No existen usuarios aún. Crea uno :)</h3>
            ) : (
              <ListUser handleDelete={handleDelete} username={user} />
            )}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
