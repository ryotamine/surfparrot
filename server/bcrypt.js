const express = require("express");
const cookieSession = require("cookie-session");
const bcrypt = require("bcrypt");
//const getRegistrationInfo = require("../client/src/registration_form")

const app = express();

app.use(cookieSession({
  name: "session",
  keys: ["surfparrot"]
}));

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

// Generate string of 10 random alphanumeric characters
function generateRandomString() {
  let text = "";
  let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < 10; i++) {
    text += str.charAt(Math.floor(Math.random() * str.length));
  }
  return text;
}

// GET registration
app.get("/", (req, res) => {
  let templateVars = {
    account: somethingKnex[req.session.accountId]
  };
  res.render("../client/src/registration_form", templateVars);
});

// POST registration form
app.post("/user/:id", (req, res) => {
  const id = generateRandomString();
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const password = req.body.password;
  const hashedPassword = bcrypt.hashSync(password, 10);
  console.log(firstName, lastName, email, password, hashedPassword);

  // Check if email already exists
  for (let accountId in somethingKnex) {
    if (email === somethingKnex[accountId].email) {
      res.status(400).send("Invalid. Please try again.");
    }
  }

  // Add account to database
  somethingKnex[accountId] = {
    id,
    firstName,
    lastName,
    email,
    hashedPassword
  };
  
  // Test for cookie after registration
  req.session.accountId = id;
  console.log(somethingKnex);

  // Check for registration errors
  if (!firstName || !lastName || !email || !password) {
    res.status(400).send("Invalid. Please try again.");
    return;
  } else {
    res.redirect("?");
  }

  // const account = new Account({ firstName, lastName, email, password });
  // account.save(function(err) {
  //   if (err) {
  //     res.status(500).send("Registration error. Please try again.");
  //   } else {
  //     res.status(200).send("Registration confirmed.");
  //   }
  // });
});
