import React from "react";
import { useFormik } from "formik";
import "../styles/FormUser.css";

/**
 * Object to handle the initial values ​​of the form
 */
const initialValues = {
  name: "",
};

/**
 *
 * @param {Object} values Capture the form inputs and check that they are valid
 * @returns {Object} Errors
 */
const validate = (values) => {
  const errors = {};
  const regExp =
    /^([a-zA-Z]{2,}\\s[a-zA-z]{1,}'?-?[a-zA-Z]{2,}\\s?([a-zA-Z]{1,})?)/;

  if (!values.name) {
    errors.name = "Required!";
  } else if (regExp.test(values.name)) {
    errors.name = "Ingresá un nombre válido";
  }

  return errors;
};

/**
 * 
 * @param {Function} param0 Function sent from the CreateUser component that allows creating a user
 * @returns 
 */
export default function FormUser({ handleCreate }) {

  /**
   * 
   * @param {Object} values Data that comes from the form at the time of sending
   * @returns Reset the fields
   */
  const onSubmit = (values) => {
    handleCreate(values.name);

    return (formik.values.name = "");
  };

  /**
   * Constructor provided by Formik library
   */
  const formik = useFormik({
    initialValues,
    onSubmit,
    validate,
  });

  return (
    <>
      {/* El método handleSubmit devuelve la funcion indicada en onSubmit */}
      <form onSubmit={formik.handleSubmit} className="form--box">
        <h2>Crea un nuevo usario</h2>
        {/* El método handleChange detecta cambio en los campos indicados en initialValues a traves del objeto values */}
        <div className="form--div">
          <input
            id="name"
            className="form--input"
            name="name"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.name}
            onBlur={formik.handleBlur}
          />
          <label htmlFor="name" className="form--label">
            User Name
          </label>
        </div>
        {/* Aqui se devuelve los errores indicados en validate, a traves del objeto errors */}
        {formik.touched.name && formik.errors.name ? (
          <div>{formik.errors.name}</div>
        ) : null}
        <button type="submit" className="form--button">
          <span>
            <img
              className="img--button"
              src="images/plus.svg"
              alt="Button add"
            />
          </span>
          Crear
        </button>
      </form>
    </>
  );
}
