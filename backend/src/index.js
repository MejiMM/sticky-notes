require("dotenv").config();

const app = require("./app");
const PORT = process.env.PORT || 5000;
require("./database");


//Server started on a free or default port   
app.listen(PORT, () => {
    console.log(`Server on ${PORT}`);
});
