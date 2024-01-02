const mongoose = require("mongoose");

const mongooseConnect = () => {
  const databaseUrlObj = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  mongoose
    .connect(process.env.MONGOOSE_URL, databaseUrlObj)
    .then((res) => console.log("[=============================== Databse Connected Successfuly👍 ===============================]"))
    .catch((err) => console.log("Databse Connection Error!🔻"));
};

module.exports = mongooseConnect;
