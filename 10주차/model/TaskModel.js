const fs = require('fs');

const dbConn = require('./connection');
let index = 0;

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
            const db = await dbConn.getConn();
            const tasks = db.collection('Task');

            tasks.find().toArray((err, docs) => {
                if ( err ) {
                    console.log('find toArray Error : ', err);
                    return;
                }

                // 기존 데이터를 모두 삭제한다.
                for (var i = 0 ; i < docs.length; i++) {
                    tasks.deleteOne({id:docs[i].id}, (err, result) => {
                        if ( err ) {
                            console.error('DeleteOne Error ', err);
                            return;
                         }  
                    });
                }
            });

            await this.preDataInsert(tasks);
        }
        catch (error) {
            console.log('Perpare Error ', error);
        }

    }

    async preDataInsert(taskData) {
        const data = fs.readFileSync('./model/data.json');
        const tasks = JSON.parse(data);
        for (var task of tasks ) {
            await this.oneDataInsert(taskData, task);
            index++;
        }
    }

    async oneDataInsert(newTask, task) {
        console.log(task)
        try {
            await newTask.insertOne(task, (err, result) => {
                if (err) {
                    console.error('Insert Error', err);
                    return;
                 }
                 return result.ops[0];
            });
            return;
        } catch (error) {
            console.error(error);
        }
    }

    async getTaskList() {
        const db = await dbConn.getConn();
        const tasks = db.collection('Task');

        try {
            return await tasks.find().toArray();
        } catch(error) {
            console.log('getTaskList Error', error);
        }
        return;
    }

    async getTaskDetail(taskId) {
        const db = await dbConn.getConn();
        const tasks = db.collection('Task');
        try {
            const results = await tasks.findOne({id:taskId});
            if(!results)
                console.log('no data');
            return results;
        } catch(error) {
            console.log('taskId Error :', error);
        }
        return;
    }

}

module.exports = new Task();