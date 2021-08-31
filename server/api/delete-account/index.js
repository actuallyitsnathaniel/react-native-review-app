const app = require("../../util/configureApi");
const connectDB = require("../../util/db");
const User = require("../../models/User");

app.post("*", (req, res) => {
  let finalUser;
  connectDB()
    .then(() => {
      console.log(req.body);
      return User.findOne({ email: req.body.email });
    })
    .then(user => {
      if (!user) {
        throw new Error("No user found.");
      }

      finalUser = user;
      return user.comparePassword(req.body.password);
    })
    .then(isPasswordCorrect => {
      if (!isPasswordCorrect) {
        throw new Error("Invalid password!");
      }
      // The actual deleting happens here!
      return User.findByIdAndDelete({ userId: finalUser._id }); // why u no delet
    })
    .then(result => {
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
