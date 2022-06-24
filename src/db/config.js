const sqlite3 = require('sqlite3');
const {open} = require('sqlite')

// configuração do banco de dados
module.exports = () =>
    open({
        filename:'./src/db/rocketq.sqlite',
        driver: sqlite3.Database,
    })