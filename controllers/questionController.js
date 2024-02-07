const Question = require("../models/Questions/QuestionModel");
const catchAsync = require("../utils/catchAsyncError");
require("dotenv").config();

const questionController = {};

questionController.getAllQuestions = catchAsync(async function (
  req,
  res,
  next
) {
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
});

module.exports = questionController;
