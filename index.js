const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRouter = require("./authRouter");
const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(cors());
app.use("/auth", authRouter);

const start = async () => {
  try {
    await mongoose.connect(`CLOUD MONGODB LINK OR DATABASE`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    app.listen(PORT, () => console.log(`server started on port ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

start();

// const dotenv = require("dotenv");

// dotenv.config({
//   path: "./server/.env",
// });

// require("./data/db.js");
// const passport = require("./data/passport");
// const app = express();

// app.get("/auth/github", passport.authenticate("github"));

// app.get(
//   "/auth/github/callback",
//   passport.authenticate("github", { failureRedirect: "/" }),
//   function (req, res) {
//     res.send();
//   }
// );

// app.listen(3001, (err) => {
//   console.log("Server runned");
// });

//mongodb+srv://dbUser:<password>@cluster0.gddhg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
