import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const PrikazIzmeneKolicine = ({ proizvod }) => {

    const [kolicina, setKolicina] = useState(proizvod.kolicina);

    const stilKartice = {
        width: '18rem'
    };

    const stilSlike = {
        width: '100%',
        height: '80%'
    };

    const IzgledDugma = {

        width: '40px',
        height: '40px'
    }

    const stilZaDugme = {
        ...IzgledDugma,
        textAlign: 'center',
        marginLeft: '20px'
    };

    
    const povecavanjeKolicine = () => {
        setKolicina(kolicina + 1);
    }

   
    const smanjivanjeKolicine = () => {
        if (kolicina > 0) {
            setKolicina(kolicina - 1);
        }
        if (kolicina <= 0) {
            alert("Ne mozete smanjiti kolicinu!");
        }
    }

    
    const potvrdiIzmenu = () => {
        axios.put('http://127.0.0.1:5000/Kolicina', {
            naziv: proizvod.naziv,
            cena: proizvod.cena,
            valuta: proizvod.valuta,
            kolicina: kolicina,
            slika: proizvod.slika
        })
        alert("Izmena kolicine je uspesna!");
    }

    return (
        <div className="card" style={stilKartice}>
            <img src={proizvod.slika} className="card-img-top" alt={proizvod.naziv} style={stilSlike} />
            <div className="card-body" style={{ marginTop: '50px' }}>
                <h5 className="card-title">{proizvod.naziv}</h5>
            </div>
            <ul className="list-group list-group-flush">
                <li className="list-group-item">Cena: {proizvod.cena} {proizvod.valuta}</li>
                <li className="list-group-item">Količina: {kolicina}</li>
                <li className="list-group-item">
                    <button className="btn btn-outline-primary" style={IzgledDugma} onClick={povecavanjeKolicine}>+</button>
                    <button className="btn btn-outline-primary" style={stilZaDugme} onClick={smanjivanjeKolicine}>-</button>
                </li>
                <li className="list-group-item">
                    <button className="btn btn-outline-primary" onClick={potvrdiIzmenu}>Potvrdi izmenu</button>
                </li>
            </ul>
        </div>
    );
};

export default PrikazIzmeneKolicine;