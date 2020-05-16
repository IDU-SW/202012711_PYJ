const conn = require('./dbConnection');

exports.prepareTable = () => {
    const sql = 'drop table if exists tasks; create table tasks (id int primary key auto_increment, task varchar(50), subject varchar(50), deadline varchar(50), done varchar(50));';
    conn.query(sql).then(ret => {
        console.log('tasks 테이블 준비 완료');
        conn.end();
    }).catch(err => {
        console.log('tasks 테이블 준비 실패 :', err);
        conn.end();
    });
}
