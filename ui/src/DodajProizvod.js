import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const DodajProizvod = () => {

    const [naziv, setNaziv] = useState('');
    const [cena, setCenu] = useState('');
    const [kolicina, setKolicinu] = useState('');
    const [valute, setValute] = useState([]);
    const [valuta, setOdabranuValutu] = useState('');
    const [slika, setSliku] = useState('');
    const redirekcija = useNavigate();

    const stilProstora = {
        textAlign: 'center',
        backgroundColor: '#836953',
        marginLeft: '550px',
        width: '400px',
        height: '300px',
        borderRadius: '5px',
        border: '1px inset #3d2b1f',
    };

    const stilForme = {
        display: 'inline-block',
        textAlign: 'left',
        margin: 15,
    };

    const stilLabele = {
        fontFamily: 'Calibri',
        fontWeight: 'bold',
        color: 'white',
    };

    const stilUnosa = {
        fontFamily: 'Calibri',
        color: 'black',
    };

    const stilDugmeta = {
        fontFamily: 'Calibri',
        fontWeight: 'bold',
        color:'white',
        backgroundColor:'#3d2b1f',
        border:'0.5px solid #3d2b1f',
        margin: 10,
    };

    const stilNaslova = {
        fontFamily: 'Calibri',
        fontWeight: 'bold',
        marginTop: 0,
        textAlign: 'center',
        color:'white',
    };

    const stilStranice = {
        textAlign: 'center',
        backgroundImage: `url('Pozadine/pozadinaPocetna.jpg')`,
        backgroundSize: 'cover',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
    };

    const stilNavBara = {
        position: 'fixed',
        top: 0,
        width: '100%',
        zIndex: 1000,
    }

    useEffect(() => {
        const sveValute = async () => {
            const response = await axios.get('https://api.exchangerate-api.com/v4/latest/USD');
            const valuteSve = Object.keys(response.data.rates);
            setValute(valuteSve);
        };

        sveValute();
    }, []);

    const dodavanjeProizvoda = () => {
        if (naziv.length === 0) {
            alert("Polje za naziv proizvoda mora biti popunjeno!")
        }
        else if (cena.length === 0) {
            alert("Polje za cenu proizvoda mora biti popunjeno!")
        }
        else if (kolicina.length === 0) {
            alert("Polje za količinu proizvoda mora biti popunjeno!")
        }
        else {
            axios.post('http://127.0.0.1:5000/Proizvod', {
                naziv: naziv,
                cena: cena,
                valuta: valuta,
                kolicina: kolicina,
                slika: slika
            })
            alert("Proizvod je uspešno dodat!")
            redirekcija('/');
        }
    }

    return (
        <div style={stilStranice}>
            <div className='proizvod'>
                <div style={stilNavBara}>
                    <ul className="nav nav-tabs nav-justified">
                        <li className="nav-item">
                            <Link to="/" className="nav-link" style={{ borderRadius:'5px', width:'100%' ,color: 'white', fontWeight: "bold", backgroundColor: '#3d2b1f', fontFamily: 'Calibri' }}>Početna</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/Proizvod" className="nav-link active" style={{ borderRadius:'5px', width:'100%' ,color: 'white', fontWeight: "bold", backgroundColor: '#3d2b1f', fontFamily: 'Calibri' }}>Dodavanje proizvoda</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/Kolicina" className="nav-link" style={{ borderRadius:'5px', width:'100%' ,color: 'white', fontWeight: "bold", backgroundColor: '#3d2b1f', fontFamily: 'Calibri' }}>Izmena količine proizvoda</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/UzivoKupovina" className="nav-link" style={{ borderRadius:'5px', width:'100%' ,color: 'white', fontWeight: "bold", backgroundColor: '#3d2b1f', fontFamily: 'Calibri' }}>Praćenje kupovina</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/Verifikacija" className="nav-link" style={{ borderRadius:'5px', width:'100%' ,color: 'white', fontWeight: "bold", backgroundColor: '#3d2b1f', fontFamily: 'Calibri' }}>Verifikacija</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/AdminRacun" className="nav-link" style={{ borderRadius:'5px', width:'100%' ,color: 'white', fontWeight: "bold", backgroundColor: '#3d2b1f', fontFamily: 'Calibri' }}>Admin Racun</Link>
                        </li>
                    </ul>
                </div>
                <div className="prostor" style={stilProstora}>
                    <div className="forma" style={stilForme}>
                        <h1 style={stilNaslova}>Novi proizvod</h1>
                        <table style={{ margin: 'auto', borderSpacing: '0 5px', borderCollapse: 'separate' }}>
                            <tr>
                                <th style={stilLabele}>Naziv:</th>
                                <td>
                                    <input
                                        style={stilUnosa}
                                        type="text"
                                        id="naziv"
                                        className="naziv"
                                        value={naziv}
                                        onChange={(e) => setNaziv(e.target.value)}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <th style={stilLabele}>Cena:</th>
                                <td>
                                    <div style={{ display: 'flex', gap: '15px' }}>
                                        <input
                                            style={stilUnosa}
                                            type="number"
                                            id="cena"
                                            className="cena"
                                            value={cena}
                                            onChange={(e) => setCenu(e.target.value)}
                                        />
                                        <select value={valuta} onChange={(e) => setOdabranuValutu(e.target.value)}>
                                            {valute.map((valuta, index) => (
                                                <option key={index} value={valuta}>
                                                    {valuta}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <th style={stilLabele}>Količina:</th>
                                <td>
                                    <input
                                        style={stilUnosa}
                                        type="number"
                                        id="kolicina"
                                        className="kolicina"
                                        value={kolicina}
                                        onChange={(e) => setKolicinu(e.target.value)}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <th style={stilLabele}>Slika:</th>
                                <td>
                                    <td>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            value={slika}
                                            onChange={(e) => setSliku(e.target.value)}
                                        />
                                    </td>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan="2" align="center">
                                    <input
                                        className="btn btn-outline-success"
                                        id="dodajDugme"
                                        style={stilDugmeta}
                                        type="submit"
                                        value="Dodaj"
                                        onClick={dodavanjeProizvoda}
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

export default DodajProizvod;