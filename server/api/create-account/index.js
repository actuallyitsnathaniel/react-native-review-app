const app = require("../../util/configureApi");
const connectDB = require("../../util/db");
const User = require("../../models/User");

app.post("*", (req, res) => {
  connectDB()
    .then(() => {
      return User.findOne({ email: req.body.email });
    })
    .then(user => {
      if (user) throw new Error("User already exists");
      // why is it not creating?!?!
      else
        return User.create({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          password: req.body.password
        });
    })
    .then(() => {
      res.status(200).json({
        result
      });
    })
    .catch(err => {
      res.status(err.statusCode || 500).json({
        error: err.message
      });
    });
});

module.exports = app;
