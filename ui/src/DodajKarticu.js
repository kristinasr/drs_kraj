import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const DodavanjeKartice = () => {
    const [cardNum, postaviCardNum] = useState('');
    const [dateExp, postaviDateExp] = useState('');
    const [cvv, postaviCVV] = useState('');
    const redirekcija = useNavigate();

    const stilKontejnera = {
        textAlign: 'center',
        backgroundColor: 'white',
        width: '350px',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    };

    const stilForme = {
        textAlign: 'left',
    };

    const stilZaLabelu = {
        fontFamily: 'Times New Roman',
        fontWeight: 'bold',
        marginTop: '10px',
        display: 'block',
    };

    const stilZaUnos = {
        fontFamily: 'Times New Roman',
        color: 'blue',
        width: '100%',
        padding: '10px',
        marginBottom: '15px',
        boxSizing: 'border-box',
        border: '1px solid #ccc',
        borderRadius: '4px',
    };

    const stilZaDugme = {
        fontFamily: 'Times New Roman',
        fontWeight: 'bold',
        width: '200px',
        height: '50px',
        marginLeft: '50px',
    };

    const stilNaslova = {
        fontFamily: 'Times New Roman',
        fontWeight: 'bold',
        marginTop: '0',
        marginBottom: '20px',
        color: '#007BFF',
    };

    const stilCeleStranice = {
        textAlign: 'center',
        backgroundImage: `url('Pozadine/pozadinaPocetna.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
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

    const dodajKarticu = () => {
        if (!cardNum || !dateExp || !cvv) {
            alert('Sva polja moraju biti popunjena!');
        } else if (!/^[0-9]{16}$/.test(cardNum)) {
            alert('Polje mora sadrzati 16 brojeva!');
        } else if (!/^(0[1-9]|1[0-2])\/[0-9]{2}$/.test(dateExp)) {
            alert('Polje mora biti popunjeno u fomratu MM/YY!');
        } else if (!/^[0-9]{3}$/.test(cvv)) {
            alert('Polje mora sadrzati 3 broja!');
        } else {
            axios
                .post('http://127.0.0.1:5000/KarticaKorisnika', {
                    cardNum: cardNum,
                    dateExp: dateExp,
                    cvv: cvv,
                })
            alert('Uspesno dodavanje kartice. Cekanje na verifikaciju...');
            redirekcija('/');
        }
    };

    return (
        <div style={stilCeleStranice}>
            <div style={stilZaNavBar}>
                <ul className="nav nav-pills nav-fill">
                    <li className="nav-item">
                        <Link to="/" className="nav-link" style={{ color: 'yellow', fontWeight: "bold" }}>Početna</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/Profil" className="nav-link" style={{ color: 'yellow', fontWeight: "bold" }}>Profil</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/KarticaKorisnika" className="nav-link active" style={{ color: 'yellow', fontWeight: "bold" }}>Dodavanje kartice</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="" className="nav-link" style={{ color: 'yellow', fontWeight: "bold" }}>Pregled računa</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="" className="nav-link" style={{ color: 'yellow', fontWeight: "bold" }}>Uplata i konverzija valuta</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/IstorijaProizvoda" className="nav-link" style={{ color: 'yellow', fontWeight: "bold" }}>Istorijat kupovina</Link>
                    </li>
                </ul>
            </div>
            <div style={stilKontejnera}>
                <h2 style={stilNaslova}>Dodajte Vasu karticu</h2>
                <form style={stilForme}>
                    <label style={stilZaLabelu} htmlFor="cardNum">
                        Broj kartice:
                    </label>
                    <input
                        style={stilZaUnos}
                        type="text"
                        id="cardNum"
                        value={cardNum}
                        onChange={(e) => postaviCardNum(e.target.value)}
                    />

                    <label style={stilZaLabelu} htmlFor="dateExp">
                        Datum isteka:
                    </label>
                    <input
                        style={stilZaUnos}
                        type="text"
                        id="dateExp"
                        value={dateExp}
                        onChange={(e) => postaviDateExp(e.target.value)}
                    />

                    <label style={stilZaLabelu} htmlFor="cvv">
                        CVV:
                    </label>
                    <input
                        style={stilZaUnos}
                        type="text"
                        id="cvv"
                        maxLength={3}
                        value={cvv}
                        onChange={(e) => postaviCVV(e.target.value)}
                    />

                    <input
                        className="btn btn-outline-primary"
                        id="prijavaDugme"
                        style={stilZaDugme}
                        type="submit"
                        value="Dodaj karticu"
                        onClick={dodajKarticu}
                    />
                </form>
            </div>
        </div>
    );
};

export default DodavanjeKartice;
