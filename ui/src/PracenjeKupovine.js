import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

const UzivoPracenjeKupovina = () => {

    const [podaci, podesiPodatke] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const odgovor = await axios.get('http://localhost:5000/UzivoKupovina');
                podesiPodatke(odgovor.data);
            } catch (error) {
                console.error('Greška: ', error);
            }
        };

        fetchData();
    }, []);

    const stilKontejnera = {
        textAlign: 'center',
        backgroundColor: 'white',
        borderRadius: '5px'
    };

    const stilForme = {
        display: 'inline-block',
        textAlign: 'left',
    };

    const stilNaslova = {
        fontFamily: 'Calibri',
        fontWeight: 'bold',
        marginTop: 10,
        textAlign: 'center',
        color:'#3d2b1f',
    };

    const stilTabele = {
        width: '100%',
        borderCollapse: 'collapse',
        marginTop: '20px',
        borderRadius: '8px',
        overflow: 'hidden',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        border: '1px solid #ddd',
    };

    const stilZaglavlja = {
        border: '3px solid #ddd',
        textAlign: 'center',
        padding: '20px',
        backgroundColor: '#3d2b1f',
        color: 'white',
        fontFamily: 'Calibri',
    };

    const stilRedaUTabeli = {
        border: '3px solid #ddd',
        textAlign: 'center',
        padding: '12px',
        backgroundColor: 'white',
        fontWeight: 'bold',
        fontFamily: 'Calibri',
    };

    const stilCeleStranice = {
        textAlign: 'center',
        backgroundImage: `url('Pozadine/pozadinaPocetna.jpg')`,
        backgroundSize: 'cover',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    };

    const stilZaNavBar = {
        position: 'fixed',
        top: 0,
        width: '100%',
        zIndex: 1000,
    }
    
    const stilSlike = {
        width: '80px',
        height: 'auto%',
    }

    return (
        <div style={stilCeleStranice} >
            <div style={stilZaNavBar}>
                <ul className="nav nav-pills nav-fill">
                    <li className="nav-item">
                        <Link to="/" className="nav-link" style={{ color: 'white', fontWeight: "bold", backgroundColor: '#3d2b1f', fontFamily: 'Calibri' }}>Početna</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/Proizvod" className="nav-link" style={{ color: 'white', fontWeight: "bold", backgroundColor: '#3d2b1f', fontFamily: 'Calibri' }}>Dodavanje proizvoda</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="" className="nav-link" style={{ color: 'white', fontWeight: "bold", backgroundColor: '#3d2b1f', fontFamily: 'Calibri' }}>Povećanje količine proizvoda</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/UzivoKupovina" className="nav-link active" style={{ color: 'white', fontWeight: "#3d2b1f", backgroundColor: 'black', fontFamily: 'Calibri' }}>Uživo praćenje kupovina</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="" className="nav-link" style={{ color: 'white', fontWeight: "bold", backgroundColor: '#3d2b1f', fontFamily: 'Calibri' }}>Verifikacija naloga</Link>
                    </li>
                </ul>
            </div>
            <div className='uzivoPracenjeKupovina'>
                <div className="kontejner" style={stilKontejnera}>
                    <div className="forma" style={stilForme}>
                        <h1 style={stilNaslova}>Praćenje kupovina uživo</h1>
                        <table style={stilTabele}>
                            <thead>
                                <tr>
                                    <th style={stilZaglavlja}>Slika proizvoda</th>
                                    <th style={stilZaglavlja}>Naziv proizvoda</th>
                                    <th style={stilZaglavlja}>Cena</th>
                                    <th style={stilZaglavlja}>Valuta</th>
                                    <th style={stilZaglavlja}>Kupac (email)</th>
                                    <th style={stilZaglavlja}>Vreme kupovine</th>
                                </tr>
                            </thead>
                            <tbody>
                                {podaci.map((item, index) => (
                                    <tr key={index}>
                                        <td style={stilRedaUTabeli}>
                                            <img style={stilSlike} src={item.slika} alt="" />
                                        </td>
                                        <td style={stilRedaUTabeli}>{item.nazivProizvoda}</td>
                                        <td style={stilRedaUTabeli}>{item.cena}</td>
                                        <td style={stilRedaUTabeli}>{item.valuta}</td>
                                        <td style={stilRedaUTabeli}>{item.kupac}</td>
                                        <td style={stilRedaUTabeli}>{item.vreme}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UzivoPracenjeKupovina;