import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const VerifikacijaKartice = ({ kartica }) => {

    const stilKartice = {
        width: '300px',
        borderRadius: '8px',
        margin: '80px',
        backgroundColor: '#3d2b1f',
    };

    const stilNaslova = {
        fontFamily: 'Calibri',
        fontWeight: 'bold',
        marginTop: '0',
        color: 'white',
        fontSize: '30px',
        borderBottom: '1px solid #3d2b1f',
        padding: '5px',
        marginLeft: '15px',
        width: 'fit-content',
        background: '#3d2b1f',
    };

    const stilListe = {
        fontWeight: 'bold',
        marginRight: '10px',
        marginLeft: '0',
        fontFamily: 'Calibri',
        color: '#3d2b1f',
    };

    const stilDugmeta = {
        fontFamily: 'Calibri',
        fontWeight: 'bold',
        padding: '10px 20px',
        borderRadius: '5px',
        cursor: 'pointer',
        marginLeft: '55px',
        marginTop: '5px',
        color: 'white',
        backgroundColor: '#3d2b1f',
        border: '#3d2b1f'
    };

    
    const verifikacija = () => {
        axios.put('http://127.0.0.1:5000/Verifikacija', {
            email: kartica.vlasnik,
            brojKartice: kartica.brojKartice,
            odobrena: 'DA'
        })
        alert("Kartica je odobrena.")
        window.location.reload()
    }

    return (
        <div className="card" style={stilKartice}>
            <ul className="list-group list-group-flush">
                <li className="list-group-item" style={stilNaslova}>Verifikacija:</li>
                <li className="list-group-item"><span style={stilListe}>Email:</span> {kartica.vlasnik}</li>
                <li className="list-group-item"><span style={stilListe}>Broj kartice:</span> {kartica.brojKartice}</li>
                <li className="list-group-item"><span style={stilListe}>Datum isteka:</span> {kartica.datumIsteka}</li>
                <li className="list-group-item"><span style={stilListe}>CVV:</span> {kartica.cvv}</li>
                <li className="list-group-item"><span style={stilListe}>Stanje:</span> {kartica.stanje}</li>
                <li className="list-group-item"><span style={stilListe}>Valuta:</span> {kartica.valuta}</li>
                <li className="list-group-item">
                    <button className="btn btn-outline-success" style={stilDugmeta} onClick={verifikacija}>Verifikuj karticu</button>
                </li>
            </ul>
        </div>
    );
};

export default VerifikacijaKartice;