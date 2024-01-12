import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Modal } from 'react-bootstrap';
import axios from 'axios';

const PotvrdaKupovine = ({ showModal, handleOpenModal, handleCloseModal, nazivProizvoda, cenaProizvoda, valutaProizvoda, kartica }) => {

  const [konvertovanaCena, setKonvertovanuCenu] = useState(null);
  const [kolicina, setKolicinu] = useState('');
  const [valute, setValute] = useState([]);
  const [valuta, setOdabranuValutu] = useState('');
  const [stanje, setStanje] = useState('');
  const [stanje2, setStanje2] = useState('');
  const [zarada, setZaradu] = useState('');

  useEffect(() => {
      const prihvatiPodatke = async () => {
          try {
            const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${valuta}`);
            const data = await response.json();
            const konvertovanaCena = (data.rates[valuta] / data.rates[valutaProizvoda]) * cenaProizvoda;
            setKonvertovanuCenu(konvertovanaCena.toFixed(2));
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
          const response = await axios.get('https://api.exchangerate-api.com/v4/latest/USD');
          const valute = Object.keys(response.data.rates);
          setValute(valute);
      };

      sveValute();
  }, []);

  useEffect(() => {
    const konverzija = async () => {
      try {
        const response = await fetch(`https://open.er-api.com/v6/latest/${valuta}`);
        const data = await response.json();
        const konvertovanoStanje = (data.rates[valuta] / data.rates[kartica.valuta]) * kartica.stanje;
        setStanje(konvertovanoStanje.toFixed(2));
        const konvertovanoStanje2 = (data.rates['USD'] / data.rates[valuta]) * (kolicina * konvertovanaCena);
        setZaradu(konvertovanoStanje2.toFixed(2));
        const konvertovanoStanje3 = (data.rates[kartica.valuta] / data.rates[valuta]) * konvertovanaCena;
        setStanje2(konvertovanoStanje3.toFixed(2));
      } catch (error) {
        console.error('Greška:', error);
      }
    };

    if (valuta !== '') {
      konverzija();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [valuta, kolicina]);

  const stilZaUnos = {
    fontFamily: 'Calibri',
    textAlign: 'center',
    color: 'black',
    width: '100px',
    marginLeft: '10px',
  };

  const stilProstora = {
    marginBottom: '20px',
  };

  const stilValuta = {
    marginLeft: '10px',
  };


  const naruci = () => {
    if (kartica.valuta === valuta) {
      if (kartica.stanje >= (kolicina * konvertovanaCena)) {
        axios.post('http://127.0.0.1:5000/Naruci', {
          nazivProizvoda: nazivProizvoda,
          cena: konvertovanaCena,
          valuta: valuta,
          kolicina: kolicina,
          zarada: zarada
        })
        alert("Uspešno ste naručili proizvod.");
        window.location.reload();
      }
      else {
        alert("Nemate dovoljno sredstava na računu.");
      }
    }
    else {
      if (stanje >= (kolicina * konvertovanaCena)) {
        axios.post('http://127.0.0.1:5000/Naruci', {
          nazivProizvoda: nazivProizvoda,
          cena: stanje2,
          valuta: valuta,
          kolicina: kolicina,
          zarada: zarada
        })
        alert("Uspešno ste naručili proizvod.");
        window.location.reload();
      }
      else {
        alert("Nemate dovoljno sredstava na računu.");
      }
    }
  }

  
  const dugmeNaruci = () => {
    naruci();
    handleCloseModal();
  };

  return (
    <Modal show={showModal} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>{nazivProizvoda}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div style={stilProstora}>
          <span>Odaberite valutu u kojoj želite da platite:</span>
          <select style={stilValuta} value={valuta} onChange={(e) => setOdabranuValutu(e.target.value)}>
            {valute.map((valuta, index) => (
              <option key={index} value={valuta}>
                {valuta}
              </option>
            ))}
          </select>
        </div>
        <div style={stilProstora}>
          Cena za odabranu valutu je: {konvertovanaCena} {valuta}
        </div>
        <div>
          <span>Količina proizvoda:</span>
          <input
            style={stilZaUnos}
            type="number"
            value={kolicina}
            onChange={(e) => setKolicinu(e.target.value)}
            id="kolicina"
            name="kolicina"
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseModal}>
          Potvrdi porudžbinu
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PotvrdaKupovine;