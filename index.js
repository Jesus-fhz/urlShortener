//IMPORTS
const express = require("express");
const cors = require("cors");
//Morgan for logs request
const morgan = require("morgan");
//Helmet for http security
const helmet = require("helmet");
const main = require("./main");
//MONK FOR MONGODB()


const app = express();
app.use(helmet());
app.use(morgan("tiny"));
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("./public"));

//ROUTES

//Find Url
app.get('/:idUrl',main.findUrl);

//Create new url
app.post("/url", main.generateUrl);


//ERROR HANDLER-Default node middle
app.use(function (err, req, res, next) {
  if (err.status) {
    res.status(err.status);
  } else {
    res.status(500);
  }
  res.json({
    message: err.message,
    stack:process.env.NODE_ENV === "production" ? "Something happened!" : err.stack,
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening in port ${port}`);
});
