const mongoose = require("mongoose");
const URI = process.env.MONGODB_URI;
const connection = mongoose.connection;

mongoose.connect(URI, {
    useNewUrlParser : true,
    useCreateIndex : true,
    useUnifiedTopology: true,
    useFindAndModify: false,
});

connection.once("open", () => {
    console.log("Database Connected");
});
