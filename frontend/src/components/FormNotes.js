import React, { memo, useEffect, useState } from "react";
import { useFormik } from "formik";
import "../styles/FormNotes.css";
import axios from "axios";

/**
 * Object to handle the initial values ​​of the form
 */
const initialValues = {
  title: "",
  content: "",
  author: "",
};

/**
 *
 * @param {Object} values Capture the form inputs and check that they are valid
 * @returns {Object} Errors
 */
const validate = (values) => {
  const errors = {};

  if (values.author === "") {
    errors.author = "Required!";
  }

  return errors;
};

/**
 * 
 * @param {Object} users Object with users received from the API
 * @param {*} list Empty array where the list of user options will be rendered
 */
const getAuthors = (users, list) => {
  for (let i = 0; i < users.length; i++) {
    list.push(
      <option key={users[i]._id} value={users[i].username}>
        {users[i].username}
      </option>
    );
  }
};

/**
 *
 * @param {Function} param0 CreateNotes component function
 * @returns Component with the form to create new notes, and with the list of users
 */
function FormNotes({ handleSubmit }) {
  const [authors, setAuthors] = useState([]); //Users list
  const list = []; //Array that will render the users in a list of options

  /**
   * 
   * @param {Object} values Form content
   * @returns Reset the form values ​​once it was submitted
   */
  const onSubmit = (values) => {

    if (values.author !== "") {
      handleSubmit(values.title, values.content, values.author);
    }

    return (
      (formik.values.title = ""),
      (formik.values.content = "")
    );
  };

  
  
  /**
   * Constructor provided by Formik library
   */
  const formik = useFormik({
    initialValues,
    onSubmit,
    validate,
  });

  /**
   * Sends the selected value in the user list
   */
   const getE = (e) => {
    if (e.target.value === "Escoge un usuario") {
      formik.values.author = "";
    } else {
      formik.values.author = e.target.value;
    };
  };

  useEffect(() => {
    async function getUsers() {
      try {
        const res = await axios.get(`https://sticknotes-api.herokuapp.com/api/users`);
        const json = res.data;

        setAuthors(json);
      } catch (err) {
        console.log(err);
      }
    }

    getUsers();
  }, []);

  getAuthors(authors, list);

  return (
  <div className="form--container">
    <form className="form" onSubmit={formik.handleSubmit}>
      <h2>Crea una nueva nota :)</h2>
      <div className="form-div">
        <div className="div--one">
          <input
            id="title"
            name="title"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.title}
            onBlur={formik.handleBlur}
            className="inputOne"
            required
          />
          <label htmlFor="title" className="labelOne">
            Título
          </label>
        </div>
        <div className="div--two">
          <input
            id="content"
            name="content"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.content}
            onBlur={formik.handleBlur}
            className="inputTwo"            
            maxLength={80}
            required
          />
          <label htmlFor="content" className="labelTwo">
            Contenido
          </label>
        </div>
        <select className="form--options" onClick={getE}>
          <option key={1}>Escoge un usuario</option>
          {list}
        </select>
      </div>
      <button type="submit">
        <span>
          <img src="images/new-note.svg" alt="Add note" />
        </span>
        Crear
      </button>
    </form>
  </div>
  );
}

export default memo(FormNotes);
