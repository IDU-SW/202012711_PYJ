const express = require('express');
const router = express.Router();
const tasks = require('../model/TaskModel');

router.get('/tasks', showTaskList);
router.get('/tasks/:taskId', showTaskDetail);
router.post('/tasks', addTask);

module.exports = router;

function showTaskList(req, res) {
    const taskList = tasks.getTaskList();
    const result = { data:taskList, count:taskList.length };
    res.send(result);
}


// Async-await를 이용하기
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


// 새 영화 추가
// POST 요청 분석 -> 바디 파서
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