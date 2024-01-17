import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const IzmenaKolicine = ({ proizvod }) => {

    const [kolicina, setKolicina] = useState(proizvod.kolicina);

    const stilKartice = {
        width: '18rem'
    };

    const stilSlike = {
        width: '100%',
        height: '80%'
    };

    const stilDugmeta = {
        width: '40px',
        height: '40px',
        color:'black',
        border: '0.5px inset #3d2b1f',
        fontFamily: 'Calibri',
        fontWeight: 'bold',
    };

    const izmenaDugme = {
        color:'black',
        border: '0.5px inset #3d2b1f',
        fontFamily: 'Calibri',
    }
    
    const povecavanjeKolicine = () => {
        setKolicina(kolicina + 1);
    }

    const smanjivanjeKolicine = () => {
        if (kolicina > 0) {
            setKolicina(kolicina - 1);
        }
        if (kolicina <= 0) {
            alert("Ne možete smanjiti količinu proizvoda!");
        }
    }

    const potvrdiIzmenuKolicineProizvoda = () => {
        axios.put('http://127.0.0.1:5000/Kolicina', {
            naziv: proizvod.naziv,
            cena: proizvod.cena,
            valuta: proizvod.valuta,
            kolicina: kolicina,
            slika: proizvod.slika
        })
        alert("Izmena količine proizvoda je uspešna!");
    }

    return (
        <div className="card" style={stilKartice}>
            <img src={proizvod.slika} className="card-img-top" alt={proizvod.naziv} style={stilSlike} />
            <div className="card-body" style={{ marginTop: '50px' }}>
                <h4 className="card-title">{proizvod.naziv}</h4>
            </div>
            <ul className="list-group list-group-flush">
                <li className="list-group-item">Cena: {proizvod.cena} {proizvod.valuta}</li>
                <li className="list-group-item">Količina: {kolicina}</li>
                <li className="list-group-item">
                    <button className="btn btn-outline-success" style={stilDugmeta} onClick={povecavanjeKolicine}>+</button>
                    <button className="btn btn-outline-success" style={stilDugmeta} onClick={smanjivanjeKolicine}>-</button>
                </li>
                <li className="list-group-item">
                    <button className="btn btn-outline-success" style={izmenaDugme} onClick={potvrdiIzmenuKolicineProizvoda}>Izmeni</button>
                </li>
            </ul>
        </div>
    );
};

export default IzmenaKolicine;