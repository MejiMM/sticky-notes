import React, { useRef } from "react";
import {
  AppBar,
  Toolbar,
  makeStyles,
  IconButton,
  ListItemIcon,
  ListItemText,
  List,
  ListItem,
  Divider,
  Link,
} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import ListSharpIcon from "@material-ui/icons/ListSharp";
import NoteAddIcon from "@material-ui/icons/NoteAdd";
import AddIcon from "@material-ui/icons/Add";
import ListAltIcon from "@material-ui/icons/ListAlt";

/**
 * CSS style generator provided by the Material UI framework
 */
const useStyle = makeStyles(() => ({
  navBar: {
    background: "linear-gradient(to right, #1e3c72, #2a5298);",
    top: 0,
    margin: 0,
  },
  icon: {
    color: "white",
    fontSize: "3rem",
  },
  list: {
    padding: 0,
    display: "none",
    position: "absolute",
    top: "100%",
    left: 0,
    backgroundColor: "#4da4b9",
    width: "20%",
    height: "30vh",
  },
}));

/**
 * 
 * @param {Object} menu The object that contains the reference to the hamburger menu
 */
 const handleMenu = (menu) => {
  if (menu.current.style.display === "") {
    menu.current.style.display = "flex";
    menu.current.style.flexDirection = "column";
    menu.current.style.justifyContent = "space-evenly";
  } else {
    menu.current.style.display = "";
  }
};

/**
 * 
 * @returns Responsive AppBar component
 */
export default function Navigation() {
  const classes = useStyle(); //An instance of the useStyle function that captures the styles defined in the makeStyles object


  const menuVerify = useRef(); //Reference to verify if the menu is displayed or not

  return (
    <>
      <AppBar position="sticky" className={classes.navBar}>
        <Toolbar>
          <IconButton onClick={() => handleMenu(menuVerify)}>
            <ListSharpIcon className={classes.icon} />
          </IconButton>
          <Typography variant="h5">Menú</Typography>
          <List component="nav" className={classes.list} ref={menuVerify}>
            <Link underline="none" href="/" color="inherit">
              <ListItem button>
                <ListItemIcon>
                  <ListAltIcon />
                </ListItemIcon>
                <ListItemText>Notes List</ListItemText>
              </ListItem>
              <Divider />
            </Link>

            <Link underline="none" href="/user" color="inherit">
              <ListItem button>
                <ListItemIcon>
                  <AddIcon />
                </ListItemIcon>
                <ListItemText>Create User</ListItemText>
              </ListItem>
              <Divider />
            </Link>

            <Link underline="none" color="inherit" href="/create">
              <ListItem button>
                <ListItemIcon>
                  <NoteAddIcon />
                </ListItemIcon>
                <ListItemText>Create Note</ListItemText>
              </ListItem>
              <Divider />
            </Link>
          </List>
        </Toolbar>
      </AppBar>
    </>
  );
}
