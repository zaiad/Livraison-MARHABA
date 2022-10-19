const express = require('express');
const colors = require('colors')
const dotenv = require('dotenv').config();
// const {errorHandler} = require('./middleware/errorMiddleware')
const connectDB = require('./config/dbConfig')
const port = process.env.PORT || 2000

const routerUser = require('./routes/userRoutes')
connectDB()


const app = express();

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/api/goals', require('./routes/goalRoutes'))
app.use('/api/users', routerUser)

// app.use(errorHandler)

app.listen(port, ()=> console.log(`server started on port ${port}`))