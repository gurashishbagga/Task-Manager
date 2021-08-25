const express = require('express')
require('./DB/mongoose.js')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')
const app = express()

// app.use((req,res,next) => {
//     if(req.method){
//         res.status(503).send('Site under maintenance')
//     }
// })


app.use(userRouter)
app.use(taskRouter)
app.use(express.json())



app.listen(3001,() => {
    console.log('server is up')
})
