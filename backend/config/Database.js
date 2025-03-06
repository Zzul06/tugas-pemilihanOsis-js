import { Sequelize } from "sequelize";

const db = new Sequelize ('pemilihan_osis_db','root','',{
    host: 'localhost',
    dialect: 'mysql'
});

export default db;