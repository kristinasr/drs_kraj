import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

const IstorijaProizvoda = () => {

    const [podaci, setPodatke] = useState([]);

    const stilProstora = {
        textAlign: 'center',
        backgroundColor: 'white',
        borderRadius: '5px',
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
        color: '#3d2b1f',
    };

    const stilTabele = {
        width: '100%',
        borderCollapse: 'collapse',
        marginTop: '10px',
        overflow: 'hidden',
    };

    const stilZaglavljaTabele = {
        border: '2px solid #3d2b1f',
        textAlign: 'center',
        padding: '10px',
        backgroundColor: '#3d2b1f',
        color: 'white',
        fontFamily: 'Calibri',
    };

    const stilReda = {
        border: '2px solid #3d2b1f',
        textAlign: 'center',
        padding: '10px',
        backgroundColor: '#edc9af',
        fontWeight: 'bold',
        fontFamily:'Calibri',
    };

    const stilStranice = {
        textAlign: 'center',
        backgroundImage: `url('Pozadine/pozadinaPocetna.jpg')`,
        backgroundSize: 'cover',
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

    const stilSlike = {
        width: '100px',
        height: 'auto%',
    }

    useEffect(() => {
        const prihvatiPodatke = async () => {
            try {
                const odgovor = await axios.get('http://localhost:5000/IstorijaProizvoda');
                setPodatke(odgovor.data);
            } catch (error) {
                console.error('Greška: ', error);
            }
        };

        prihvatiPodatke();
    }, []);

    return (
        <div style={stilStranice} >
            <div style={stilNavBara}>
                <ul className="nav nav-tabs nav-justified">
                    <li className="nav-item">
                        <Link to="/" className="nav-link" style={{ borderRadius:'5px', width:'100%' ,color: 'white', fontWeight: "bold", backgroundColor: '#3d2b1f', fontFamily: 'Calibri' }}>Početna</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/Profil" className="nav-link" style={{ borderRadius:'5px', width:'100%' ,color: 'white', fontWeight: "bold", backgroundColor: '#3d2b1f', fontFamily: 'Calibri' }}>Profil</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/KarticaKorisnika" className="nav-link" style={{ borderRadius:'5px', width:'100%' ,color: 'white', fontWeight: "bold", backgroundColor: '#3d2b1f', fontFamily: 'Calibri' }}>Dodaj karticu</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/Racun" className="nav-link" style={{ borderRadius:'5px', width:'100%' ,color: 'white', fontWeight: "bold", backgroundColor: '#3d2b1f', fontFamily: 'Calibri' }}>Pregled računa</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/Konverzija" className="nav-link" style={{ borderRadius:'5px', width:'100%' ,color: 'white', fontWeight: "bold", backgroundColor: '#3d2b1f', fontFamily: 'Calibri' }}>Uplata i konverzija</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/IstorijaProizvoda" className="nav-link active" style={{ borderRadius:'5px', width:'100%' ,color: 'white', fontWeight: "bold", backgroundColor: '#3d2b1f', fontFamily: 'Calibri' }}>Istorija kupovina</Link>
                    </li>
                </ul>
            </div>
            <div className='pracenjeKupovine'>
                <div className="prostor" style={stilProstora}>
                    <div className="forma" style={stilForme}>
                        <h1 style={stilNaslova}>Kupljeni proizvodi</h1>
                        <table style={stilTabele}>
                            <thead>
                                <tr>
                                    <th style={stilZaglavljaTabele}>Slika</th>
                                    <th style={stilZaglavljaTabele}>Naziv</th>
                                    <th style={stilZaglavljaTabele}>Cena</th>
                                    <th style={stilZaglavljaTabele}>Valuta</th>
                                    <th style={stilZaglavljaTabele}>Količina</th>
                                    <th style={stilZaglavljaTabele}>Vreme kupovine</th>
                                </tr>
                            </thead>
                            <tbody>
                                {podaci.map((item, index) => (
                                    <tr key={index}>
                                        <td style={stilReda}>
                                            <img style={stilSlike} src={item.slika} alt="" />
                                        </td>
                                        <td style={stilReda}>{item.proizvod}</td>
                                        <td style={stilReda}>{item.cena}</td>
                                        <td style={stilReda}>{item.valuta}</td>
                                        <td style={stilReda}>{item.kolicina}</td>
                                        <td style={stilReda}>{item.vreme}</td>
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

export default IstorijaProizvoda;