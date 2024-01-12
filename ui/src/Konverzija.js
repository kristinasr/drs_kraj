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
    const [pomocnaValuta, setPomocnuValutu] = useState([]);
    const [pocetnaValuta, setPocetnuValutu] = useState([]);
    const [stanje, setStanje] = useState('');
    const [pocetnoStanje, setPocetnoStanje] = useState('');
    const [podaci, setPodatke] = useState([]);

    const stilKontejnera1 = {
        textAlign: 'center',
        backgroundColor: 'white',
        width: '440px',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: '20px',
        height: '430px'
    };

    const stilKontejnera2 = {
        textAlign: 'center',
        backgroundColor: 'white',
        width: '440px',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: '20px',
        marginLeft: '100px',
        height: '430px'
    };

    const stilForme = {
        textAlign: 'left',
        width: '400px',
        margin: '0 auto',
        marginBottom: '20px'
    };

    const stilZaLabelu = {
        fontFamily: 'Times New Roman',
        fontWeight: 'bold',
        marginTop: '10px',
        display: 'block'
    };

    const stilZaUnos = {
        fontFamily: 'Times New Roman',
        color: 'blue',
        width: '80%',
        padding: '10px',
        marginBottom: '15px',
        boxSizing: 'border-box',
        border: '1px solid #ccc',
        borderRadius: '4px'
    };

    const stilZaDugme1 = {
        fontFamily: 'Times New Roman',
        fontWeight: 'bold',
        width: '200px',
        height: '50px',
        textAlign: 'center',
        marginLeft: '80px',
        marginTop: '5px'
    };

    const stilZaDugme2 = {
        fontFamily: 'Times New Roman',
        fontWeight: 'bold',
        width: '200px',
        height: '50px',
        textAlign: 'center',
        marginLeft: '95px',
        marginTop: '5px'
    };

    const stilNaslova = {
        fontFamily: 'Times New Roman',
        fontWeight: 'bold',
        marginTop: '20px',
        marginBottom: '20px',
        color: '#007BFF',
        marginLeft: '85px'
    };

    const stilCeleStranice = {
        textAlign: 'center',
        backgroundImage: `url('Pozadine/pozadinaUplataKonverzija.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    };

    const stilZaNavBar = {
        position: 'fixed',
        top: 0,
        width: '100%',
        zIndex: 1000
    }

    
    useEffect(() => {
        const prihvatiPodatke = async () => {
            try {
                const response = await axios.get('http://localhost:5000/UplataKonverzija');
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
            setPomocnuValutu(podaci.valuta);
            setPocetnuValutu(podaci.valuta);
            setPocetnoStanje(podaci.stanje);
        }
    }, [podaci]);

    // Pribavljanje svih valuta koje postoje
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
                    const konvertovanoStanje = (data.rates[valuta2] / data.rates[pomocnaValuta]) * stanje;
                    setStanje(konvertovanoStanje.toFixed(2));
                }
            } catch (error) {
                console.error('Greška:', error);
            }
        };

        if (valuta2 !== '') {
            konverzija();
        }
       
    }, [valuta2, pomocnaValuta]);

    
    const promenaValuta = (e) => {
        const novaVrednost = e.target.value;
        setPomocnuValutu(valuta2);
        setOdabranuValutu2(novaVrednost);
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
                        <Link to="/KarticaKorisnika" className="nav-link" style={{ color: 'yellow', fontWeight: "bold" }}>Dodavanje kartice</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/Racun" className="nav-link" style={{ color: 'yellow', fontWeight: "bold" }}>Pregled računa</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/UplataKonverzija" className="nav-link active" style={{ color: 'yellow', fontWeight: "bold" }}>Uplata i konverzija valuta</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/IstorijaProizvoda" className="nav-link" style={{ color: 'yellow', fontWeight: "bold" }}>Istorijat kupovina</Link>
                    </li>
                </ul>
            </div>
            <div style={stilKontejnera1}>
                <form style={stilForme}>
                    <h2 style={stilNaslova}>Uplata na račun</h2>
                    <label style={stilZaLabelu} htmlFor="email">
                        Email:
                    </label>
                    <input
                        style={stilZaUnos}
                        type="text"
                        id="email"
                        readOnly={true}
                        value={email}
                    />
                    <label style={stilZaLabelu} htmlFor="brojKartice">
                        Broj kartice:
                    </label>
                    <input
                        style={stilZaUnos}
                        type="text"
                        id="brojKartice"
                        maxLength={16}
                        readOnly={true}
                        value={brojKartice}
                    />
                    <label style={stilZaLabelu} htmlFor="iznos">
                        Iznos:
                    </label>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <input
                            style={stilZaUnos}
                            type="number"
                            id="iznos"
                            value={iznos}
                            onChange={(e) => setIznos(e.target.value)}
                        />
                        <select
                            value={valuta1}
                            onChange={(e) => setOdabranuValutu1(e.target.value)}
                            style={{ ...stilZaUnos, height: '50px', width: '25%', textAlign: 'center' }}>
                            {valute1.map((valuta, index) => (
                                <option key={index} value={valuta}>
                                    {valuta}
                                </option>
                            ))}
                        </select>
                    </div>
                    <input
                        className="btn btn-outline-primary"
                        id="uplati"
                        style={stilZaDugme1}
                        type="button"
                        value="Uplati"
                        onClick={uplati}
                    />
                </form>
            </div>
            <div style={stilKontejnera2}>
                <form style={stilForme}>
                    <h2 style={stilNaslova}>Konverzija stanja</h2>
                    <label style={stilZaLabelu} htmlFor="email2">
                        Email:
                    </label>
                    <input
                        style={stilZaUnos}
                        type="text"
                        id="email2"
                        readOnly={true}
                        value={email}
                    />
                    <label style={stilZaLabelu} htmlFor="brojKartice2">
                        Broj kartice:
                    </label>
                    <input
                        style={stilZaUnos}
                        type="text"
                        id="brojKartice2"
                        maxLength={16}
                        readOnly={true}
                        value={brojKartice}
                    />
                    <label style={stilZaLabelu} htmlFor="stanje">
                        Stanje:
                    </label>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <input
                            style={stilZaUnos}
                            type="text"
                            id="stanje"
                            readOnly={true}
                            value={stanje}
                            onChange={(e) => setStanje(e.target.value)}
                        />
                        <select
                            value={valuta2}
                            onChange={promenaValuta}
                            style={{ ...stilZaUnos, height: '50px', width: '25%', textAlign: 'center' }}>
                            {valute2.map((valuta, index) => (
                                <option key={index} value={valuta}>
                                    {valuta}
                                </option>
                            ))}
                        </select>
                    </div>
                    <input
                        className="btn btn-outline-primary"
                        id="konvertuj"
                        style={stilZaDugme2}
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
