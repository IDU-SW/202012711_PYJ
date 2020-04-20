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
}

module.exports = new Task();