const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
// const { UserSchema } = require("./models/Users/UserModel");
const app = require("./app");

const DB = process.env.DATABASE;

// connect to database
mongoose
  .connect(DB, {
    // useNewUrlParser: true,
    // useCreateIndex: true,
    // useFindAndModify: false,
  })
  .then(() => {
    console.log("DB connection successful!");
  });

// const User = mongoose.model("User", UserSchema);
// const testUser = new User({
//   username: "Mide Sofek",
//   email: "midesofek@gmail.com",
//   password: "12345678",
// });
// testUser
//   .save()
//   .then((doc) => {
//     console.log(doc);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
