if (process.env.NODE_ENV !== "production"){
    require("dotenv").config();
}

const express = require('express')
const mongoose = require("mongoose")

const app = express()
const port = process.env.PORT||3000

const connectDb=async()=>{
    await mongoose.connect(process.env.MONGO_URL)
    .then(()=>{app.listen(port,()=>{
        console.log(`listening on port:${port}`)
    })})
}

connectDb()
app.use(express.json())
const userRouter=require("./controller/routes/userRoutes")
const getRelatedUsers=require("./controller/routes/suggestedUsersPQRoute")
const friendReqRouter=require("./controller/routes/friendReqRoutes")

app.use('/api', userRouter)
app.use('/api', friendReqRouter)
app.use('/api', getRelatedUsers)
app.all('*', (req, res) => {
    res.status(404).json({ error: "not found!" })
})



