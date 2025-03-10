import {useState, useEffect} from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Row from 'react-bootstrap/Row';
import Image from 'react-bootstrap/Image';
import { useNavigate } from "react-router-dom";


const Dashboard = () => {
    const [caketwa, setCaketwa] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getCaketwa();
    }, []);

    const getCaketwa = async () => {
        try {
            const response = await axios.get("http://localhost:3000/caketwa");
            setCaketwa(response.data);
        } catch (error) {
            console.log(error.message);
        }
    };
    console.log(caketwa);

    const deleteCaketwa = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/caketwa/${id}`);
            getCaketwa();
        } catch (error) {
            console.log(error);
        }
    };

    const Logout = async () => {
        navigate('/login');
    };

    return (
        <>
            <p className="text-end mt-3 me-4">
                <a onClick={Logout} href='' className="link-offset-1 text-black ">Log Out</a>
            </p>
            <Card className='m-3 border-2 border-danger'>
                <Card.Body>
                <Row className='justify-content-end me-0'>
                    <Link to='/add' className='text-decoration-none text-reset' style={{ width: '15rem' }}>
                    <Button variant='outline-danger' className='w-100'>
                        Tambah Caketwa
                    </Button>
                    </Link>
                </Row>
                <Table hover responsive className='mt-3 '>
                    <thead>
                    <tr className='text-center'>
                        <th>Nama Tim</th>
                        <th>Nomor Urut</th>
                        <th>Caketos</th>
                        <th>Cawaketos</th>
                        <th>Program Kerja</th>
                        <th>Foto</th>
                        <th colSpan={2}>Aksi</th>
                    </tr>
                    </thead>
                    <tbody>
                    {caketwa.map((caketwa, index) => (
                        <tr key={index} className='text-center'>
                        <td>{caketwa.namaTim}</td>
                        <td>{caketwa.nomorUrut}</td>
                        <td>{caketwa.caKetua}</td>
                        <td>{caketwa.caWakil}</td>
                        <td>{caketwa.proker}</td>
                        <td>
                            <Image style={{ width: '100px' }} src={caketwa.urlFoto} />
                        </td>
                        <td className='align-start'>
                            <Link to={`/edit/${caketwa.id}`} className='text-decoration-none text-reset'>
                            <Button variant='warning' className='w-100'>Edit</Button>
                            </Link>
                        </td>
                        <td className='align-start'>
                            <Button variant='danger' className='w-100' onClick={() => deleteCaketwa(caketwa.id)}>Hapus</Button>
                        </td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
                </Card.Body>
            </Card>
        </>
    )
}

export default Dashboard;