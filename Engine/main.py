from flask import Flask, request, jsonify
from flask_cors import CORS
from EmailObaveštenje import slanje_emaila
from Proizvod import Proizvod
from Korisnik import Korisnik
from putanjaDoSlike import odrediPutanju
from datetime import datetime

app = Flask(__name__)

CORS(app, supports_credentials=True)

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

Korisnici = [
    Korisnik(
        ime= 'admin',
        prezime= 'admin',
        adresa= 'Balzakova 65',
        grad= 'Subotica',
        drzava= 'Srbija',
        brojTelefona= '024567876',
        email= 'secernisanns@gmail.com',
        lozinka= 'secernisan1234!'
    ),
    Korisnik(
        ime= 'Marko',
        prezime= 'Markovic',
        adresa= 'Strazilovska 11',
        grad= 'Novi Sad',
        drzava= 'Srbija',
        brojTelefona= '0658947561',
        email= 'marko.markovic@gmail.com',
        lozinka= 'marko1234'
    )
]

prijavljenKorisnik = None

@app.route('/Prijava', methods=['POST'])
def prijava():
    
    email = request.json['email']
    lozinka = request.json['lozinka']

    global prijavljenKorisnik

    for korisnik in Korisnici:
        if korisnik.email == email:
            prijavljenKorisnik = korisnik
            break
    
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

    Proizvodi.append(Proizvod(naziv, cena, valuta, kolicina, slika))
    
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

    for korisnik in Korisnici:
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
    data = [
        {
            'slika': proizvod.slika,
            'nazivProizvoda': proizvod.naziv,
            'cena': proizvod.cena,
            'valuta': proizvod.valuta,
            'kupac' : 'marko.markovic@gmail.com'
        }
        for proizvod in Proizvodi
    ]
    return jsonify(data)

@app.route('/', methods=['GET'])
def prikazProizvoda():
    data = [
        {
            'naziv': proizvod.naziv,
            'cena': proizvod.cena,
            'valuta': proizvod.valuta,
            'kolicina': proizvod.kolicina,
            'slika': proizvod.slika,
        }
        for proizvod in Proizvodi
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

    cardNum = request.json['cardNum']
    dateExp = request.json['dateExp']
    cvv = request.json.get('cvv')

    app.logger.info(f"\nBroj kartice: {cardNum}\nDatum isteka: {dateExp}\nCVV: {cvv}")

    response_data = {
        "message": "Podaci uspesno primljeni",
        "cardNum": cardNum,
        "dateExp": dateExp,
        "cvv": cvv,
    }

    return jsonify(response_data), 200

if __name__ == "__main__":
    app.run(debug=True,port=5000)
