const express = require("express");
const path = require("path");
const app = express();
const mongoose = require('mongoose');
const User = require("./models/user.js");
const port = 8080;

main()
.then(() => {
    console.log("Connected to database");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/LifeAssist');
}


app.listen(port, () => {
    console.log(`Server is now listening on ${port}`);
})

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended: true}));

//Home route

app.get("/", (req, res) => {
    res.render("index.ejs");
})

app.get("/about", (req, res) => {
    res.render("about.ejs");
})

app.get("/ambulance", (req, res) => {
    res.render("ambulance.ejs");
})

app.get("/service", (req, res) => {
    res.render("service.ejs");
})


//Login route - to serve login form
app.get("/life-assist/login", (req, res) => {
    res.render("login.ejs")
})

//login route to check whether data is true or not if not then redirect to login route
app.post("/life-assist/login", (req, res) => {
    let { username, email, ph, password } = req.body;
})

//sign up route - to serve the form
app.get("/life-assist/signup", (req, res) => {
    res.render("signup.ejs")
})

//sign up route to save data of user
app.post("/life-assist", (req, res) => {
    let { username, email, ph, password } = req.body;
    let newUser = new User({
        username: username,
        email: email,
        ph: ph,
        password: password
    });

    newUser.save()
    .then(() => {
        console.log("Data saved successfully");
        res.redirect("/");
    })
    .catch((err) => {
        console.log(err);
        res.send("Some error occurred while saving data");
    })
})
