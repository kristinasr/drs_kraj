import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Modal } from 'react-bootstrap';
import axios from 'axios';

const PotvrdaKupovine = ({ showModal, handleOpenModal, handleCloseModal, nazivProizvoda, cenaProizvoda, valutaProizvoda }) => {

  const [konvertovanaCena, podesiKonvertovanuCenu] = useState(null);
  const [kolicina, podesiKolicinu] = useState('');
  const [valute, postaviValute] = useState([]);
  const [valuta, postaviOdabranuValutu] = useState('');

  useEffect(() => {
    const prihvatiPodatke = async () => {
      try {
        const response = await fetch(`https://open.er-api.com/v6/latest/${valuta}`);
        const data = await response.json();
        const konvertovanaCena = (data.rates[valuta] / data.rates[valutaProizvoda]) * cenaProizvoda;
        podesiKonvertovanuCenu(konvertovanaCena.toFixed(2));
      } catch (error) {
        console.error('Greška:', error);
      }
    };

    if (showModal) {
      prihvatiPodatke();
    }
  }, [showModal, cenaProizvoda, valutaProizvoda, valuta]);

  useEffect(() => {
    const sveValute = async () => {
      const response = await axios.get('https://open.er-api.com/v6/latest');
      const valute = Object.keys(response.data.rates);
      postaviValute(valute);
    };

    sveValute();
  }, []);

  const stilZaUnos = {
    fontFamily: 'Calibri',
    textAlign: 'center',
    color: 'blue',
    width: '100px',
    marginLeft: '10px',
  };

  const stilKontejnera = {
    marginBottom: '20px',
  };

  const stilListeValuta = {
    marginLeft: '10px',
  };

  return (
    <Modal show={showModal} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>{nazivProizvoda}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div style={stilKontejnera}>
          <span>Odaberite valutu u kojoj zelite da platite:</span>
          <select style={stilListeValuta} value={valuta} onChange={(e) => postaviOdabranuValutu(e.target.value)}>
            {valute.map((valuta, index) => (
              <option key={index} value={valuta}>
                {valuta}
              </option>
            ))}
          </select>
        </div>
        <div style={stilKontejnera}>
          Cena za odabranu valutu je: {konvertovanaCena} {valuta}
        </div>
        <div>
          <span>Broj proizvoda:</span>
          <input
            style={stilZaUnos}
            type="number"
            value={kolicina}
            onChange={(e) => podesiKolicinu(e.target.value)}
            id="kolicina"
            name="kolicina"
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseModal}>
          Potvrdi porudzbinu
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PotvrdaKupovine;