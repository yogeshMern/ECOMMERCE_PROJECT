const app = require("./App");
const Database = require("./config/Mongoose");

const PORT = process.env.PORT || 3000;

Database();

app.listen(PORT, () => console.log(`Server is running on ${PORT}...⚡`));
