const express = require('express');
const router = express.Router();
const tasks = require('../model/TaskModel');

router.post('/login', handleLogin);
router.delete('/logout',handleLogout);
router.get('/private', sendPrivateInfo);
router.get('/public', sendPublicInfo);

router.get('/tasks', showTaskList);
router.get('/tasks/new', addTaskForm);
router.get('/tasks/update/:taskId', updateTaskForm);
router.get('/tasks/:taskId', showTaskDetail);
router.post('/tasks', addTask);
router.put('/tasks/:taskId', updateTask);
router.delete('/tasks/:taskId', deleteTask);

module.exports = router;

const user = {
    id : 'yoo',
    password : '202012711',
    name : 'yoojin',
    instagram : 'https://www.instagram.com/dlwlrma'
}

function handleLogin(req, res) {
    const id = req.body.id;
    const password = req.body.password;
 
    if ( id === user.id && password === user.password ) {
       // 로그인 성공시 : 세션에 사용자 ID 저장
       req.session.userid = id;
       res.sendStatus(200);
    }
    else {
       res.sendStatus(401);
    }
}
 
function handleLogout(req, res) {
    req.session.destroy( err => {
       if ( err ) {
          res.sendStatus(500);
       }
       else {
          // 로그아웃 성공
          res.sendStatus(200);
       }
    });
}

function sendPublicInfo(req, res) {
    res.send({message : 'This is Public Information'});
}
 
function sendPrivateInfo(req, res) {
    const id = req.session.userid;
    if ( id ) {
       res.send(user);
    }
    else {
       res.sendStatus(401);
    }
}

// 모든 리스트
async function showTaskList(req, res) {
    const taskList = await tasks.getTaskList();
    const result = { data:taskList, count:taskList.length };
    res.render('taskList',result);
}

// 상세 페이지
async function showTaskDetail(req, res) {
    try {
        // 영화 상세 정보 Id
        const taskId = req.params.taskId;
        const info = await tasks.getTaskDetail(taskId);
        res.render('taskDetail',{data:info});
    }
    catch ( error ) {
        console.log('Can not find, 404');
        res.status(error.code).send({msg:error.msg});
    }
}

// task 추가 폼
function addTaskForm(req, res) {
    res.render('taskNew');
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
        res.render('taskDetail',{msg:'success', data:result});
    }
    catch ( error ) {
        res.status(500).send(error.msg);
    }
}

// task 수정 폼
async function updateTaskForm(req, res) {
    try {
        // 영화 상세 정보 Id
        const taskId = req.params.taskId;
        const info = await tasks.getTaskDetail(taskId);
        res.render('taskUpdate',{data:info});
    }
    catch ( error ) {
        console.log('Can not find, 404');
        res.status(error.code).send({msg:error.msg});
    }
}

// task 수정
async function updateTask(req, res) {
    const id = req.params.taskId;
    if (!id) {
        res.status(400).send({error:'id 누락'});
        return;
    }
    const task = req.body.task;
    const subject = req.body.subject;
    const deadline = req.body.deadline;
    const done = req.body.done;

    try {
        const _ = await tasks.updateTask(id, task, subject, deadline, done);
        const info = await tasks.getTaskDetail(id);
        res.render('taskDetail',{data:info});
    }
    catch ( error ) {
        res.status(500).send(error.msg);
    }
}
// task 삭제
async function deleteTask(req, res) {
    const id = req.params.taskId;
    try {
        const _ = await tasks.deleteTask(id);
        const taskList = await tasks.getTaskList();
        const data = { data:taskList, count:taskList.length };
        res.render('taskList',data);
    }
    catch ( error ) {
        res.status(500).send(error.msg);
    }
}