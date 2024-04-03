const { EmployeeController } = require("../controllers/EmployeeController");

const router = require("express").Router();

router.post("/", EmployeeController.store);
router.put("/:email", EmployeeController.edit);
router.delete("/:id", EmployeeController.delete);
router.put("/:id", EmployeeController.edit);

module.exports = router