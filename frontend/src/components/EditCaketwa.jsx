import Container from 'react-bootstrap/Container'
import RowSt from 'react-bootstrap/Row'
import ColSt from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link, useNavigate, useParams } from 'react-router-dom';
import RowSec from 'react-bootstrap/esm/Row';
import ColSec from 'react-bootstrap/esm/Col';
import { useEffect, useState } from 'react';
import axios from 'axios';


export const EditDataForm = () => {
    const [namaTim, setNamaTim] = useState("");
    const [nomorUrut, setNomorUrut] = useState("");
    const [caKetua, setCaKetua] = useState("");
    const [caWakil, setCaWakil] = useState("");
    const [proker, setProker] = useState("");
    const [file, setFile] = useState("");
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        getCaketwaById();
    }, []);

    const getCaketwaById = async () => {
        const response = await axios.get(`http://localhost:3000/caketwa/${id}`);
        setNamaTim(response.data.namaTim);
        setNomorUrut(response.data.nomorUrut);
        setCaKetua(response.data.caKetua);
        setCaWakil(response.data.caWakil);
        setProker(response.data.proker);
        setFile(response.data.file);
        console.log(response.data[0]);
    };

    const updateCaketwa = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("namaTim", namaTim);
        formData.append("nomorUrut", nomorUrut);
        formData.append("caKetua", caKetua);
        formData.append("caWakil", caWakil);
        formData.append("proker", proker);
        formData.append("file", file);

        try {
            await axios.put(`http://localhost:3000/caketwa/${id}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            navigate('/dashboard');
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Container fluid='md' className="min-vh-100 d-flex flex-column justify-content-center align-items-center">
        <RowSt className="justify-content-center w-50">
            <ColSt xs={6}>
            <h2 className="pb-2 text-center">Ubah Data</h2>
            <Form onSubmit={updateCaketwa}>
                <Form.Control
                    type="text"
                    placeholder="Nama Tim"
                    className='mb-2 bg-white'
                    value={namaTim}
                    onChange={(e) => setNamaTim(e.target.value)}
                />

                <Form.Control
                    type="text"
                    placeholder="Nomor Urut"
                    className='mb-2 bg-white'
                    value={nomorUrut}
                    onChange={(e) => setNomorUrut(e.target.value)}
                />

                <Form.Group className='mb-2'>
                    <Form.Label className='mb-2 ms-1 text-start'>Foto : </Form.Label>
                    <Form.Control
                    type="file"
                    className='bg-white'
                    onChange={(e) => setFile(e.target.files[0])}
                    />
                </Form.Group>

                <Form.Control
                    type="text"
                    placeholder="Ketua"
                    className='mb-2 bg-white'
                    value={caKetua}
                    onChange={(e) => setCaKetua(e.target.value)}
                />

                <Form.Control
                    type="text"
                    placeholder="Wakil Ketua"
                    className='mb-2 bg-white'
                    value={caWakil}
                    onChange={(e) => setCaWakil(e.target.value)}
                />

                <Form.Control
                    as="textarea"
                    placeholder="Program Kerja"
                    style={{ height: '100px' }}
                    className='mb-2'
                    value={proker}
                    onChange={(e) => setProker(e.target.value)}
                />

                <RowSec>
                    <ColSec xs={6}>
                    <Link to='/dashboard' className='text-decoration-none text-reset w-100'>
                        <Button variant="outline-danger" className='w-100'>
                        Kembali
                        </Button>
                    </Link>
                    </ColSec>
                    <ColSec xs={6}>
                    <Button variant="outline-primary" type="submit" className='w-100'>
                        Ubah
                    </Button>
                    </ColSec>
                </RowSec>
                </Form>
            </ColSt>
        </RowSt>
        </Container>
    )
}

export default EditDataForm