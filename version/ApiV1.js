const IndexRouter = require('../routes/IndexRoute')
const EmployeeRouter = require('../routes/Employee')
const AttendanceRouter = require('../routes/Attendance')
const PayrollRouter = require('../routes/Payroll')
const RelativeRouter = require('../routes/Relative')

const router = require("express").Router();

router.use('/', IndexRouter)
router.use('/employee', EmployeeRouter)
router.use('/attendance', AttendanceRouter)
router.use('/payroll', PayrollRouter)
router.use('/relative', RelativeRouter)

module.exports = router