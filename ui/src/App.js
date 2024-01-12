import './App.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Pocetna from './Pocetna';
import Prijava from './LogIn';
import Registracija from './Registration';
import DodajProizvod from './DodajProizvod';
import IzmenaProfila from './IzmenaProfila';
import PracenjeKupovine from './PracenjeKupovine';
import DodavanjeKartice from './DodajKarticu';
import IstorijaProizvoda from './KupljeniProizvodi';
import PrikaziRacun from './Racun';
import IzmenaKolicine from './IzmenaKolicine';
import Verifikacija from './Verifikacija';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Pocetna />} ></Route>
          <Route path="/Prijava" element={<Prijava />} ></Route>
          <Route path="/Registracija" element={<Registracija />} ></Route>
          <Route path="/Proizvod" element={<DodajProizvod />} ></Route>
          <Route path="/Profil" element={<IzmenaProfila />} ></Route>
          <Route path="/UzivoKupovina" element={<PracenjeKupovine />} ></Route>
          <Route path="/KarticaKorisnika" element={<DodavanjeKartice />} ></Route>
          <Route path="/IstorijaProizvoda" element={<IstorijaProizvoda />} ></Route>
          <Route path="/Racun" element={<PrikaziRacun />} ></Route>
          <Route path="/Kolicina" element={<IzmenaKolicine />} ></Route>
          <Route path="/Verifikacija" element={<Verifikacija />} ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;