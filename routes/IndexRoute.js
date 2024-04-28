const { EmployeeController } = require("../controllers/EmployeeController");

const router = require("express").Router();

router.get("/", (req, res) => {
  return res.status(200).send({
    message: "you are connected to this API.",
  });
});
router.get("/hello", (req, res) => {
  return res.status(200).send("Hello World!");
});
router.post("/register", EmployeeController.register);
router.post("/login", EmployeeController.login);

module.exports = router;
