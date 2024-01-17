import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import PrikazProizvoda from './PrikazProizvoda';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Odjava from './Odjava';

const Pocetna = () => {
  const [podaci, setPodatke] = useState([]);
  const [vrstaKorisnika, setVrstuKorisnika] = useState([]);
  const [kartica, setKartice] = useState([]);
  const [prijavljen, setPrijavljen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [email, setEmail] = useState("");

  const stilProstoraZaProizvode = {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: '25px',
  };

  const stilStranice = {
    textAlign: 'center',
    backgroundSize: 'cover',
    backgroundImage: `url('Pozadine/pozadinaPocetna.jpg')`,
    backgroundPosition: 'center',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingLeft: '15px',
    paddingTop: '55px',
    overflowY: 'auto',
    minHeight: '100vh',
    flexDirection: 'column',
  };

  const stilNavBara = {
    position: 'fixed',
    top: 0,
    width: '100%',
    right: 0,
    zIndex: 1000,
    background: '#3d2b1f',
    marginBottom: '10px',
  };

  const stilProfila = {
    position: 'fixed',
    top: 0,
    right: 0,
    marginRight: '10px',
    marginTop: '0px',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  };

  const stilDugmetaOdjave = {
    borderRadius: '5px',
    width: '70px',
    marginTop: '5px', 
    color: 'white',
    fontWeight: 'bold',
    backgroundColor: '#3d2b1f',
    fontFamily: 'Calibri',
  };

  useEffect(() => {
    const prihvatiPodatke = async () => {
      try {
        const response = await axios.get('http://localhost:5000/');
        setPodatke(response.data.proizvodi);
        setKartice(response.data.kartica);
        const userEmail = response.data.email;
        setEmail(userEmail); 

        if (userEmail === '') {
          setVrstuKorisnika('/');
          setPrijavljen(false);
          setIsAdmin(true);
        } else if (userEmail === 'secernisanns@gmail.com') {
          setVrstuKorisnika('/Proizvod');
          setPrijavljen(true);
          setIsAdmin(true);
        } else {
          setVrstuKorisnika('/Profil');
          setPrijavljen(true);
          setIsAdmin(false);
        }
      } catch (error) {
        console.error('Greška:', error);
      }
    };

    prihvatiPodatke();
  }, []);

  return (
    <div className='pocetnaStranica' style={stilStranice}>
      <div style={stilNavBara}>
        <ul className="nav nav-tabs nav-justified">
          {!prijavljen && (
            <>
              <li className="nav-item">
                <Link to="/" className="nav-link active" style={{ borderRadius: '5px', width: '100%', color: 'white', fontWeight: "bold", backgroundColor: '#3d2b1f', fontFamily: 'Calibri' }}>Početna</Link>
              </li>
              <li className="nav-item">
                <Link to="/Prijava" className="nav-link" style={{ borderRadius: '5px', width: '100%', color: 'white', fontWeight: "bold", backgroundColor: '#3d2b1f', fontFamily: 'Calibri' }}>Prijava</Link>
              </li>
              <li className="nav-item">
                <Link to="/Registracija" className="nav-link" style={{ borderRadius: '5px', width: '100%', color: 'white', fontWeight: "bold", backgroundColor: '#3d2b1f', fontFamily: 'Calibri' }}>Registracija</Link>
              </li>
            </>
          )}
        </ul>
      </div>
      <div style={stilProfila}>
      {prijavljen && (
        <>
          <Link to={vrstaKorisnika}>
            <img src="Pozadine/user.jpg" alt="Profile" style={{ width: '70px', height: '70px', borderRadius: '50%' }} />
          </Link>
          <Odjava style={stilDugmetaOdjave} />
        </>
      )}
      </div>
      <div className="prostor" style={stilProstoraZaProizvode}>
        {podaci.map((proizvod, index) => (
          <PrikazProizvoda key={index} proizvod={proizvod} kartica={kartica} isAdmin={(prijavljen && email === 'secernisanns@gmail.com') || email === ''}/>
        ))}
      </div>
    </div>
  );
}

export default Pocetna;
