const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const Blog = require('./models/blogs')
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
app.use(morgan("dev"));

// mongoose and mongo sandbox routes
app.get('/add-blog', (req, res) => {
 const blog = new Blog({
  title: 'new blog',
  snippet: 'About my new blog',
  body: 'more about my new blog'
 })

 blog.save()
  .then((result) =>{
     res.send(result)
  })
  .catch((err) => {
    console.log(err);
  })
})

app.get("/", (req, res) => {
  const blogs = [
    {
      title: "Yoshi finds eggs",
      snippet: "Lorem ipsum dolor sit amet consectetur",
    },
    {
      title: "Mario finds stars",
      snippet: "Lorem ipsum dolor sit amet consectetur",
    },
    {
      title: "How to defeat bowser",
      snippet: "Lorem ipsum dolor sit amet consectetur",
    },
  ];
  res.render("index", { title: "Home", blogs });
});

app.get("/about", (req, res) => {
  // res.send('<p> about page </p>');
  res.render("about", { title: "About" });
});

app.get("/blogs/create", (req, res) => {
  res.render("create", { title: "Create a new Blog" });
});

// 404page
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
