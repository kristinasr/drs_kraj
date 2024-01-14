import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Registracija = () => {

    const [ime, setIme] = useState('');
    const [prezime, setPrezime] = useState('');
    const [adresa, setAdresu] = useState('');
    const [grad, setGrad] = useState('');
    const [drzava, setDrzavu] = useState('');
    const [brojTelefona, setBrojTelefona] = useState('');
    const [email, setEmail] = useState('');
    const [lozinka, setLozinku] = useState('');
    const redirekcija = useNavigate();

    const stilProstora = {
        textAlign: 'center',
        backgroundColor: '#836953',
        width: '400px',
        height: '450px',
        border: '1px inset #3d2b1f',
        borderRadius:'5px',
    };

    const stilForme = {
        display: 'inline-block',
        textAlign: 'left',
        margin: 20,
    };

    const stilLabele = {
        fontFamily: 'Calibri',
        fontWeight: 'bold',
        marginTop: 2,
        color:'white',
        display: 'block',
    };

    const stilUnosa = {
        fontFamily: 'Calibri',
        color: 'black',
        width: '100%',
        boxSizing: 'border-box',
        border: '1px solid white',
        borderRadius: '3px',
        padding: '2px',
    };

    const stilDugmeta = {
        fontFamily: 'Calibri',
        fontWeight: 'bold',
        backgroundColor: "#3d2b1f",
        color: 'white',
        border: '0.5px solid #3d2b1f',
        margin: 10,
    };

    const stilNaslova = {
        fontFamily: 'Calibri',
        fontWeight: 'bold',
        textAlign: 'center',
        color:'white',
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
    }

    const registracija = () => {
        if (ime.length === 0 || /\d/.test(ime) || !/^[a-zA-Z\s]*$/.test(ime)) {
            alert("Polje za ime mora biti popunjeno!")
        }
        else if (prezime.length === 0 || /\d/.test(prezime) || !/^[a-zA-Z\s]*$/.test(prezime)) {
            alert("Polje za prezime mora biti popunjeno!")
        }
        else if (adresa.length === 0 || !/^[a-zA-Z0-9\s]+$/.test(adresa)) {
            alert("Polje za adresu mora biti popunjeno!")
        }
        else if (grad.length === 0|| /\d/.test(grad) || !/^[a-zA-Z\s]*$/.test(grad)) {
            alert("Polje za grad mora biti popunjeno!")
        }
        else if (drzava.length === 0 || /\d/.test(drzava) || !/^[a-zA-Z\s]*$/.test(drzava)) {
            alert("Polje za drzavu mora biti popunjeno!")
        }
        else if (brojTelefona.length === 0 || /^[a-zA-Z]*$/.test(brojTelefona)) {
            alert("Polje za telefon mora biti popunjeno!")
        }
        else if (email.length === 0 || !/^[a-zA-Z0-9@.]*$/.test(email)) {
            alert("Polje za email mora biti popunjeno!")
        }
        else if (lozinka.length === 0 || lozinka.length < 6) {
            alert("Polje za lozinku mora biti popunjeno!")
        }
        else {
            axios.post('http://127.0.0.1:5000/Registracija', {
                ime: ime,
                prezime: prezime,
                adresa: adresa,
                grad: grad,
                drzava: drzava,
                brojTelefona: brojTelefona,
                email: email,
                lozinka: lozinka
            })
            alert("Registracija je uspešna!")
            redirekcija('/Prijava');
        }
    }

    return (
        <div style={stilStranice}>
            <div style={stilNavBara}>
                <ul className="nav nav-tabs nav-justified">
                    <li className="nav-item">
                        <Link to="/" className="nav-link" style={{ borderRadius:'5px', width:'100%' ,color: 'white', fontWeight: "bold", backgroundColor: '#3d2b1f', fontFamily: 'Calibri' }}>Početna</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/Prijava" className="nav-link" style={{ borderRadius:'5px', width:'100%' ,color: 'white', fontWeight: "bold", backgroundColor: '#3d2b1f', fontFamily: 'Calibri' }}>Prijava</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/Registracija" className="nav-link active" style={{ borderRadius:'5px', width:'100%' ,color: 'white', fontWeight: "bold", backgroundColor: '#3d2b1f', fontFamily: 'Calibri' }}>Registracija</Link>
                    </li>
                </ul>
            </div>
            <div className="form-group" style={stilProstora}>
                <div className="form-group" style={stilForme}>
                    <h1 style={stilNaslova}>Registracija</h1>
                    <table style={{ margin: 'auto', borderSpacing: '0 5px', borderCollapse: 'separate' }}>
                        <tr>
                            <td style={stilLabele}>Ime:</td>
                            <td><input style={stilUnosa} value={ime} onChange={(e) => setIme(e.target.value)} type="text" id="ime" className="ime" maxLength="25" /></td>
                        </tr>
                        <tr>
                            <td style={stilLabele}>Prezime:</td>
                            <td><input style={stilUnosa} value={prezime} onChange={(e) => setPrezime(e.target.value)} type="text" id="prezime" className="prezime" maxLength="25" /></td>
                        </tr>
                        <tr>
                            <td style={stilLabele}>Adresa:</td>
                            <td><input style={stilUnosa} value={adresa} onChange={(e) => setAdresu(e.target.value)} type="text" id="adresa" className="adresa" maxLength="25" /></td>
                        </tr>
                        <tr>
                            <td style={stilLabele}>Grad:</td>
                            <td><input style={stilUnosa} value={grad} onChange={(e) => setGrad(e.target.value)} type="text" id="grad" className="grad" maxLength="25" /></td>
                        </tr>
                        <tr>
                            <td style={stilLabele}>Država:</td>
                            <td><input style={stilUnosa} value={drzava} onChange={(e) => setDrzavu(e.target.value)} type="text" id="drzava" className="drzava" maxLength="25" /></td>
                        </tr>
                        <tr>
                            <td style={stilLabele}>Broj telefona:</td>
                            <td><input style={stilUnosa} value={brojTelefona} onChange={(e) => setBrojTelefona(e.target.value)} type="text" id="brojtelefona" className="brojtelefona" maxLength="25" /></td>
                        </tr>
                        <tr>
                            <td style={stilLabele}>Email:</td>
                            <td><input style={stilUnosa} value={email} onChange={(e) => setEmail(e.target.value)} type="email" id="email" className="email" maxLength="30" /></td>
                        </tr>
                        <tr>
                            <td style={stilLabele}>Lozinka:</td>
                            <td><input style={stilUnosa} value={lozinka} onChange={(e) => setLozinku(e.target.value)} type="password" id="lozinka" className="lozinka" maxLength="18" /></td>
                        </tr>
                        <tr>
                            <td colSpan="2" align="center">
                                <input
                                    className="btn btn-outline-success"
                                    id="registracijaDugme"
                                    style={stilDugmeta}
                                    type="submit"
                                    value="Registracija"
                                    onClick={registracija}
                                />
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Registracija;