const router = require("express").Router(),
    {getAllNotes, getNote, postNotes, putNotes, deleteNotes } = require("../controllers/notes-controllers")

router.route("/")
    .get(getAllNotes)
    .post(postNotes);

router.route("/:id")
    .get(getNote)
    .put(putNotes)
    .delete(deleteNotes);

module.exports = router;
