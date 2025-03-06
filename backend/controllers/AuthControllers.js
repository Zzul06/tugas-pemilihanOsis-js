import bcrypt from 'bcrypt';
import Admin from '../models/AdminModel.js';

export const login = async (req, res) => { 
    const {username, password} = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: "Tolong isi semua kolom " });
    }

        try {
            const adminExist = await Admin.findOne({
                where: {
                    username: username
                }
            });

            console.log(adminExist);

            if (!adminExist) {
                return res.status(400).json({ message: "Kredensial tidak valid" });
            }

            const isMatch = await bcrypt.compare(password, adminExist.password);
            if (!isMatch) {
                return res.status(400).json({ message: "Kredensial tidak valid" });
            }

            return res.status(200).send({ message: "Login berhasil" });

        } catch (error) {
            console.log(error);
            res.status(500).send({ message: "Internal server error" });
            
        }
};

export const register = async (req, res) => {
    const {email, username, password} = req.body;

    if (!email || !username || !password) {
        return res.status(400).json({ message: "Tolong isi semua kolom" });
    }

    try {
        const adminExist = await Admin.findOne({
            where: {
                email: email,
                username: username
            }
        });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        if (adminExist) {
            return res.status(400).json({ message: "Akun sudah ada" });
        }

        const newAdmin = await Admin.create({
            email,
            username,
            password: hashedPassword
        });

        return res.status(201).send({ message: "Registrasi berhasil", admin : newAdmin });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Internal server error" });
    }
};

