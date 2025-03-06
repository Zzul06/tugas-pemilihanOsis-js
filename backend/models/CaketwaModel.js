import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = Sequelize;

const Caketwa = db.define('caketwa',{
    namaTim: DataTypes.STRING,
    nomorUrut: DataTypes.INTEGER,
    caKetua: DataTypes.STRING,
    caWakil: DataTypes.STRING,
    proker: DataTypes.STRING,
    namaFoto: DataTypes.STRING,
    urlFoto: DataTypes.STRING
    },{
        freezeTableName:true
}); 

export default Caketwa;