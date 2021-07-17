import React, { useState, useEffect } from "react";
import "../styles/ListNotes.css";
import axios from "axios";
import "../helper/useModal.js";
import Modal from "./Modal";
import useModal from "../helper/useModal.js";
import { useFormik } from "formik";

let idOption = ""; //Variable that stores the id of a user

/**
 * Object to handle the initial values ​​of the form
 */
const initialValues = {
  title: "",
  content: "",
  author: ""
};




/**
 * 
 * @param {Function} set Update the state
 * @param {Boolean} list Swap true or false to update the component
 * @param {Function} close Function that allows closing the modal window
 */
const handleDelete = async (set, list, close) => {
    await axios.delete(`https://sticknotes-api.herokuapp.com/api/notes/${idOption}`);
    close();
    set(!list);
};

/**
 * 
 * @returns Component with the list of notes, and that allows you to edit or delete them
 */
export default function NotesList() {
  const [notes, setNotes] = useState([]); //Notes list
  const [list, setList] = useState(false); //By changing its value, the component is updated
  const [isEditOpen, openEditModal, closeEditModal] = useModal(); //Custom hook that allows to handle the modal window 
  const [isDeleteOpen, openDeleteModal, closeDeleteModal] = useModal();
  
  /**
 * 
 * @param {Object} values Data sent by the form
 */
 const onSubmit = async (values) => {

  await axios.put(`https://sticknotes-api.herokuapp.com/api/notes/${idOption}`, {
    title: values.title,
    content: values.content,
    author: values.author
  });

  setList(!list);
};

  /**
   * Constructor provided by Formik library
   */
  const formik = useFormik({
    initialValues,
    onSubmit,
  });


  /**
   * 
   * @param {Event} e Detects which option is chosen, and allows to edit or delete
   */
  const handleNotes = (e) => {
    if (e.target.value === "edit") {
      openEditModal();
      idOption = e.target.offsetParent.id;
      e.target[0].selected = true;
    } else if (e.target.value === "delete") {
      openDeleteModal();
      idOption = e.target.offsetParent.id;
      e.target[0].selected = true;
    }
  };

  useEffect(() => {
    async function getNotes() {
      await axios
        .get(`https://sticknotes-api.herokuapp.com/api/notes`)
        .then((json) => setNotes(json.data))
        .catch((err) => console.log(err));
    }

    getNotes();

  }, [list]);

  return (
    <section>
      <h2>Lista de notas</h2>
      <div className="notes--div">
        <ul className="notes--list">
          {notes.length === 0
            ? "Aun no existen notas :("
            : notes.map((el) => (
                <li key={el._id} id={el._id} className="notes--list__item">
                  <h3>{el.title}</h3>
                  <p>{el.content}</p>
                  <h3>{el.author}</h3>
                  <select name="options" onClick={handleNotes}>
                    <option value="">Escoge una opción</option>
                    <option value="edit">Editar</option>
                    <option value="delete">Eliminar</option>
                  </select>
                </li>
              ))}
        </ul>
      </div>
      <Modal isOpen={isEditOpen} closeModal={closeEditModal}>
        <form
          onSubmit={formik.handleSubmit}
          className="form--modal"
        >
          <label htmlFor="title">Título</label>
          <input
            id="title"
            name="title"
            value={formik.values.title}
            type="text"
            onChange={formik.handleChange}
            required
          />
          <label htmlFor="content">Nota</label>
          <input
            id="content"
            name="content"
            value={formik.values.content}
            type="text"
            onChange={formik.handleChange}
            required
          />
          <label htmlFor="author">Usuario</label>
          <input
            id="author"
            name="author"
            value={formik.values.author}
            type="text"
            onChange={formik.handleChange}
            autoComplete="off"
            required
          />
          <button type="submit" onClick={closeEditModal}>Finalizado</button>
        </form>
      </Modal>
      <Modal isOpen={isDeleteOpen} closeModal={closeDeleteModal}>
        <div className="delete--modal">
          <h3>¿Desea eliminar esta nota?</h3>
          <button onClick={() => handleDelete(setList, list, closeDeleteModal)}>
            Eliminar
          </button>
          <button onClick={closeDeleteModal}>Cancelar</button>
        </div>
      </Modal>
    </section>
  );
}
