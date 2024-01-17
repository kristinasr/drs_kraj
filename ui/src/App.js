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
import Verifikacija from './Verifikacija';
import Konverzija from './Konverzija';
import Odjava from './Odjava';
import PrikazIzmeneKolicine from './PrikazIzmeneKolicine';
import AdminJeZaradio from './AdminZarada';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Pocetna />} ></Route>
          <Route path="/Prijava" element={<Prijava />} ></Route>
          <Route path="/Registracija" element={<Registracija />} ></Route>
          <Route path="/Odjava" element={<Odjava />} ></Route>
          <Route path="/Proizvod" element={<DodajProizvod />} ></Route>
          <Route path="/Profil" element={<IzmenaProfila />} ></Route>
          <Route path="/UzivoKupovina" element={<PracenjeKupovine />} ></Route>
          <Route path="/KarticaKorisnika" element={<DodavanjeKartice />} ></Route>
          <Route path="/IstorijaProizvoda" element={<IstorijaProizvoda />} ></Route>
          <Route path="/Racun" element={<PrikaziRacun />} ></Route>
          <Route path="/Kolicina" element={<PrikazIzmeneKolicine />} ></Route>
          <Route path="/Verifikacija" element={<Verifikacija />} ></Route>
          <Route path="/Konverzija" element={<Konverzija />} ></Route>
          <Route path="/AdminRacun" element={<AdminJeZaradio/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;