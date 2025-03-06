import db from "../config/Database.js";
import Admin from "./AdminModel.js";
import Caketwa from "./CaketwaModel.js";

const syncDataBase=async()=>{
    try {
        await db.sync({alter:true,force:true});
        console.log("database and model synced successfully");
    } catch (error) {
        console.log(error.message);
    }
}

export{Admin,Caketwa,syncDataBase};