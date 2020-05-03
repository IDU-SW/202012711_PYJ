const fs = require('fs');

class Task {
    constructor() {
        const data = fs.readFileSync('./model/data.json');
        this.tasks = JSON.parse(data)
    }

    getTaskList() {
        if (this.tasks) {
            return this.tasks;
        }
        else {
            return [];
        }
    }

    getTaskDetail(taskId) {
        return new Promise((resolve, reject) => {
            for (var task of this.tasks ) {
                if ( task.id == taskId ) {
                    resolve(task);
                    return;
                }
            }
            reject({msg:'Can not find detail task', code:404});
        });
    }

    addTask(task, subject, deadline, done) {
        return new Promise((resolve, reject) => {
            let last = this.tasks[this.tasks.length - 1];
            let id = last.id + 1;
            let newTask = {id, task, subject, deadline, done};
            this.tasks.push(newTask);

            resolve(newTask);
        });
    }

    updateTask(taskId, task, subject, deadline, done) {
        return new Promise((resolve, reject) => {
            for (var data of this.tasks ) {
                if ( data.id == taskId ) {
                    data.task = task;
                    data.subject = subject;
                    data.deadline = deadline;
                    data.done = done;
                    resolve(data);
                    return;
                }
            }
            reject({msg:'Can not update task', code:404});
        });
    }

    deleteTask(taskId) {
        return new Promise((resolve, reject) => {
            for (var task of this.tasks ) {
                if ( task.id == taskId ) {
                    this.tasks.splice(taskId, 1);
                    resolve(task);
                    return;
                }
            }
            reject({msg:'Can not find that named task', code:404});
        });
    }
}

module.exports = new Task();