const express = require('express');
const taskController=require('../controller/tasks');

const routes=express.Router();

routes.route('/').get(taskController.getAllTasks).post(taskController.createTask);
routes.route('/:id').get(taskController.getSingleTask).patch(taskController.updateTask).delete(taskController.deleteTask).put(taskController.editTask);


module.exports =routes;