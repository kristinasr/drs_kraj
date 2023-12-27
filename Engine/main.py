from EmailObaveštenje import slanje_emaila
from Proizvod import Proizvod
from Korisnik import Korisnik
from Kartica import *
from putanjaDoSlike import odrediPutanju
from datetime import datetime
from databaseFunctions import *
from config import request, jsonify, app

Proizvodi = [
    Proizvod(
        naziv = 'Plazma',
        cena = 490,
        valuta = 'RSD',
        kolicina = 3,
        slika = 'Proizvodi/plazma.jpg'
    ),
    Proizvod(
        naziv = 'Nugat', 
        cena = 520, 
        valuta = 'RSD',
        kolicina = 5, 
        slika = 'Proizvodi/nugat.jpg'
    ),
    Proizvod(
        naziv = 'Pistać Malina',
        cena = 590,
        valuta = 'RSD',
        kolicina = 3,
        slika = 'Proizvodi/pistacmalina.jpg'
    ),
    Proizvod(
        naziv = 'Chocco',
        cena = 550,
        valuta = 'RSD',
        kolicina = 8,
        slika = 'Proizvodi/choco.jpg'
    ),
    Proizvod(
        naziv = 'Cherry', 
        cena = 590, 
        valuta = 'RSD',
        kolicina = 20, 
        slika = 'Proizvodi/cherry.jpg'
    ),
     Proizvod(
        naziv = 'Jagoda', 
        cena = 600, 
        valuta = 'RSD',
        kolicina = 12, 
        slika = 'Proizvodi/jagoda.jpg'
    ),
    Proizvod(
        naziv = 'Monaliza', 
        cena = 610, 
        valuta = 'RSD',
        kolicina = 2, 
        slika = 'Proizvodi/monaliza.jpg'
    ),
     Proizvod(
        naziv = 'Cheese Cake', 
        cena = 510, 
        valuta = 'RSD',
        kolicina = 8, 
        slika = 'Proizvodi/cake.jpg'
    )
]

admin = Korisnik(
        ime= 'admin',
        prezime= 'admin',
        adresa= 'Balzakova 65',
        grad= 'Subotica',
        drzava= 'Srbija',
        brojTelefona= '024567876',
        email= 'secernisanns@gmail.com',
        lozinka= 'secernisan1234!'
    )

karticaAdmin = Kartica('9876543210987654', '17/27', '987', '0', 'RSD', admin.email, "DA")

korisnici = procitajKorisnikaIzBaze()
proizvodi = procitajProizvodIzBaze()

prijavljenKorisnik = None

@app.route('/Prijava', methods=['POST'])
def prijava():
    
    email = request.json['email']
    lozinka = request.json['lozinka']

    global prijavljenKorisnik

    prijavljenKorisnik = pronadjiKorisnikaPoEmailu(email)
    
    app.logger.info(f"\nEmail: {email}\nLozinka: {lozinka}")

    response = {
        "message": "Uspešna prijava!",
        "email": email,
        "lozinka": lozinka
    }

    return jsonify(response), 200

@app.route('/Registracija', methods=['POST'])
def registracija():
    
    ime = request.json['ime']
    prezime = request.json['prezime']
    adresa = request.json['adresa']
    grad = request.json['grad']
    drzava = request.json['drzava']
    brojTelefona = request.json['brojTelefona']
    email = request.json['email']
    lozinka = request.json['lozinka']

    novi_korisnik = Korisnik(ime, prezime, adresa, grad, drzava,brojTelefona, email, lozinka)
    dodajKorisnikaUBazu(novi_korisnik)

    app.logger.info(f"\nIme: {ime}\nPrezime: {prezime}\nAdresa: {adresa}\nGrad: {grad}\nDrzava: {drzava}\nBroj Telefona: {brojTelefona}\nEmail: {email}\nLozinka: {lozinka}")
    
    title = "Novi korisnik je uspešno registrovan!"
    body = f"Podaci o korisniku:\nIme: {ime}\nPrezime: {prezime}\nAdresa: {adresa}\nGrad: {grad}\nDrzava: {drzava}\nBroj Telefona: {brojTelefona}\nEmail: {email}\nLozinka: {lozinka}"
    na_email = "secernisanns@gmail.com"

    slanje_emaila(title, body, na_email)
    
    response = {
        "message": "Podaci su uspešno primljeni!",
        "email": email,
        "lozinka": lozinka,
        "ime": ime,
        "prezime": prezime,
        "adresa": adresa,
        "grad": grad,
        "drzava": drzava,
        "brojTelefona": brojTelefona
    }

    return jsonify(response), 200

@app.route('/Proizvod', methods=['POST'])
def dodajProizvod():

    naziv = request.json['naziv']
    cena = request.json['cena']
    valuta = request.json.get('valuta')
    kolicina = request.json['kolicina']
    slika = request.json['slika']

    slika = odrediPutanju(slika)

    novi_proizvod = Proizvod(naziv, cena, valuta, kolicina, slika)
    dodajProizvodUBazu(novi_proizvod)

    app.logger.info(f"\nNaziv proivoda: {naziv}\nCena: {cena}\nValuta: {valuta}\nKolicina: {kolicina}\nSlika: {slika}")

    response = {
        "message": "Uspešno dodat proizvod!",
        "naziv": naziv,
        "cena": cena,
        "valuta": valuta,
        "kolicina": kolicina,
    }

    return jsonify(response), 200

