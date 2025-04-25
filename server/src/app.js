require("dotenv").config();
const cors = require("cors");
const express = require("express");
const appealsRouter = require("./routers/appealsRouter.js");

const app = express();
const { PORT } = process.env;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use("/api/v1/appeals", appealsRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
