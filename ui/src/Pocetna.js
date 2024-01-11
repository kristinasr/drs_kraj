import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import PrikazProizvoda from './Kartica';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';


const Pocetna = () => {

    const [podaci, podesiPodatke] = useState([]);
    const [vrstaKorisnika, podesiVrstuKorisnika] = useState([]);
    const [kartica, podesiKartice] = useState([]);
   // const [isLogged, setIsLogged] = useState(false);

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
        width: '105%',
    }

    const stilProfila = {
        position: 'fixed',
        top: 0,
        right: 0,
        marginRight: '30px',
        marginTop: '40px',
    };

    useEffect(() => {
        const prihvatiPodatke = async () => {
            try {
                const odgovor = await axios.get('http://localhost:5000/');
                podesiPodatke(odgovor.data.proizvodi);
                podesiKartice(odgovor.data.kartica)
                const email = odgovor.data.email;

                if (email === '') {
                    podesiVrstuKorisnika('/');
                }
                else if (email === 'secernisanns@gmail.com') {
                    podesiVrstuKorisnika('/Proizvod');
                }
                else {
                    podesiVrstuKorisnika('/Profil');
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
                <ul className="nav nav-pills nav-fill">
                    <li className="nav-item">
                        <Link to="/" className="nav-link active" style={{ borderRadius:'5px', width:'100%' ,color: 'white', fontWeight: "bold", backgroundColor: '#3d2b1f', fontFamily: 'Calibri' }}>Početna</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/Prijava" className="nav-link" style={{ borderRadius:'5px', width:'100%', color: 'white', fontWeight: "bold", backgroundColor: '#3d2b1f', fontFamily: 'Calibri' }}>Prijava</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/Registracija" className="nav-link" style={{ borderRadius:'5px', width:'100%', color: 'white', fontWeight: "bold", backgroundColor: '#3d2b1f', fontFamily: 'Calibri' }}>Registracija</Link>
                    </li>
                </ul>
            </div>
            <div style={stilProfila}>
                <Link to={vrstaKorisnika}>
                    <img src="Pozadine/user.jpg" alt="Profile" style={{ width: '70px', height: '70px', borderRadius: '50%' }} />
                </Link>
            </div>
            <div className="prostor" style={stilProstoraZaProizvode}>
                {podaci.map((proizvod, index) => (
                    <PrikazProizvoda key={index} proizvod={proizvod} kartica={kartica}/>
                ))}
            </div>
        </div>
    );
}

export default Pocetna;