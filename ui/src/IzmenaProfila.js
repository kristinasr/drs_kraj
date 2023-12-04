import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

const IzmenaProfila = () => {

    const [ime, podesiIme] = useState('');
    const [prezime, podesiPrezime] = useState('');
    const [adresa, podesiAdresu] = useState('');
    const [grad, podesiGrad] = useState('');
    const [drzava, podesiDrzavu] = useState('');
    const [brojTelefona, podesiBrojTelefona] = useState('');
    const [email, podesiEmail] = useState('');
    const [lozinka, podesiLozinku] = useState('');
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/Profil');
                setData(response.data);
            } catch (error) {
                console.error('Greška: ', error);
            }
        };

        fetchData();
    }, []);

    const stilKontejnera = {
        textAlign: 'center',
        backgroundColor: 'white',
        width: '320px',
        height: '400px'
    };

    const stilForme = {
        display: 'inline-block',
        textAlign: 'left',
    };

    const stilZaLabelu = {
        fontFamily: 'Times New Roman',
        fontWeight: 'bold',
        marginTop: 0,
    };

    const stilZaUnos = {
        fontFamily: 'Times New Roman',
        color: 'blue',
    };

    const stilZaDugme = {
        fontFamily: 'Times New Roman',
        fontWeight: 'bold',
    };

    const stilNaslova = {
        fontFamily: 'Times New Roman',
        fontWeight: 'bold',
        marginTop: 0,
        textAlign: 'center',
    };

    const stilCeleStranice = {
        textAlign: 'center',
        backgroundImage: `url('Pozadine/profil.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    };

    const sacuvajIzmene = () => {
        if (ime.length === 0 || /\d/.test(ime) || !/^[a-zA-Z\s]*$/.test(ime)) {
            alert("Polje mora biti popunjeno!")
        }
        else if (prezime.length === 0 || /\d/.test(prezime) || !/^[a-zA-Z\s]*$/.test(prezime)) {
            alert("Polje mora biti popunjeno!")
        }
        else if (adresa.length === 0 || !/^[a-zA-Z0-9\s]+$/.test(adresa)) {
            alert("Polje mora biti popunjeno!")
        }
        else if (grad.length === 0 || /\d/.test(grad) || !/^[a-zA-Z\s]*$/.test(grad)) {
            alert("Polje mora biti popunjeno!")
        }
        else if (drzava.length === 0 || /\d/.test(drzava) || !/^[a-zA-Z\s]*$/.test(drzava)) {
            alert("Polje mora biti popunjeno!")
        }
        else if (brojTelefona.length === 0 || /^[a-zA-Z]*$/.test(brojTelefona)) {
            alert("Polje mora biti popunjeno!")
        }
        else if (email.length === 0 || !/^[a-zA-Z0-9@.]*$/.test(email)) {
            alert("Polje mora biti popunjeno!")
        }
        else if (lozinka.length === 0 || lozinka.length < 6) {
            alert("Polje mora biti popunjeno!")
        }
        else {
            axios.post('http://127.0.0.1:3000/Profil', {
                ime: ime,
                prezime: prezime,
                adresa: adresa,
                grad: grad,
                drzava: drzava,
                brojTelefona: brojTelefona,
                email: email,
                lozinka: lozinka
            })
            alert("Izmena profila je uspešna!")
        }
    }

    useEffect(() => {
        podesiIme(data.ime || '');
        podesiPrezime(data.prezime || '');
        podesiAdresu(data.adresa || '');
        podesiGrad(data.grad || '');
        podesiDrzavu(data.drzava || '');
        podesiBrojTelefona(data.brojTelefona || '');
        podesiEmail(data.email || '');
        podesiLozinku(data.lozinka || '');
    }, [data]);

    return (
        <div style={stilCeleStranice}>
            <div style={stilZaNavBar}>
                <ul className="nav nav-pills nav-fill">
                    <li className="nav-item">
                        <Link to="/" className="nav-link" style={{ color: 'yellow', fontWeight: "bold" }}>Početna</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/Profil" className="nav-link active" style={{ color: 'yellow', fontWeight: "bold" }}>Profil</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="" className="nav-link" style={{ color: 'yellow', fontWeight: "bold" }}>Pregled računa</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="" className="nav-link" style={{ color: 'yellow', fontWeight: "bold" }}>Uplata i konverzija valuta</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="" className="nav-link" style={{ color: 'yellow', fontWeight: "bold" }}>Istorijat kupovina</Link>
                    </li>
                </ul>
            </div>
            <div className="kontejner" style={stilKontejnera}>
                <div className="forma" style={stilForme}>
                    <h1 style={stilNaslova}>Pregled profila</h1>
                    <table style={{ margin: 'auto', borderSpacing: '0 5px', borderCollapse: 'separate' }}>
                        <tr>
                            <td style={stilZaLabelu}>Ime:</td>
                            <td><input style={stilZaUnos} value={ime} onChange={(e) => podesiIme(e.target.value)} type="text" id="ime" className="ime" maxLength="25" /></td>
                        </tr>
                        <tr>
                            <td style={stilZaLabelu}>Prezime:</td>
                            <td><input style={stilZaUnos} value={prezime} onChange={(e) => podesiPrezime(e.target.value)} type="text" id="prezime" className="prezime" maxLength="25" /></td>
                        </tr>
                        <tr>
                            <td style={stilZaLabelu}>Adresa:</td>
                            <td><input style={stilZaUnos} value={adresa} onChange={(e) => podesiAdresu(e.target.value)} type="text" id="adresa" className="adresa" maxLength="25" /></td>
                        </tr>
                        <tr>
                            <td style={stilZaLabelu}>Grad:</td>
                            <td><input style={stilZaUnos} value={grad} onChange={(e) => podesiGrad(e.target.value)} type="text" id="grad" className="grad" maxLength="25" /></td>
                        </tr>
                        <tr>
                            <td style={stilZaLabelu}>Država:</td>
                            <td><input style={stilZaUnos} value={drzava} onChange={(e) => podesiDrzavu(e.target.value)} type="text" id="drzava" className="drzava" maxLength="25" /></td>
                        </tr>
                        <tr>
                            <td style={stilZaLabelu}>Broj telefona:</td>
                            <td><input style={stilZaUnos} value={brTel} onChange={(e) => podesiBrTel(e.target.value)} type="text" id="brtelefona" className="brtelefona" maxLength="25" /></td>
                        </tr>
                        <tr>
                            <td style={stilZaLabelu}>Email:</td>
                            <td><input style={stilZaUnos} value={email} onChange={(e) => podesiEmail(e.target.value)} type="email" id="email" className="email" maxLength="30" /></td>
                        </tr>
                        <tr>
                            <td style={stilZaLabelu}>Lozinka:</td>
                            <td><input style={stilZaUnos} value={lozinka} onChange={(e) => podesiLozinku(e.target.value)} type="password" id="lozinka" className="lozinka" maxLength="18" /></td>
                        </tr>
                        <tr>
                            <td colSpan="2" align="right" style={{ padding: '0 40px 0 0' }}>
                                <input
                                    className="btn btn-outline-primary"
                                    id="registracijaDugme"
                                    style={stilZaDugme}
                                    type="submit"
                                    value="Sačuvaj izmene"
                                    onClick={sacuvajIzmene}
                                />
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default IzmenaProfila;