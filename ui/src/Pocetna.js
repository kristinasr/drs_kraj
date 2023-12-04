import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import PrikazProizvoda from './Kartica';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';


const Pocetna = () => {

    const [podaci, podesiPodatke] = useState([]);
    const [uloga, podesiUlogu] = useState([]);
    const [isLogged, setIsLogged] = useState(false);

    const stilKontejneraZaKartice = {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        gap: '25px',
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
        flexDirection: 'column',
    };

    const stilZaNavBar = {
        position: 'fixed',
        top: 0,
        width: '100%',
        zIndex: 1000,
    }

    const stilZaProfil = {
        position: 'fixed',
        top: 0,
        right: 0,
        marginRight: '30px',
        marginTop: '40px',
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const odgovor = await axios.get('http://localhost:5000/');
                podesiPodatke(odgovor.data);
                const email = odgovor.data.email;

                if (email === '') {
                    podesiUlogu('/');
                }
                else if (email === 'secernisanns@gmail.com') {
                    podesiUlogu('/Proizvod');
                }
                else {
                    podesiUlogu('/Profil');
                }
            } catch (error) {
                console.error('Greška:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className='pocetnaStranica' style={stilCeleStranice}>
            <div style={stilZaNavBar}>
                <ul className="nav nav-pills nav-fill">
                    <li className="nav-item">
                        <Link to="/" className="nav-link active" style={{ color: 'black', fontWeight: "bold" }}>Početna</Link>
                    </li>
                    {!isLogged ? (
                    <>
                       
                        
                        <li className="nav-item">
                            <Link to="/Profil" className="nav-link" style={{ color: 'black', fontWeight: "bold" }}>Profil</Link>
                        </li>
                    </>
                ) : (
                    <>
                     <li className="nav-item">
                            <Link to="/Pocetna" className="nav-link" style={{ color: 'black', fontWeight: "bold" }}>Pocetna</Link>
                        </li>
                        
                        <li className="nav-item">
                            <Link to="/Prijava" className="nav-link" style={{ color: 'black', fontWeight: "bold" }}>Prijava</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/Registracija" className="nav-link" style={{ color: 'black', fontWeight: "bold" }}>Registracija</Link>
                        </li>
                        
                    </>
                )}
                    <li className="nav-item">
                        <Link to="/Registracija" className="nav-link" style={{ color: 'black', fontWeight: "bold" }}>Registracija</Link>
                    </li>
                </ul>
            </div>
            {isLogged && (
                <div style={stilZaProfil}>
                    <Link to={uloga}>
                        <img src="/profil.jpg" alt="Profile" style={{ width: '50px', height: '50px', borderRadius: '50%' }} />
                    </Link>
                </div>
            )}
            <div className="kontejner" style={stilKontejneraZaKartice}>
                {podaci.map((proizvod, index) => (
                    <PrikazProizvoda key={index} proizvod={proizvod} />
                ))}
            </div>
        </div>
    );
}

export default Pocetna;