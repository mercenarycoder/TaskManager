const Task = require('../models/Task');
const asyncWrapper = require('../middleware/async');
const { createCustomError }=require('../errors/custom-error');

const getAllTasks = asyncWrapper(async function (req, res) {
    const tasks = await Task.find({});
    res.status(200).json({ tasks });
    // res
    //     .status(200)
    //     .json({ status: 'success', data: { tasks, nbHits: tasks.length } })
})

const getSingleTask = asyncWrapper(async function (req, res,next) {
    const { id } = req.params;
    const task = await Task.findOne({ _id: id });
    if (!task) {
        // const error=new Error('Task not found');
        // error.status = 404
        // return next(error);
        // return res.status(404).json({ msg: `No task is present with the id: ${id}` });
        return next(createCustomError(`No task is present with the id: ${id}`,404));
    }
    res.status(200).json({ task });
})

const createTask = asyncWrapper(async function (req, res) {
    const task = await Task.create(req.body);
    res.status(201).json(task);
})
// Patch:- THis will only update the heading which are being getting updated
// Expectation:- Updating the object
const updateTask = asyncWrapper(async function (req, res) {
    const { id: taskID } = req.params;
    const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
        new: true,
        runValidators: true
    });
    if (!task) {
        // const error=new Error('Task not found');
        // error.status = 404
        // return next(error);
        // return res.status(404).json({ msg: `No task is present with the id: ${id}` });
        return next(createCustomError(`No task is present with the id: ${taskID}`,404));
    }
    res.status(200).json({ task });
});

const deleteTask = asyncWrapper(async function (req, res) {
    const { id: taskID } = req.params;
    const result = await Task.findOneAndDelete({ _id: taskID });
    if (!result) {
        // const error=new Error('Task not found');
        // error.status = 404
        // return next(error);
        // return res.status(404).json({ msg: `No task is present with the id: ${id}` });
        return next(createCustomError(`No task is present with the id: ${taskID}`,404));
    }
    res.status(200).json({ task: result });
});

// this function is to show the put method
// PUT-:This method will update the whole fields of that particular object
// Expectation :- Replace the object
const editTask = asyncWrapper(async function (req, res) {
    const { id: taskID } = req.params;
    const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
        new: true,
        runValidators: true,
        overwrite: true
    });
    if (!task) {
        res.status(404).json({ msg: `No task is found by id : ${taskID}` });
    }
    res.status(200).json({ task });
})

module.exports = {
    getAllTasks, getSingleTask, deleteTask, updateTask, createTask, editTask
}