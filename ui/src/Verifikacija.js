import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import VerifikacijaKartice from './VerifikacijaKartice';

const Verifikacija = () => {

    const [podaci, setPodatke] = useState([]);

    const stilProstora = {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        gap: '50px',
        marginTop: '100px'
    };

    const stilStranice = {
        backgroundImage: `url('Pozadine/pozadinaPocetna.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center'
    };

    const stilNavBara = {
        position: 'fixed',
        top: 0,
        width: '100%',
        zIndex: 1000
    }

    
    useEffect(() => {
        const prihvatiPodatke = async () => {
            try {
                const response = await axios.get('http://localhost:5000/Verifikacija');
                setPodatke(response.data.kartice);
            } catch (error) {
                console.error('Greška:', error);
            }
        };

        prihvatiPodatke();
    }, []);

    return (
        <div style={stilStranice}>
            <div style={stilNavBara}>
                <ul className="nav nav-tabs nav-justified">
                    <li className="nav-item">
                        <Link to="/" className="nav-link" style={{ borderRadius:'5px', width:'100%' ,color: 'white', fontWeight: "bold", backgroundColor: '#3d2b1f', fontFamily: 'Calibri' }}>Početna</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/Proizvod" className="nav-link" style={{ borderRadius:'5px', width:'100%' ,color: 'white', fontWeight: "bold", backgroundColor: '#3d2b1f', fontFamily: 'Calibri' }}>Dodavanje proizvoda</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/Kolicina" className="nav-link" style={{ borderRadius:'5px', width:'100%' ,color: 'white', fontWeight: "bold", backgroundColor: '#3d2b1f', fontFamily: 'Calibri' }}>Izmena količine proizvoda</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/UzivoKupovina" className="nav-link" style={{ borderRadius:'5px', width:'100%' ,color: 'white', fontWeight: "bold", backgroundColor: '#3d2b1f', fontFamily: 'Calibri' }}>Praćenje kupovina</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/Verifikacija" className="nav-link active" style={{ borderRadius:'5px', width:'100%' ,color: 'white', fontWeight: "bold", backgroundColor: '#3d2b1f', fontFamily: 'Calibri' }}>Verifikacija</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/AdminRacun" className="nav-link" style={{ borderRadius:'5px', width:'100%' ,color: 'white', fontWeight: "bold", backgroundColor: '#3d2b1f', fontFamily: 'Calibri' }}>Admin Racun</Link>
                    </li>
                </ul>
            </div>
            <div className="prostor" style={stilProstora}>
                {podaci.map((kartice, index) => (
                    <VerifikacijaKartice key={index} kartica={kartice} />
                ))}
            </div>
        </div>
    );
};

export default Verifikacija;