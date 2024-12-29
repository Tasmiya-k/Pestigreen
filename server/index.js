const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const User = require("./models/userdata");
const Query = require("./models/query");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/pesti");

app.post("/userapi/register", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    await User.create({
      name: req.body.fullName,
      email: req.body.email,
      password: hashedPassword,
      confirmpassword: req.body.confirmPassword,
    });
    res.json({ status: "ok" });
  } catch (err) {
    res.json({ status: "error", error: "Duplicate email" });
  }
});

app.post("/userapi/login", async (req, res) => {
  console.log(req.body);
  try {
    const user = await User.findOne({
      email: req.body.email,
    });

    if (!user) {
      return res.json({ status: "error", message: "User not found" });
    }

    // Compare the provided password with the hashed password stored in the database
    const isValidPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (isValidPassword) {
      return res.json({ status: "ok", user: true });
    } else {
      return res.json({ status: "error", message: "Invalid password" });
    }
  } catch (error) {
    console.error("Error during login:", error);
    return res
      .status(500)
      .json({ status: "error", message: "Internal server error" });
  }
});

app.post("/userapi/savequery", async (req, res) => {
  try {
    // Log the entire image object to see its structure
    console.log(req.body.image);

    // Access the correct URI of the image
    const imageURI = req.body.image[0]?.uri;

    const newQuery = new Query({
      query: req.body.query,
      description: req.body.description,
      image: imageURI,
    });
    await newQuery.validate();

    // Save the new query to the database
    await newQuery.save();

    // Respond with a success message
    res.json({ status: "ok", message: "Query saved successfully" });
  } catch (error) {
    if (error.name === "ValidationError") {
      // Handle validation errors
      console.log(error);
      const errors = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({ status: "error", errors });
    }

    console.error("Error saving query:", error);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
});

app.get("/userapi/queries", async (req, res) => {
  try {
    const count = await Query.countDocuments();

    if (count === 0) {
      // If there are no documents, respond with an empty array
      return res.json({ status: "success", queries: [] });
    }

    // If there are documents, fetch all queries from the database
    const queries = await Query.find();

    // Respond with the queries
    res.json({ status: "success", queries });
  } catch (error) {
    console.error("Error fetching queries:", error);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
});

app.listen(1337, () => {
  console.log("Server has started on port 1337");
});
