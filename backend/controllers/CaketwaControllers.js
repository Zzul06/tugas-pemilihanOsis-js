import Caketwa from "../models/CaketwaModel.js";
import path from "path";
import fs from "fs";

export const getCaketwa = async(req, res) => {
    try {
        const response = await Caketwa.findAll();
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const getCaketwaById = async(req, res) => {
    try {
        const response = await Caketwa.findOne({
            where: {
                id: req.params.id
            }
        });
        res.json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const createCaketwa = async(req, res) => {  
    if(req.files === null) return res.status(400).json({msg: "No file uploaded"});
    const namaTim= req.body.namaTim;
    const nomorUrut = req.body.nomorUrut;
    const caKetua = req.body.caKetua;
    const caWakil = req.body.caWakil;
    const proker = req.body.proker;

    const file = req.files.file;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    const fileName = file.md5 + ext;
    const url = `${req.protocol}://${req.get("host")}/public/images/${fileName}`;
    const allowedType = ['.png','.jpg','.jpeg'];

    if(!allowedType.includes(ext.toLowerCase())) return res.status(422).json({msg: "Invalid Images"});
    if(fileSize > 5000000) return res.status(422).json({msg: "Image must be less than 5 MB"});

    file.mv(`./public/images/${fileName}`, async(err)=>{
        if(err) return res.status(500).json({msg: err.message});
        try {
            await Caketwa.create({
                namaTim: namaTim,
                nomorUrut: nomorUrut,
                caKetua: caKetua,
                caWakil: caWakil,
                proker: proker,
                namaFoto: fileName,
                urlFoto: url
            });
            res.status(201).json({msg: "Data Created Successfuly"});
        } catch (error) {
            console.log(error.message);
        }
    })
}

export const updateCaketwa = async(req, res) => {
    const data = await Caketwa.findOne({
        where: {
            id: req.params.id
        }
    });
    if(!data) return res.status(404).json({msg: "Data Caketwa Tidak Ditemukan"});

    let fileName = "";
    if(req.files === null){
        fileName = data.namaFoto;
    }else{
        const file = req.files.file;
        const fileSize = file.data.length;
        const ext = path.extname(file.name);
        fileName = file.md5 + ext;
        const allowedType = ['.png','.jpg','.jpeg'];

        if(!allowedType.includes(ext.toLowerCase())) return res.status(422).json({msg: "Invalid Images"});
        if(fileSize > 5000000) return res.status(422).json({msg: "Image must be less than 5 MB"});

        const filePath = `./public/images/${data.namaFoto}`;
        fs.unlinkSync(filePath);

        file.mv(`./public/images/${fileName}`, async(err)=>{
            if(err) return res.status(500).json({msg: err.message});
        });
    }

    const namaTim= req.body.namaTim;
    const nomorUrut = req.body.nomorUrut;
    const caKetua = req.body.caKetua;
    const caWakil = req.body.caWakil;
    const proker = req.body.proker;
    const url = `${req.protocol}://${req.get("host")}/public/images/${fileName}`;

    try {
        await Caketwa.update({
            namaTim: namaTim,
            nomorUrut: nomorUrut,
            caKetua: caKetua,
            caWakil: caWakil,
            proker: proker,
            namaFoto: fileName,
            urlFoto: url
        },{
            where: {
                id: req.params.id
            }
        });
        res.status(200).json({msg: "Data Caketwa Berhasil Diupdate"});
    } catch (error) {
        console.log(error.message);
    }
}

export const deleteCaketwa = async(req, res) => { 
    const caketwa = await Caketwa.findOne({
        where: {
            id: req.params.id
        }
    });

    if (!caketwa) {
        return res.status(404).json({msg: "Data Caketwa Tidak Ditemukan"});
    }

    try {
        const filePath = `./public/images/${caketwa.namaFoto}`;
        fs.unlinkSync(filePath);
        await Caketwa.destroy({
            where: {
                id: req.params.id
            }
        });
        res.status(200).json({msg: "Data Caketwa Berhasil Dihapus"});
    } catch (error) {
        console.log(error.message);
    }
}