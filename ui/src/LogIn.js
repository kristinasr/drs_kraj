import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Prijava = () => {

    const [email, setEmail] = useState('');
    const [lozinka, setLozinku] = useState('');
    const redirekcija = useNavigate();

    const stilProstora = {
        textAlign: 'center',
        backgroundColor: '#836953',
        width: '350px',
        height: '200px',
        border: '1px inset #3d2b1f',
        borderRadius:'5px',
    };

    const stilForme = {
        display: 'inline-block',
        textAlign: 'left',
        margin: 10,
    };

    const stilLabele = {
        fontFamily: 'Calibri',
        fontWeight: 'bold',
        marginTop: 0,
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
        border: '0.5px solid #3d2b1f',
        backgroundColor:'#3d2b1f',
        color:'white',
        margin: 5,
    };

    const stilNaslova = {
        fontFamily: 'Calibri',
        fontWeight: 'bold',
        textAlign: 'center',
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

    const prijava = () => {
        if (email.length === 0 || !/^[a-zA-Z0-9@.]*$/.test(email)) {
            alert("Polje za email mora biti popunjeno!")
        }
        else if (lozinka.length === 0) {
            alert("Polje za lozinku mora biti popunjeno!")
        }
        else {
            axios.post('http://127.0.0.1:5000/Prijava', {
                email: email,
                lozinka: lozinka
            })

            if (email == 'secernisanns@gmail.com') {
                alert("Admin prijavljen!")
                redirekcija('/Proizvod');
            }
            else {
                alert("Prijava korisnika je uspešna!")
                redirekcija('/');
            }
        }
    }

    return (
        <div style={stilStranice}>
            <div style={stilNavBara}>
                <ul className="nav nav-tabs nav-justified">
                    <li className="nav-item">
                        <Link to="/" className="nav-link" style={{ borderRadius:'5px', width:'100%' ,color: 'white', fontWeight: "bold", backgroundColor: '#3d2b1f', fontFamily: 'Calibri'  }}>Početna</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/Prijava" className="nav-link active" style={{ borderRadius:'5px', width:'100%' ,color: 'white', fontWeight: "bold", backgroundColor: '#3d2b1f', fontFamily: 'Calibri'  }}>Prijava</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/Registracija" className="nav-link" style={{ borderRadius:'5px', width:'100%' ,color: 'white', fontWeight: "bold", backgroundColor: '#3d2b1f', fontFamily: 'Calibri'  }}>Registracija</Link>
                    </li> 
             
                </ul>
            </div>
            <div className='prijava'>
                <div className="prostor" style={stilProstora}>
                    <div className="forma" style={stilForme}>
                        <h1 style={stilNaslova}>Prijava</h1>
                        <table style={{ margin: 'auto', borderSpacing: '0 5px', borderCollapse: 'separate' }}>
                            <tr>
                                <th style={stilLabele}>Email:</th>
                                <td>
                                    <input
                                        style={stilUnosa}
                                        type="email"
                                        id="email"
                                        className="email"
                                        maxLength="25"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <th style={stilLabele}>Lozinka:</th>
                                <td>
                                    <input
                                        style={stilUnosa}
                                        type="password"
                                        id="lozinka"
                                        className="lozinka"
                                        maxLength="18"
                                        value={lozinka}
                                        onChange={(e) => setLozinku(e.target.value)}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td colSpan="2" align="center">
                                    <input
                                        className="btn btn-outline-success"
                                        id="prijavaDugme"
                                        style={stilDugmeta}
                                        type="submit"
                                        value="Prijavi se"
                                        onClick={prijava}
                                    />
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Prijava;