const express = require("express"),
    cors = require("cors"),
    app = express();

//Settings


//Middlewares
app.use(cors());
app.use(express.json());

//Routes
app.use("/api/users", require("./routes/users"));

app.use("/api/notes", require("./routes/notes"));

module.exports = app;