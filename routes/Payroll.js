const { PayrollController } = require("../controllers/PayrollController");

const router = require("express").Router();

router.post("/", PayrollController.store)
router.put("/", PayrollController.edit)
router.post("/delete/:id", PayrollController.delete)
router.post("/get/:email", PayrollController.indexByEmployee)
router.post("/getAll", PayrollController.index)

module.exports = router