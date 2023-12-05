import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Registracija = () => {

    const [ime, podesiIme] = useState('');
    const [prezime, podesiPrezime] = useState('');
    const [adresa, podesiAdresu] = useState('');
    const [grad, podesiGrad] = useState('');
    const [drzava, podesiDrzavu] = useState('');
    const [brojTelefona, podesiBrojTelefona] = useState('');
    const [email, podesiEmail] = useState('');
    const [lozinka, podesiLozinku] = useState('');
    const redirekcija = useNavigate();

    const stilKontejnera = {
        textAlign: 'center',
        backgroundColor: 'white',
        width: '500px',
        height: '410px',
        border: '3px inset #3d2b1f',
    };

    const stilForme = {
        display: 'inline-block',
        textAlign: 'left',
    };

    const stilZaLabelu = {
        fontFamily: 'Calibri',
        fontWeight: 'bold',
        marginTop: 0,
        color:'#3d2b1f',
    };

    const stilZaUnos = {
        fontFamily: 'Calibri',
        color: 'black',
    };

    const stilZaDugme = {
        fontFamily: 'Calibri',
        fontWeight: 'bold',
        backgroundColor: "white",
        color: '#3d2b1f',
        border: '0.5px solid #3d2b1f',
    };

    const stilNaslova = {
        fontFamily: 'Calibri',
        fontWeight: 'bold',
        marginTop: 0,
        textAlign: 'center',
        color:'#3d2b1f',
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

    const registracijaKorisnika = () => {
        if (ime.length == 0 || /\d/.test(ime) || !/^[a-zA-Z\s]*$/.test(ime)) {
            alert("Polje mora biti popunjeno!")
        }
        else if (prezime.length == 0 || /\d/.test(prezime) || !/^[a-zA-Z\s]*$/.test(prezime)) {
            alert("Polje mora biti popunjeno!")
        }
        else if (adresa.length == 0 || !/^[a-zA-Z0-9\s]+$/.test(adresa)) {
            alert("Polje mora biti popunjeno!")
        }
        else if (grad.length == 0|| /\d/.test(grad) || !/^[a-zA-Z\s]*$/.test(grad)) {
            alert("Polje mora biti popunjeno!")
        }
        else if (drzava.length == 0 || /\d/.test(drzava) || !/^[a-zA-Z\s]*$/.test(drzava)) {
            alert("Polje mora biti popunjeno!")
        }
        else if (brojTelefona.length == 0 || /^[a-zA-Z]*$/.test(brojTelefona)) {
            alert("Polje mora biti popunjeno!")
        }
        else if (email.length == 0 || !/^[a-zA-Z0-9@.]*$/.test(email)) {
            alert("Polje mora biti popunjeno!")
        }
        else if (lozinka.length == 0 || lozinka.length < 6) {
            alert("Polje mora biti popunjeno!")
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
        <div style={stilCeleStranice}>
            <div style={stilZaNavBar}>
                <ul className="nav nav-pills nav-fill">
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
            <div className="kontejner" style={stilKontejnera}>
                <div className="forma" style={stilForme}>
                    <h1 style={stilNaslova}>Registracija</h1>
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
                            <td><input style={stilZaUnos} value={brojTelefona} onChange={(e) => podesiBrojTelefona(e.target.value)} type="text" id="brojtelefona" className="brojtelefona" maxLength="25" /></td>
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
                            <td colSpan="2" align="center">
                                <input
                                    className="btn btn-outline-primary"
                                    id="registracijaDugme"
                                    style={stilZaDugme}
                                    type="submit"
                                    value="Registracija"
                                    onClick={registracijaKorisnika}
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