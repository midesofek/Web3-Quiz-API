const express = require("express");
const morgan = require("morgan");

// const tourRouter = require("./routes/tourRoutes");

const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorControllers");
const userRouter = require("./routes/userRoutes");
const questionsRouter = require("./routes/questionRoutes");

const app = express();

// 1) MIDDLEWARES
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// const handleUnhandledRouter = (req, res, next) => {
//   // res.status(404).json({
//   //   status: "fail",
//   //   message: `Can't find ${req.originalUrl} on this server!`,
//   // });

//   const err = new Error(`Can't find ${req.originalUrl} on this server!`);
//   err.status = "fail";
//   err.statusCode = 404;

//   next(err);
// };

/**
 * The express. json() function is a middleware function used in Express.js apps to parse
 * It is the process of converting a JSON string to a JSON object for data manipulation.
 */
app.use(express.json());

// app.use((req, res, next) => {
//   console.log("Hello from the middleware 👋");
//   next();
// });

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// 3) ROUTES
app.use("/api/v1/users", userRouter);
app.use("/api/v1/questions", questionsRouter);

// 4) HANDLE UNHANDLED ROUTES
app.all("*", (req, res, next) => {
  /// Method 1
  // res.status(404).json({
  //   status: "fail",
  //   message: `Can't find ${req.originalUrl} on this server!`,
  // });

  /// Method 2
  // const err = new Error(`Can't find ${req.originalUrl} on this server!`);
  // err.status = "fail";
  // err.statusCode = 404;
  // next(err);

  /// Method 3
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
