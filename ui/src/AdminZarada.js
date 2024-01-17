import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const AdminJeZaradio = () => {

    const [brojKartice, setBrojKartice] = useState('');
    const [datumIsteka, setDatumIsteka] = useState('');
    const [stanje, setStanje] = useState('');
    const [valuta, setValutu] = useState('');
    const [podaci, setPodatke] = useState([]);

    const stilProstora = {
        textAlign: 'center',
        backgroundColor: '#836953',
        width: '350px',
        padding: '15px',
        borderRadius: '5px',
        border:'1px inset #3d2b1f'
    };

    const stilForme = {
        textAlign: 'left',
    };

    const stilLabele = {
        fontFamily: 'Calibri',
        fontWeight: 'bold',
        marginTop: '10px',
        display: 'block',
        color:'white',
    };

    const stilUnosa = {
        fontFamily: 'Calibri',
        color: 'black',
        width: '100%',
        padding: '10px',
        marginBottom: '15px',
        border: '1px solid #3d2b1f',
        borderRadius: '3px',
    };

    const stilNaslova = {
        fontFamily: 'Calibri',
        fontWeight: 'bold',
        marginTop: '0',
        marginBottom: '20px',
        color: 'white',
    };

    const stilStranice = {
        textAlign: 'center',
        backgroundImage: `url('Pozadine/pozadinaPocetna.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    };

    const stilNavBara = {
        position: 'fixed',
        top: 0,
        width: '100%',
    }

    useEffect(() => {
        const prihvatiPodatke = async () => {
            try {
                const response = await axios.get('http://localhost:5000/AdminRacun');
                setPodatke(response.data);
            } catch (error) {
                console.error('Greška: ', error);
            }
        };

        prihvatiPodatke();
    }, []);

    useEffect(() => {
        setBrojKartice(podaci.brojKartice || '');
        setDatumIsteka(podaci.datumIsteka || '');
        setStanje(podaci.stanje);
        setValutu(podaci.valuta || '');
    }, [podaci]);

    return (
        <div style={stilStranice}>
            <div style={stilNavBara}>
            <ul className="nav nav-tabs nav-justified">
                    <li className="nav-item">
                        <Link to="/" className="nav-link" style={{ borderRadius:'5px',color: 'white', fontWeight: "bold", backgroundColor: '#3d2b1f', fontFamily: 'Calibri' }}>Početna</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/Proizvod" className="nav-link" style={{ borderRadius:'5px', color: 'white', fontWeight: "bold", backgroundColor: '#3d2b1f', fontFamily: 'Calibri' }}>Dodavanje proizvoda</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/Kolicina" className="nav-link" style={{ borderRadius:'5px', color: 'white', fontWeight: "bold", backgroundColor: '#3d2b1f', fontFamily: 'Calibri' }}>Izmena količine proizvoda</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/UzivoKupovina" className="nav-link" style={{ borderRadius:'5px', color: 'white', fontWeight: "bold", backgroundColor: '#3d2b1f', fontFamily: 'Calibri' }}>Praćenje kupovina</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/Verifikacija" className="nav-link" style={{ borderRadius:'5px', color: 'white', fontWeight: "bold", backgroundColor: '#3d2b1f', fontFamily: 'Calibri' }}>Verifikacija</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/AdminRacun" className="nav-link active" style={{ borderRadius:'5px', color: 'white', fontWeight: "bold", backgroundColor: '#3d2b1f', fontFamily: 'Calibri' }}>Admin Racun</Link>
                    </li>
                </ul>
            </div>
            <div style={stilProstora}>
                <h2 style={stilNaslova}>Račun</h2>
                <form style={stilForme}>
                    <label style={stilLabele} htmlFor="brojKartice">
                        Broj kartice:
                    </label>
                    <input
                        style={stilUnosa}
                        type="text"
                        id="brojKartice"
                        maxLength={16}
                        readOnly={true}
                        value={brojKartice}
                    />
                    <label style={stilLabele} htmlFor="datumIsteka">
                        Datum isteka:
                    </label>
                    <input
                        style={stilUnosa}
                        type="text"
                        id="datumIsteka"
                        maxLength={5}
                        readOnly={true}
                        value={datumIsteka}
                    />
                    <label style={stilLabele} htmlFor="stanje">
                        Stanje:
                    </label>
                    <input
                        style={stilUnosa}
                        type="text"
                        id="stanje"
                        value={stanje}
                        readOnly={true}
                    />
                    <label style={stilLabele} htmlFor="valuta">
                        Valuta:
                    </label>
                    <input
                        style={stilUnosa}
                        type="text"
                        id="valuta"
                        maxLength={3}
                        value={valuta}
                        readOnly={true}
                    />
                </form>
            </div>
        </div>
    );
};

export default AdminJeZaradio;