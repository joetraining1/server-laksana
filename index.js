//dependencies
const express = require('express')
const cors = require("cors")

//environtment config
require("dotenv").config()


// database initiator
// const { init } = require('./configs/db')

// init()

const app = express()
app.use(express.json())
app.use(cors({
    credentials: false,
    origin: ["http://localhost:5173"]
}))
const PORT = process.env.PORT 

//router register
// const indexRouter = require('./routes/IndexRoute')
// const employeeRouter = require('./routes/Employee')
// const attendanceRouter = require('./routes/Attendance')
// const payrollRouter = require('./routes/Payroll')
// const relativeRouter = require('./routes/Relative')
const v1 = require('./version/ApiV1')

//router list
app.use("/v1", v1)

// app.use("/v1", indexRouter)
// app.use("/v1/employee", employeeRouter)
// app.use("/v1/attendance", attendanceRouter)
// app.use("/v1/payroll", payrollRouter)
// app.use("/v1/relative", relativeRouter)

//exposed port
app.listen(PORT, () => {
    console.log(`app running on port : ${PORT}`)
})