const fs = require("fs");
const mongoose = require("mongoose");
const Question = require("../models/Questions/QuestionModel");
const dotenv = require("dotenv").config();

const DB = process.env.DATABASE;

// connect to database
mongoose.connect(DB, {}).then(() => {
  console.log("DB connection successful!");
});

// READ JSON FILE
const quizzes = JSON.parse(
  fs.readFileSync(`${__dirname}/quiz-questions.json`, "utf-8")
);

// IMPORT DATA INTO DB
const importData = async () => {
  try {
    await Question.create(quizzes);
    console.log("Data successfully loaded!");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

// DELETE ALL DATA
const deleteData = async () => {
  try {
    await Question.deleteMany();
    console.log("Data successfully deleted!");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === "--import-data") {
  importData();
} else if (process.argv[2] === "--delete-data") {
  deleteData();
}

console.log(process.argv);
