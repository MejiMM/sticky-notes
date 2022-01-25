const router = require("express").Router(),
    {getAllUsers, getUser, postUser, putUser, deleteUser} = require("../controllers/users-controllers");

router.route("/").get(getAllUsers)
    .post(postUser);

router.route("/:id")
    .get(getUser)
    .put(putUser)
    .delete(deleteUser);

module.exports = router;
