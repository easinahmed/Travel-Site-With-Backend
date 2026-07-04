require("dotenv").config();
const app = require("./app");

const PORT = process.env.PORT || 8080; // default to 8080 as per env setup

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});