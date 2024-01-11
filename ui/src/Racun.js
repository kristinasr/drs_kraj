import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const PrikaziRacun = () => {

    const [brojKartice, setbrojKartice] = useState('');
    const [datumIsteka, setdatumIsteka] = useState('');
    const [stanje, setstanje] = useState('');
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
                const response = await axios.get('http://localhost:5000/Racun');
                setPodatke(response.data);
            } catch (error) {
                console.error('Greška: ', error);
            }
        };

        prihvatiPodatke();
    }, []);

    useEffect(() => {
        setbrojKartice(podaci.brojKartice || '');
        setdatumIsteka(podaci.datumIsteka || '');
        setstanje(podaci.stanje || '');
        setValutu(podaci.valuta || '');
    }, [podaci]);

    return (
        <div style={stilStranice}>
            <div style={stilNavBara}>
                <ul className="nav nav-tabs nav-fill">
                    <li className="nav-item">
                        <Link to="/" className="nav-link" style={{ borderRadius:'5px', width:'100%' ,color: 'white', fontWeight: "bold", backgroundColor: '#3d2b1f', fontFamily: 'Calibri' }}>Početna</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/Profil" className="nav-link" style={{ borderRadius:'5px', width:'100%' ,color: 'white', fontWeight: "bold", backgroundColor: '#3d2b1f', fontFamily: 'Calibri' }}>Profil</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/KarticaKorisnika" className="nav-link" style={{ borderRadius:'5px', width:'100%' ,color: 'white', fontWeight: "bold", backgroundColor: '#3d2b1f', fontFamily: 'Calibri' }}>Kartica</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/Racun" className="nav-link active" style={{ borderRadius:'5px', width:'100%' ,color: 'white', fontWeight: "bold", backgroundColor: '#3d2b1f', fontFamily: 'Calibri' }}>Pregled računa</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/IstorijaProizvoda" className="nav-link" style={{ borderRadius:'5px', width:'100%' ,color: 'white', fontWeight: "bold", backgroundColor: '#3d2b1f', fontFamily: 'Calibri' }}>Istorija kupovina</Link>
                    </li>
                </ul>
            </div>
            <div style={stilProstora}>
                <h2 style={stilNaslova}>Stanje računa</h2>
                <form style={stilForme}>
                    <label style={stilLabele} htmlFor="brojKartice">
                        Broj kartice:
                    </label>
                    <input
                        style={stilUnosa}
                        type="text"
                        id="brojKartice"
                        maxLength={16}
                        value={brojKartice}
                    />
                    <label style={stilLabele}>
                        Datum isteka:
                    </label>
                    <input
                        style={stilUnosa}
                        type="text"
                        id="datumIsteka"
                        maxLength={5}
                        value={datumIsteka}
                    />
                    <label style={stilLabele}>
                        Stanje:
                    </label>
                    <input
                        style={stilUnosa}
                        type="text"
                        id="stanje"
                        value={stanje}
                    />
                    <label style={stilLabele}>
                        Valuta:
                    </label>
                    <input
                        style={stilUnosa}
                        type="text"
                        id="valuta"
                        maxLength={3}
                        value={valuta}
                    />
                </form>
            </div>
        </div>
    );
};

export default PrikaziRacun;
