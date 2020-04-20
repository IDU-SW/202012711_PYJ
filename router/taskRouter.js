const express = require('express');
const router = express.Router();
const tasks = require('../model/TaskModel');

router.get('/tasks', showTaskList);
router.get('/tasks/:taskId', showTaskDetail);
router.post('/tasks', addTask);
router.post('/tasks/update', updateTask);

module.exports = router;

// 모든 리스트
function showTaskList(req, res) {
    const taskList = tasks.getTaskList();
    const result = { data:taskList, count:taskList.length };
    res.send(result);
}

// 하나의 리스트
async function showTaskDetail(req, res) {
    try {
        // 영화 상세 정보 Id
        const taskId = req.params.taskId;
        const info = await tasks.getTaskDetail(taskId);
        res.send(info);
    }
    catch ( error ) {
        console.log('Can not find, 404');
        res.status(error.code).send({msg:error.msg});
    }
}

// task 추가
async function addTask(req, res) {
    const task = req.body.task;

    if (!task) {
        res.status(400).send({error:'task 누락'});
        return;
    }

    const subject = req.body.subject;
    const deadline = req.body.deadline;
    const done = req.body.done;

    try {
        const result = await tasks.addTask(task, subject, deadline, done);
        res.send({msg:'success', data:result});
    }
    catch ( error ) {
        res.status(500).send(error.msg);
    }
}

// task 수정
async function updateTask(req, res) {
    const id = req.body.id;

    if (!id) {
        res.status(400).send({error:'id 누락'});
        return;
    }

    const task = req.body.task;
    const subject = req.body.subject;
    const deadline = req.body.deadline;
    const done = req.body.done;

    try {
        const result = await tasks.updateTask(id, task, subject, deadline, done);
        res.send({msg:'success', data:result});
    }
    catch ( error ) {
        res.status(500).send(error.msg);
    }
}