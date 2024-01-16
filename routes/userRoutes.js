const { Router } = require("express");
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");

const greet = async (req, res) => {
  try {
    res.status(201).json({
      status: "success",
      data: "Hola!",
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      data: err,
    });
  }
};

const router = Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);

router
  .route("/")
  .get(userController.getAllUsers)
  .post(userController.createUser);

router
  .route("/:id")
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);
// router.route("/get-all-users").get(userController.getAllUsers);
// router.route("/get-user")
// router.route("/create-user").post(userController.createUser);
// router.route("/update-user").patch(userController.updateUser);
// router.route("/delete-user").delete(userController.deleteUser);

module.exports = router;
