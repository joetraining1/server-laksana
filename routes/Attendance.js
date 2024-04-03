const { AttendanceController } = require("../controllers/AttendanceController");

const router = require("express").Router();

router.post("/", AttendanceController.store)
router.put("/", AttendanceController.edit)
router.post("/delete/:id", AttendanceController.delete)
router.post("/get/:email", AttendanceController.indexByEmployee)
router.post("/getAll", AttendanceController.index)

module.exports = router