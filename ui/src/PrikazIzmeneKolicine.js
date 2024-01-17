import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import IzmenaKolicine from './IzmenaKolicine'

const PrikazIzmeneKolicine = () => {

    const [podaci, setPodatke] = useState([]);

    const stilProstoraKartica = {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        gap: '25px'
    };

    const stilStranice = {
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

    const stilNavBara = {
        position: 'fixed',
        top: 0,
        left: 0,
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
        <div className='pocetnaStranica' style={stilStranice}>
            <div style={stilNavBara}>
                <ul className="nav nav-tabs nav-justified">
                    <li className="nav-item">
                        <Link to="/" className="nav-link" style={{ borderRadius:'5px',color: 'white', fontWeight: "bold", backgroundColor: '#3d2b1f', fontFamily: 'Calibri' }}>Početna</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/Proizvod" className="nav-link" style={{ borderRadius:'5px', color: 'white', fontWeight: "bold", backgroundColor: '#3d2b1f', fontFamily: 'Calibri' }}>Dodavanje proizvoda</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/Kolicina" className="nav-link active" style={{ borderRadius:'5px', color: 'white', fontWeight: "bold", backgroundColor: '#3d2b1f', fontFamily: 'Calibri' }}>Izmena količine proizvoda</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/UzivoKupovina" className="nav-link" style={{ borderRadius:'5px', color: 'white', fontWeight: "bold", backgroundColor: '#3d2b1f', fontFamily: 'Calibri' }}>Praćenje kupovina</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/Verifikacija" className="nav-link" style={{ borderRadius:'5px', color: 'white', fontWeight: "bold", backgroundColor: '#3d2b1f', fontFamily: 'Calibri' }}>Verifikacija</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/AdminRacun" className="nav-link" style={{ borderRadius:'5px', color: 'white', fontWeight: "bold", backgroundColor: '#3d2b1f', fontFamily: 'Calibri' }}>Admin Racun</Link>
                    </li>
                </ul>
            </div>
            <div className="prostorKartica" style={stilProstoraKartica}>
                {podaci.map((proizvod, index) => (
                    <IzmenaKolicine key={index} proizvod={proizvod} />
                ))}
            </div>
        </div>
    );
}

export default PrikazIzmeneKolicine;