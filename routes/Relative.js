const { RelativeController } = require("../controllers/RelativeController");

const router = require("express").Router();

router.post("/", RelativeController.delete)
router.put("/", RelativeController.edit)
router.post("/delete/:id", RelativeController.delete)
router.post("/get/:email", RelativeController.indexByEmployee)
router.post("/getAll", RelativeController.index)

module.exports = router