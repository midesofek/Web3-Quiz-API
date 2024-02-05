const Question = require("../models/Questions/QuestionModel");
require("dotenv").config();

const questionController = {};

questionController.getAllQuestions = async function (req, res) {
  try {
    /// for filtering our query ///
    // BUILD THE QUERY
    const queryObj = { ...req.query }; // creating a shadow copy of the query object
    const excludedFields = ["page", "sort", "limit", "fields"];
    excludedFields.forEach((el) => delete queryObj[el]);

    const query = Question.find(queryObj);

    // EXECUTE THE QUERY
    const questions = await query;

    // SEND THE RESPONSE
    res.status(200).json({
      status: "success",
      results: questions.length,
      data: {
        questions,
      },
    });
  } catch (err) {
    res.status(501).json({
      status: "fail",
      data: err,
    });
  }
};

module.exports = questionController;
