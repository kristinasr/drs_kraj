import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import VerifikacijaKartice from './VerifikacijaKartice';

const Verifikacija = () => {

    const [podaci, setPodatke] = useState([]);

    const stilKontejneraZaKartice = {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        gap: '50px',
        marginTop: '100px'
    };

    const stilCeleStranice = {
        backgroundImage: `url('Pozadine/verifikacija.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center'
    };

    const stilZaNavBar = {
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
        <div style={stilCeleStranice}>
            <div style={stilZaNavBar}>
                <ul className="nav nav-pills nav-fill">
                    <li className="nav-item">
                        <Link to="/" className="nav-link" style={{ color: 'yellow', fontWeight: "bold" }}>Početna</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/Proizvod" className="nav-link" style={{ color: 'yellow', fontWeight: "bold" }}>Dodavanje proizvoda</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/Kolicina" className="nav-link" style={{ color: 'yellow', fontWeight: "bold" }}>Povećanje količine proizvoda</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/UzivoKupovina" className="nav-link" style={{ color: 'yellow', fontWeight: "bold" }}>Uživo praćenje kupovina</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/Verifikacija" className="nav-link active" style={{ color: 'yellow', fontWeight: "bold" }}>Verifikacija naloga</Link>
                    </li>
                </ul>
            </div>
            <div className="kontejner" style={stilKontejneraZaKartice}>
                {podaci.map((kartice, index) => (
                    <VerifikacijaKartice key={index} kartica={kartice} />
                ))}
            </div>
        </div>
    );
};

export default Verifikacija;