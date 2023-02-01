const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const errorHandler = require("./middleware/error");

const adminRoutes = require("./routes/admin");
const authRoutes = require("./routes/auth");
const Message = require("./models/msgSchema");

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connected"))
  .catch((err) => console.log(err));

app.use(morgan("dev"));
app.use(bodyParser.json({ limit: "100mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "100mb",
    extended: true,
  })
);
app.use(cookieParser());
app.use(cors());

app.post("/message", async (req, res) => {
  try {
    const name = req.body.name;
    const email = req.body.email;
    const phone = req.body.phone;
    const hours = req.body.hours;
    const position = req.body.position;
    const education = req.body.education;
    const years = req.body.years;
    const experience = req.body.experience;
    const project = req.body.project;
    const criminal = req.body.criminal;
    const refrences = req.body.refrences;
    const resume = req.body.resume;

    const sendMsg = new Message({
      name: name,
      email: email,
      phone: phone,
      hours: hours,
      position: position,
      education: education,
      years: years,
      experience: experience,
      project: project,
      criminal: criminal,
      refrences: refrences,
      resume: resume,
    });

    const created = await sendMsg.save();
    console.log(created);
    res.status(200).send("Sent");
  } catch (error) {
    res.status(400).send(error);
  }
});

app.use("/api", authRoutes);
app.use("/api", adminRoutes);

app.use(errorHandler);

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
