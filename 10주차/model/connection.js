const MongoClient = require('mongodb').MongoClient
const url = 'mongodb://localhost:27017';

module.exports = {
    db: null,
    getConn: async () => {
        if ( this.db != null ) {
            return this.db;  
        }

        const client = await MongoClient.connect(url, {useUnifiedTopology: true, useNewUrlParser: true});
        this.db = client.db('task');

        return this.db;
    }
}