const fs = require('fs');
const pool = require('../dbConnection');

class Task {
    /*
    constructor() {
        const data = fs.readFileSync('./model/data.json');
        this.tasks = JSON.parse(data)
    }
    */
    getTaskList = async() => {
        let conn;
        const sql = 'SELECT * FROM tasks';
        
        try {
            conn = await pool.getConnection();
            const [rows, metadata] = await conn.query(sql);
            conn.release();
            return rows;
        } catch (error) {
            console.error(error);
        } finally {
            if ( conn ) conn.release();
        }
    }

    getTaskDetail = async(taskId) => {
        let conn;
        const sql = 'SELECT * FROM tasks WHERE id = ?';

        try {
            conn = await pool.getConnection();
            const [rows, metadata] = await conn.query(sql, taskId);
            for(let row of rows) {
                conn.release();
                return row;
            }        
        } catch (error) {
            console.error(error);
        } finally {
            if ( conn )
                conn.release();
        }
    }

    addTask = async(add_task, add_subject, add_deadline, add_done) => {
        let conn;
        const sql1 = 'INSERT INTO tasks SET ?;';
        const sql2 = 'SELECT * FROM tasks WHERE id = ?';

        try {
            conn = await pool.getConnection();
            const data = { task: add_task, subject: add_subject, deadline: add_deadline, done: add_done};
            const ret = await conn.query(sql1, data);
            const [rows, metadata] = await conn.query(sql2, ret[0]['insertId']);
            for(let row of rows) {
                conn.release();
                return row;
            }         
        } catch (error) {
            console.error(error);
        } finally {
            if ( conn )
                conn.release();
        }
    }

    updateTask = async(taskId, task, subject, deadline, done) => {
        let conn;
        const sql = 'UPDATE tasks SET ? WHERE id = ?';
        const param = {task: task, subject: subject, deadline: deadline, done: done};
        const condition = taskId;
        
        try {
            conn = await pool.getConnection();
            const ret = await conn.query(sql, [param, condition] );
            conn.release();
            return ret;
        } catch (error) {
            console.error(error);  
        } finally {
            if ( conn ) conn.release();
        }
    }

    deleteTask = async(taskId) => {
        let conn;
        const sql = 'DELETE FROM tasks WHERE id = ?';
        
        try {
            conn = await pool.getConnection();        
            const ret = await conn.query(sql, taskId);
            return ret;
        } catch (error) {
            console.error(error);  
        } finally {
            if ( conn ) conn.release();
        }
    }
}

module.exports = new Task();