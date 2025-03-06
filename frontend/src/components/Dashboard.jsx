import {useState, useEffect} from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


const Dashboard = () => {
    const [caketwa, setCaketwa] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getCaketwa();
    }, []);

    const getCaketwa = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get("http://localhost:3000/caketwa", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setCaketwa(response.data.data);
        } catch (error) {
            console.log(error.message);
        }
    }

    console.log(caketwa);

    

    const Logout = async () => {
        navigate('/login');
    }

    return (
        <>
            <p className="text-end mt-3 me-4">
                <a onClick={Logout} href='' className="link-offset-1 text-black ">Log Out</a>
            </p>
        </>
    )
}

export default Dashboard;