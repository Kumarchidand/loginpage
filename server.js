const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/quadiro", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const Car = require("./models/car.js");

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

const adminCredentials = {
  username: "name",
  password: "1234", // Use a secure password in a real application
};

app.post("/admin/login", (req, res) => {
  const { username, password } = req.body;
  if (
    username === adminCredentials.username &&
    password === adminCredentials.password
  ) {
    res.status(200).send();
  } else {
    res.status(401).send();
  }
});

// CRUD Operations
app.post("/api/cars", async (req, res) => {
  try {
    const car = new Car(req.body);
    await car.save();
    res.status(201).send(car);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.get("/api/cars", async (req, res) => {
  try {
    const cars = await Car.find({});
    res.status(200).send(cars);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.put("/api/cars/:id", async (req, res) => {
  try {
    const car = await Car.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!car) {
      return res.status(404).send();
    }
    res.send(car);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.delete("/api/cars/:id", async (req, res) => {
  try {
    const car = await Car.findByIdAndDelete(req.params.id);
    if (!car) {
      return res.status(404).send();
    }
    res.send(car);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.get("/admin/dashboard", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "dashboard.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
