from flask import Flask, request, jsonify
from flask_cors import CORS
from EmailObaveštenje import slanje_emaila
from Proizvod import Proizvod
from Korisnik import Korisnik
import os

app = Flask(__name__)

CORS(app, supports_credentials=True)

def odrediPutanju(putanjaDoFajla):
    nazivFajla = os.path.basename(putanjaDoFajla)
    novaPutanja = f"Proizvodi/{nazivFajla}"
    return novaPutanja

proizvodi = [
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
    )
]

prijavljen = None

@app.route('/Prijava', methods=['POST'])
def prijava():
    
    email = request.json['email']
    lozinka = request.json['lozinka']
    global prijavljen

    for korisnik in Korisnici:
        if korisnik.email == email:
            prijavljen = korisnik
            break
    
    app.logger.info(f"\nEmail: {email}\nLozinka: {lozinka}")

   
    response_data = {
        "message": "Uspešno primljeni podaci!",
        "email": email,
        "lozinka": lozinka
    }

    
    return jsonify(response_data), 200


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

    
    app.logger.info(f"\nIme: {ime}\nPrezime: {prezime}\nAdresa: {adresa}\nGrad: {grad}\nDržava: {drzava}\nBroj: {brojTelefona}\nEmail: {email}\nLozinka: {lozinka}")
    
    predmet = "Uspešno je registrovan novi korisnik!"
    telo = f"Korisnicki podaci:\nIme: {ime}\nPrezime: {prezime}\nAdresa: {adresa}\nGrad: {grad}\nDržava: {drzava}\nBroj: {brojTelefona}\nEmail: {email}\nLozinka: {lozinka}"
    to_email = "secernisanns@gmail.com"

    slanje_emaila(predmet, telo, to_email)
    
    response_data = {
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

    
    return jsonify(response_data), 200


@app.route('/Proizvod', methods=['POST'])
def dodajProizvod():

    naziv = request.json['naziv']
    cena = request.json['cena']
    valuta = request.json.get('valuta')
    kolicina = request.json['kolicina']
    slika = request.json['slika']

    slika = odrediPutanju(slika)

    proizvodi.append(Proizvod(naziv, cena, valuta, kolicina, slika))
    
    app.logger.info(f"\nNaziv: {naziv}\ncena: {cena}\nvaluta: {valuta}\nkolicina {kolicina}\nslika {slika}")

    
    response_data = {
        "message": "Podaci uspešno primljeni",
        "naziv": naziv,
        "cena": cena,
        "valuta": valuta,
        "kolicina": kolicina,
    }

    
    return jsonify(response_data), 200


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
    global prijavljen

    for korisnik in Korisnici:
        if korisnik.ime != ime:
            prijavljen.ime = ime

        if korisnik.prezime != prezime:
            prijavljen.prezime = prezime

        if korisnik.adresa != adresa:
            prijavljen.adresa = adresa

        if korisnik.grad != grad:
            prijavljen.grad = grad

        if korisnik.drzava != drzava:
            prijavljen.drzava = drzava

        if korisnik.brojTelefona != brojTelefona:
            prijavljen.brojTelefona = brojTelefona

        if korisnik.email != email:
            prijavljen.email = email

        if korisnik.lozinka != lozinka:
            prijavljen.lozinka = lozinka

    app.logger.info(f"Email: {email}, Password: {lozinka}")

    app.logger.info(f"Ime: {ime}, Prezime: {prezime}, Adresa: {adresa}, Grad: {grad}, Drzava: {drzava}, Broj: {brojTelefona}, Email: {email}, Lozinka: {lozinka}")

    response_data = {
        "message": "Podaci uspešno primljeni",
        "email": email,
        "lozinka": lozinka,
        "ime": ime,
        "prezime": prezime,
        "adresa": adresa,
        "grad": grad,
        "drzava": drzava,
        "brojTelefona": brojTelefona
    }

    return jsonify(response_data), 200


@app.route('/Uzivo', methods=['GET'])
def get_data():
    data = [
        {
            'naziv': proizvod.naziv,
            'cena': proizvod.cena,
            'valuta': proizvod.valuta,
        }
        for proizvod in proizvodi
    ]
    return jsonify(data)


@app.route('/', methods=['GET'])
def posaljiProizvod():
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

    return jsonify(data)


@app.route('/Profil', methods=['GET'])
def izmeniProfil():
    global prijavljen

    data = {}

    if prijavljen is not None:
        data = {
            "ime": prijavljen.ime,
            "prezime": prijavljen.prezime,
            "adresa": prijavljen.adresa,
            "grad": prijavljen.grad,
            "drzava": prijavljen.drzava,
            "brojTelefona": prijavljen.brojTelefona,
            "email": prijavljen.email,
            "lozinka": prijavljen.lozinka
        }

    return jsonify(data)

# Main
if __name__ == "__main__":
    app.run(debug=True,port=5000)
