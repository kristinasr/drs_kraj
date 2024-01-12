import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import PrikazIzmeneKolicine from './PrikazIzmeneKolicine'

const IzmenaKolicine = () => {

    const [podaci, setPodatke] = useState([]);

    const stilKontejneraZaKartice = {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        gap: '25px'
    };

    const stilCeleStranice = {
        textAlign: 'center',
        backgroundSize: 'cover',
        backgroundImage: `url('Pozadine/pozadinaPocetna.jpg')`,
        backgroundPosition: 'center',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingLeft: '15px',
        paddingTop: '55px',
        overflowY: 'auto',
        minHeight: '100vh',
        flexDirection: 'column'
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
                const response = await axios.get('http://localhost:5000/Kolicina');
                setPodatke(response.data);
            } catch (error) {
                console.error('Greška:', error);
            }
        };

        prihvatiPodatke();
    }, []);

    return (
        <div className='pocetnaStranica' style={stilCeleStranice}>
            <div style={stilZaNavBar}>
                <ul className="nav nav-pills nav-fill">
                    <li className="nav-item">
                        <Link to="/" className="nav-link" style={{ color: 'black', fontWeight: "bold" }}>Početna</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/Proizvod" className="nav-link" style={{ color: 'black', fontWeight: "bold" }}>Dodavanje proizvoda</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/Kolicina" className="nav-link active" style={{ color: 'black', fontWeight: "bold" }}>Povećanje količine proizvoda</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/UzivoKupovina" className="nav-link" style={{ color: 'black', fontWeight: "bold" }}>Uživo praćenje kupovina</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/Verifikacija" className="nav-link" style={{ color: 'black', fontWeight: "bold" }}>Verifikacija naloga</Link>
                    </li>
                </ul>
            </div>
            <div className="kontejner" style={stilKontejneraZaKartice}>
                {podaci.map((proizvod, index) => (
                    <PrikazIzmeneKolicine key={index} proizvod={proizvod} />
                ))}
            </div>
        </div>
    );
}

export default IzmenaKolicine;