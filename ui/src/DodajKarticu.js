import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const DodavanjeKartice = () => {
    const [brojKartice, setbrojKartice] = useState('');
    const [datumIsteka, setdatumIsteka] = useState('');
    const [cvv, setCVV] = useState('');

    const stilProstora = {
        textAlign: 'center',
        backgroundColor: '#836953',
        width: '350px',
        padding: '20px',
        borderRadius: '8px',
        border:'1px inset #3d2b1f',
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
        boxSizing: 'border-box',
        border: '1px solid white',
        borderRadius: '4px',
    };

    const stilDugmeta = {
        fontFamily: 'Calibri',
        fontWeight: 'bold',
        width: '200px',
        height: '40px',
        marginLeft: '50px',
        color:'white',
        backgroundColor:'#3d2b1f',
        border: '0.5px inset #3d2b1f',
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
        alignItems: 'center',
        justifyContent: 'center',
    };

    const stilNavBara = {
        position: 'fixed',
        top: 0,
        width: '100%',
        zIndex: 1000,
    }

    const dodavanjeKarticu = () => {
        if (!brojKartice || !datumIsteka || !cvv) {
            alert('Sva polja moraju biti popunjena!');
        } else if (!/^[0-9]{16}$/.test(brojKartice)) {
            alert('Polje mora sadrzati 16 brojeva!');
        } else if (!/^(0[1-9]|1[0-2])\/[0-9]{2}$/.test(datumIsteka)) {
            alert('Polje mora biti popunjeno u formatu MM/YY!');
        } else if (!/^[0-9]{3}$/.test(cvv)) {
            alert('Polje mora sadrzati 3 broja!');
        } else {
            axios.post('http://127.0.0.1:5000/KarticaKorisnika', {
                    brojKartice: brojKartice,
                    datumIsteka: datumIsteka,
                    cvv: cvv,
                })
            alert('Uspešno dodavanje kartice. Čekanje na verifikaciju...');
        }
    };

    return (
        <div style={stilStranice}>
            <div style={stilNavBara}>
                <ul className="nav nav-tabs nav-justified">
                    <li className="nav-item">
                        <Link to="/" className="nav-link" style={{ borderRadius:'5px', width:'100%' ,color: 'white', fontWeight: "bold", backgroundColor: '#3d2b1f', fontFamily: 'Calibri' }}>Početna</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/Profil" className="nav-link" style={{ borderRadius:'5px', width:'100%' ,color: 'white', fontWeight: "bold", backgroundColor: '#3d2b1f', fontFamily: 'Calibri' }}>Profil</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/KarticaKorisnika" className="nav-link active" style={{ borderRadius:'5px', width:'100%' ,color: 'white', fontWeight: "bold", backgroundColor: '#3d2b1f', fontFamily: 'Calibri' }}>Dodaj karticu</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/Racun" className="nav-link" style={{ borderRadius:'5px', width:'100%' ,color: 'white', fontWeight: "bold", backgroundColor: '#3d2b1f', fontFamily: 'Calibri' }}>Pregled računa</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/Konverzija" className="nav-link" style={{ borderRadius:'5px', width:'100%' ,color: 'white', fontWeight: "bold", backgroundColor: '#3d2b1f', fontFamily: 'Calibri' }}>Uplata i konverzija</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/IstorijaProizvoda" className="nav-link" style={{ borderRadius:'5px', width:'100%' ,color: 'white', fontWeight: "bold", backgroundColor: '#3d2b1f', fontFamily: 'Calibri' }}>Istorija kupovina</Link>
                    </li>
                </ul>
            </div>
            <div style={stilProstora}>
                <h2 style={stilNaslova}>Dodajte Vašu karticu</h2>
                <form style={stilForme}>
                    <label style={stilLabele} htmlFor="brojKartice">
                        Broj kartice:
                    </label>
                    <input
                        style={stilUnosa}
                        type="text"
                        id="brojKartice"
                        value={brojKartice}
                        onChange={(e) => setbrojKartice(e.target.value)}
                    />
                    <label style={stilLabele} htmlFor="datumIsteka">
                        Datum isteka:
                    </label>
                    <input
                        style={stilUnosa}
                        type="text"
                        id="datumIsteka"
                        value={datumIsteka}
                        onChange={(e) => setdatumIsteka(e.target.value)}
                    />
                    <label style={stilLabele} htmlFor="cvv">
                        CVV:
                    </label>
                    <input
                        style={stilUnosa}
                        type="text"
                        id="cvv"
                        maxLength={3}
                        value={cvv}
                        onChange={(e) => setCVV(e.target.value)}
                    />
                    <input
                        className="btn btn-outline-success"
                        id="prijavaDugme"
                        style={stilDugmeta}
                        type="submit"
                        value="Dodaj"
                        onClick={dodavanjeKarticu}
                    />
                </form>
            </div>
        </div>
    );
};

export default DodavanjeKartice;
