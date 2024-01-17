import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Konverzija = () => {

    const [email, setEmail] = useState('');
    const [brojKartice, setBrojKartice] = useState('');
    const [iznos, setIznos] = useState('');
    const [valute1, setValute1] = useState([]);
    const [valute2, setValute2] = useState([]);
    const [valuta1, setOdabranuValutu1] = useState('');
    const [valuta2, setOdabranuValutu2] = useState('');
    const [tempValuta, setTempValutu] = useState([]);
    const [pocetnaValuta, setPocetnuValutu] = useState([]);
    const [stanje, setStanje] = useState('');
    const [pocetnoStanje, setPocetnoStanje] = useState('');
    const [podaci, setPodatke] = useState([]);

    const stilProstora1 = {
        textAlign: 'center',
        backgroundColor: 'white',
        width: '440px',
        padding: '20px',
        borderRadius: '8px',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: '20px',
        height: '430px',
        backgroundColor: '#836953',
        border: '1px inset #3d2b1f',
        color: 'white'
    };

    const stilProstora2 = {
        textAlign: 'center',
        backgroundColor: 'white',
        width: '440px',
        padding: '20px',
        borderRadius: '8px',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: '20px',
        marginLeft: '100px',
        height: '430px',
        backgroundColor: '#836953',
        border: '1px inset #3d2b1f',
        color: 'white'
    };

    const stilForme = {
        textAlign: 'left',
        width: '400px',
        margin: '0 auto',
        marginBottom: '20px'
    };

    const stilLabele = {
        fontFamily: 'Calibri',
        fontWeight: 'bold',
        marginTop: '10px',
        display: 'block'
    };

    const stilUnosa = {
        fontFamily: 'Calibri',
        color: 'black',
        width: '80%',
        padding: '10px',
        marginBottom: '15px',
        boxSizing: 'border-box',
        border: '1px solid white',
        borderRadius: '4px'
    };

    const stilDugmeta1 = {
        fontFamily: 'Calibri',
        fontWeight: 'bold',
        width: '200px',
        height: '50px',
        textAlign: 'center',
        marginLeft: '80px',
        marginTop: '5px',
        color: 'white',
        border: '1px inset #3d2b1f',
        backgroundColor: '#3d2b1f'
    };

    const stilDugmeta2 = {
        fontFamily: 'Calibri',
        fontWeight: 'bold',
        width: '200px',
        height: '50px',
        textAlign: 'center',
        marginLeft: '95px',
        marginTop: '5px',
        color: 'white',
        border: '1px inset #3d2b1f',
        backgroundColor: '#3d2b1f'
    };

    const stilNaslova = {
        fontFamily: 'Calibri',
        fontWeight: 'bold',
        marginTop: '20px',
        marginBottom: '20px',
        color: 'white',
        marginLeft: '90px'
    };

    const stilStranice = {
        textAlign: 'center',
        backgroundImage: `url('Pozadine/pozadinaPocetna.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    };

    const stilNavBara = {
        position: 'fixed',
        top: 0,
        width: '100%',
        zIndex: 1000
    }
    
    useEffect(() => {
        const prihvatiPodatke = async () => {
            try {
                const response = await axios.get('http://localhost:5000/UplataIKonverzija');
                setPodatke(response.data.kartica);
            } catch (error) {
                console.error('Greška:', error);
            }
        };

        prihvatiPodatke();
    }, []);
    
    useEffect(() => {
        if (podaci !== undefined && podaci.vlasnik !== undefined) {
            setEmail(podaci.vlasnik);
            setBrojKartice(podaci.brojKartice);
            setStanje(podaci.stanje);
            setOdabranuValutu2(podaci.valuta);
            setTempValutu(podaci.valuta);
            setPocetnuValutu(podaci.valuta);
            setPocetnoStanje(podaci.stanje);
        }
    }, [podaci]);

    useEffect(() => {
        const sveValute = async () => {
            const response = await axios.get('https://api.exchangerate-api.com/v4/latest/USD');
            const valute = Object.keys(response.data.rates);
            setValute1(valute);
            setValute2(valute);
        };

        sveValute();
    }, []);
    
    const uplati = () => {
        axios.put('http://127.0.0.1:5000/Uplata', {
            email: email,
            brojKartice: brojKartice,
            iznos: iznos,
            valuta: valuta1
        });
        alert('Uplata je uspešna.');
        window.location.reload();
    };
    
    const konvertuj = () => {
        axios.put('http://127.0.0.1:5000/Konverzija', {
            email: email,
            brojKartice: brojKartice,
            stanje: stanje,
            valuta: valuta2
        });
        alert('Konverzija je uspešna.');
        window.location.reload();
    };

    useEffect(() => {
        const konverzija = async () => {
            try {
                const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${valuta2}`);
                const data = await response.json();

                if (valuta2 === pocetnaValuta) {
                    setStanje(pocetnoStanje);
                }
                else {
                    const konvertovanoStanje = (data.rates[valuta2] / data.rates[tempValuta]) * stanje;
                    setStanje(konvertovanoStanje.toFixed(2));
                }
            } catch (error) {
                console.error('Greška:', error);
            }
        };

        if (valuta2 !== '') {
            konverzija();
        }
       
    }, [valuta2, tempValuta]);
    
    const promenaValuta = (e) => {
        const novaVrednost = e.target.value;
        setTempValutu(valuta2);
        setOdabranuValutu2(novaVrednost);
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
                        <Link to="/KarticaKorisnika" className="nav-link" style={{ borderRadius:'5px', width:'100%' ,color: 'white', fontWeight: "bold", backgroundColor: '#3d2b1f', fontFamily: 'Calibri' }}>Dodaj karticu</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/Racun" className="nav-link" style={{ borderRadius:'5px', width:'100%' ,color: 'white', fontWeight: "bold", backgroundColor: '#3d2b1f', fontFamily: 'Calibri' }}>Pregled računa</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/UplataKonverzija" className="nav-link active" style={{ borderRadius:'5px', width:'100%' ,color: 'white', fontWeight: "bold", backgroundColor: '#3d2b1f', fontFamily: 'Calibri' }}>Uplata i konverzija</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/IstorijaProizvoda" className="nav-link" style={{ borderRadius:'5px', width:'100%' ,color: 'white', fontWeight: "bold", backgroundColor: '#3d2b1f', fontFamily: 'Calibri' }}>Istorija kupovina</Link>
                    </li>
                </ul>
            </div>
            <div style={stilProstora1}>
                <form style={stilForme}>
                    <h2 style={stilNaslova}>Uplata na račun</h2>
                    <label style={stilLabele} htmlFor="email1">
                        Email:
                    </label>
                    <input
                        style={stilUnosa}
                        type="text"
                        id="email1"
                        readOnly={true}
                        value={email}
                    />
                    <label style={stilLabele} htmlFor="brojKartice1">
                        Broj kartice:
                    </label>
                    <input
                        style={stilUnosa}
                        type="text"
                        id="brojKartice1"
                        maxLength={16}
                        readOnly={true}
                        value={brojKartice}
                    />
                    <label style={stilLabele} htmlFor="iznos1">
                        Iznos:
                    </label>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <input
                            style={stilUnosa}
                            type="number"
                            id="iznos1"
                            value={iznos}
                            onChange={(e) => setIznos(e.target.value)}
                        />
                        <select
                            value={valuta1}
                            onChange={(e) => setOdabranuValutu1(e.target.value)}
                            style={{ ...stilUnosa, height: '50px', width: '25%', textAlign: 'center' }}>
                            {valute1.map((valuta, index) => (
                                <option key={index} value={valuta}>
                                    {valuta}
                                </option>
                            ))}
                        </select>
                    </div>
                    <input
                        className="btn btn-outline-success"
                        id="uplati"
                        style={stilDugmeta1}
                        type="button"
                        value="Uplati"
                        onClick={uplati}
                    />
                </form>
            </div>
            <div style={stilProstora2}>
                <form style={stilForme}>
                    <h2 style={stilNaslova}>Konverzija valuta</h2>
                    <label style={stilLabele} htmlFor="email2">
                        Email:
                    </label>
                    <input
                        style={stilUnosa}
                        type="text"
                        id="email2"
                        readOnly={true}
                        value={email}
                    />
                    <label style={stilLabele} htmlFor="brojKartice2">
                        Broj kartice:
                    </label>
                    <input
                        style={stilUnosa}
                        type="text"
                        id="brojKartice2"
                        maxLength={16}
                        readOnly={true}
                        value={brojKartice}
                    />
                    <label style={stilLabele} htmlFor="stanje">
                        Stanje:
                    </label>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <input
                            style={stilUnosa}
                            type="text"
                            id="stanje"
                            readOnly={true}
                            value={stanje}
                            onChange={(e) => setStanje(e.target.value)}
                        />
                        <select
                            value={valuta2}
                            onChange={promenaValuta}
                            style={{ ...stilUnosa, height: '50px', width: '25%', textAlign: 'center' }}>
                            {valute2.map((valuta, index) => (
                                <option key={index} value={valuta}>
                                    {valuta}
                                </option>
                            ))}
                        </select>
                    </div>
                    <input
                        className="btn btn-outline-success"
                        id="konvertuj"
                        style={stilDugmeta2}
                        type="button"
                        value="Konvertuj"
                        onClick={konvertuj}
                    />
                </form>
            </div>
        </div>
    );
};

export default Konverzija;