@app.route('/Profil', methods=['POST'])
def izmenaProfila():
    ime = request.json['ime']
    prezime = request.json['prezime']
    adresa = request.json['adresa']
    grad = request.json['grad']
    drzava = request.json['drzava']
    brojTelefona = request.json['brojTelefona']
    email = request.json['email']
    lozinka = request.json['lozinka']

    global prijavljenKorisnik

    for korisnik in korisnici:
        if korisnik.ime != ime:
            prijavljenKorisnik.ime = ime

        if korisnik.prezime != prezime:
            prijavljenKorisnik.prezime = prezime

        if korisnik.adresa != adresa:
            prijavljenKorisnik.adresa = adresa

        if korisnik.grad != grad:
            prijavljenKorisnik.grad = grad

        if korisnik.drzava != drzava:
            prijavljenKorisnik.drzava = drzava

        if korisnik.brojTelefona != brojTelefona:
            prijavljenKorisnik.brojTelefona = brojTelefona

        if korisnik.email != email:
            prijavljenKorisnik.email = email

        if korisnik.lozinka != lozinka:
            prijavljenKorisnik.lozinka = lozinka

    korisnik = Korisnik(ime, prezime, adresa, grad, drzava, brojTelefona, email, lozinka)
    izmeniKorisnikaUBazi(korisnik)

    app.logger.info(f"Email: {email}, Lozinka: {lozinka}")
    app.logger.info(f"Ime: {ime}, Prezime: {prezime}, Adresa: {adresa}, Grad: {grad}, Drzava: {drzava}, Broj Telefona: {brojTelefona}, Email: {email}, Lozinka: {lozinka}")

    response = {
        "message": "Izmena profila je uspešna!",
        "email": email,
        "lozinka": lozinka,
        "ime": ime,
        "prezime": prezime,
        "adresa": adresa,
        "grad": grad,
        "drzava": drzava,
        "brojTelefona": brojTelefona
    }

    return jsonify(response), 200

@app.route('/UzivoKupovina', methods=['GET'])
def get_data():

    proizvodi = procitajProizvodIzBaze()

    data = [
        {
            'slika': proizvod.slika,
            'nazivProizvoda': proizvod.naziv,
            'cena': proizvod.cena,
            'valuta': proizvod.valuta,
            'kupac' : 'marko@gmail.com'
        }
        for proizvod in proizvodi
    ]

    return jsonify(data)

@app.route('/', methods=['GET'])
def prikazProizvoda():

    proizvodi = procitajProizvodIzBaze()

    data = [
        {
            'naziv': proizvod.naziv,
            'cena': proizvod.cena,
            'valuta': proizvod.valuta,
            'kolicina': proizvod.kolicina,
            'slika': proizvod.slika,
        }
        for proizvod in proizvodi
    ]

    global prijavljenKorisnik
    korisnickiProizvodi = {}
    if prijavljenKorisnik is not None:
        korisnickiProizvodi = {
            'email': prijavljenKorisnik.email,
            'proizvodi': data
        }
    else:
        korisnickiProizvodi = {
            'email': '',
            'proizvodi': data
        }

    return jsonify(korisnickiProizvodi)

@app.route('/Profil', methods=['GET'])
def izmeniProfil():
    global prijavljenKorisnik

    data = {}

    if prijavljenKorisnik is not None:
        data = {
            "ime": prijavljenKorisnik.ime,
            "prezime": prijavljenKorisnik.prezime,
            "adresa": prijavljenKorisnik.adresa,
            "grad": prijavljenKorisnik.grad,
            "drzava": prijavljenKorisnik.drzava,
            "brojTelefona": prijavljenKorisnik.brojTelefona,
            "email": prijavljenKorisnik.email,
            "lozinka": prijavljenKorisnik.lozinka
        }

    return jsonify(data)


@app.route('/IstorijaProizvoda', methods=['GET'])
def kupljeno():

    p = Proizvod(
         naziv = 'Cherry', 
         cena = 590, 
         valuta = 'RSD',
         kolicina = 1, 
         slika = 'Proizvodi/cherry.jpg'
    )

    data = [
        {
            'slika': p.slika,
            'nazivProizvoda': p.naziv,
            'cena': p.cena,
            'valuta': p.valuta,
            'kolicina': p.kolicina,
            'vreme': datetime.now().strftime("%Y.%m.%d %H:%M:%S")
        }
    ]

    return jsonify(data)

@app.route('/KarticaKorisnika', methods=['POST'])
def dodajKarticu():

    brojKartice = request.json['brojKartice']
    datumIsteka = request.json['datumIsteka']
    cvv = request.json.get('cvv')

    kartica = Kartica(brojKartice=brojKartice, datumIsteka=datumIsteka, ccv=cvv, stanjeNaRacunu=0.0, valuta="RSD", odobrena="NE")
    dodajKarticuUBazu(kartica)

    app.logger.info(f"\nBroj kartice: {brojKartice}\nDatum isteka: {datumIsteka}\nCVV: {cvv}")

    response_data = {
        "message": "Podaci uspešno primljeni!",
        "brojKartice": brojKartice,
        "datumIsteka": datumIsteka,
        "cvv": cvv,
    }

    return jsonify(response_data), 200

@app.route('/Racun', methods=['GET'])
def prikaziRacun():

    data = {
        'brojKartice' : '1234567891234567',
        'datumIsteka': '04/24',
        'stanje': '100000.00',
        'valuta': 'RSD',
    }

    return jsonify(data)

if __name__ == "__main__":
    app.run(debug=True,port=5000)
