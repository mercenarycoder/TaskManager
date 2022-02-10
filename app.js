const express = require('express');
const mongoose = require('mongoose');
const tasks=require('./router/tasks');
const connectDB= require('./db/connect');
const notFound=require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');
// requiring the dotenv package for the secrets
require('dotenv').config();
const app= express();

// setting the statis files
app.use(express.static('./public'));
// middleware
app.use(express.json());

// routes
app.get('/hello', function (req, res) {
    res.send('Task Manager App');
})
app.use('/api/v1/tasks',tasks);
app.use(notFound);
app.use(errorHandlerMiddleware);
// apis that will be their in this project are.
// this is the convention to write apis
// app.get('/api/v1/tasks'); -get all the tasks
// app.post('/api/v1/tasks'); -create a new task
// app.get('/api/v1/tasks/:id') -get single task
// app.patch('/api/v1/tasks/:id') -update task
// app.delete('/api/v1/tasks/:id') -delete task

const port = process.env.PORT ||3000;

const start= async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port, console.log(`Server is listening on port ${port}`));
    } catch (error) {
        console.log(error);
    }
}
start();

