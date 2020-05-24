const fs = require('fs');

const Sequelize = require('sequelize');
const sequelize = new Sequelize('example', 'dev', '1234', {dialect:'mysql', host:'127.0.0.1'});

class Tasks extends Sequelize.Model {}
Tasks.init({
    id: {
        type: Sequelize.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true
    },
    task: Sequelize.STRING,
    subject: Sequelize.STRING,
    deadline: Sequelize.STRING,
    done: Sequelize.STRING,
}, {tableName:'tasks', sequelize, timestamps: false});

class Task {
    constructor() {
        try {
            this.prepareModel(); 
        } catch (error) {
            console.error(error);    
        }
    }

    async prepareModel() {
        try {
            await Tasks.sync({force:true});
            await this.preDataInsert();
        }
        catch (error) {
            console.log('prepareModel Error', error);
        }
    }

    async preDataInsert() {
        const data = fs.readFileSync('./model/data.json');
        const tasks = JSON.parse(data);
        for (var task of tasks ) {
            await this.oneDataInsert(task);
        }
    }

    async oneDataInsert(newTask) {
        try {
            const ret = await Tasks.create({
                task : newTask.task,
                subject : newTask.subject,
                deadline : newTask.deadline,
                done : newTask.done
            }, {logging: false});
            return ret;
        }
        catch (error) {
            console.log('Error : ', error);
        }
    }

    async getTaskList() {
        let ret;
        await Tasks.findAll({})
        .then( results => {
            for (var item of results) {
                console.log('id:', item.id, ' task:', item.task);
            }
            ret = results;
        })
        .catch( error => {
            console.error('Error :', error);
        });
        return ret;
    }

    async getTaskDetail(taskId) {
        try {
            // Primary Key로 찾기
            let results = await Tasks.findAll({ where:{id:taskId}});
            if ( results ) {
                return results[0];
            }
            else {
                console.log('no data');
            }
        }
        catch (error) {
            console.log('Error :', error);
        }
    }

    async addTask(add_task, add_subject, add_deadline, add_done) {
        try {
            const ret = await Tasks.create({
                task : add_task,
                subject : add_subject,
                deadline : add_deadline,
                done : add_done
            }, {logging: false});
            return ret;
        }
        catch (error) {
            console.log('Error : ', error);
        }
    }

    async updateTask(taskId, task, subject, deadline, done) {
        try {
            let updateTask = await Tasks.findByPk(taskId);
            updateTask.task = task
            updateTask.subject = subject
            updateTask.deadline = deadline
            updateTask.done = done
            
            let ret = await updateTask.save();
            let changedTask = ret.dataValues;
            console.log('ret :',changedTask);
        }
        catch (error) {
            console.log('Error :', error);
        }
    }

    async deleteTask(taskId) {
        try {
            let result = await Tasks.destroy({ where: {id:taskId}});
            console.log('Remove success :', result);
        }
        catch (error) {
            console.log('Remove Error :', error);
        }
    }
}

module.exports = new Task();