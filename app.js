const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const blogRoutes = require("./routes/blogRoutes");
// express app

const app = express();

// connect to mongodb
const dbURI =
  "mongodb+srv://netninja:test12345@cluster0.sbyayzw.mongodb.net/node-tuts?retryWrites=true&w=majority";

mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

// register view engine
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// routes

app.get("/single-blog", (req, res) => {
  Blog.findById("63cb9c17740a4260d4890293")
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/", (req, res) => {
  res.redirect("/blogs");
});

app.get("/about", (req, res) => {
  // res.send('<p> about page </p>');
  res.render("about", { title: "About" });
});

// blog routes
app.use('/blogs/', blogRoutes);

// 404page
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
