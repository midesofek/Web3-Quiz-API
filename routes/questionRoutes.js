const { Router } = require("express");
const questionController = require("../controllers/questionController");

const router = Router();

router.route("/").get(questionController.getAllQuestions);

// router
//   .route("/")
//   .get(userController.getAllUsers)
//   .post(userController.createUser);

// router
//   .route("/:id")
//   .get(userController.getUser)
//   .patch(userController.updateUser)
//   .delete(userController.deleteUser);

module.exports = router;
