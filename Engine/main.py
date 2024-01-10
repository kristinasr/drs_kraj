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

kupovine = []
prijavljenKorisnik = None

@app.route('/Prijava', methods=['POST'])
def prijava():
    
    email = request.json['email']
    lozinka = request.json['lozinka']

    global prijavljenKorisnik

    prijavljenKorisnik = pronadjiKorisnikaPoEmailu(email)
    korisnik = autentifikacijaKorisnika(email, lozinka)
    
    app.logger.info(f"\nEmail: {email}\nLozinka: {lozinka}")

    if prijavljenKorisnik is not None and korisnik is not None:
        response_data = {
            "message": "Prijava je uspešna!"
        }
        return jsonify(response_data), 200

    if prijavljenKorisnik is not None and korisnik is None:
        response_data = {
            "message": "Prijava nije uspešna. Uneli ste pogresan email ili lozinku!"
        }
        return jsonify(response_data), 200

    elif korisnik is None and prijavljenKorisnik is None:
        response_data = {
            "message": "Prijava nije moguca. Korisnik nije registrovan!"
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

    novi_korisnik = Korisnik(ime, prezime, adresa, grad, drzava, brojTelefona, email, lozinka)
    dodajKorisnikaUBazu(novi_korisnik)

    app.logger.info(f"\nIme: {ime}\nPrezime: {prezime}\nAdresa: {adresa}\nGrad: {grad}\nDrzava: {drzava}\nBroj Telefona: {brojTelefona}\nEmail: {email}\nLozinka: {lozinka}")
    
    title = "Novi korisnik je uspešno registrovan!"
    body = f"Podaci o korisniku:\nIme: {ime}\nPrezime: {prezime}\nAdresa: {adresa}\nGrad: {grad}\nDrzava: {drzava}\nBroj Telefona: {brojTelefona}\nEmail: {email}\nLozinka: {lozinka}"
    na_email = "secernisanns@gmail.com"

    slanje_emaila(title, body, na_email)
    
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

    novi_proizvod = Proizvod(naziv, cena, valuta, kolicina, slika)
    dodajProizvodUBazu(novi_proizvod)

    app.logger.info(f"\nNaziv proivoda: {naziv}\nCena: {cena}\nValuta: {valuta}\nKolicina: {kolicina}\nSlika: {slika}")

    response_data = {
        "message": "Uspešno dodat proizvod!",
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

    response_data = {
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

    return jsonify(response_data), 200

@app.route('/Profil', methods=['GET'])
def izmeniProfil():
    global prijavljenKorisnik

    response_data = {}

    if prijavljenKorisnik is not None:
        response_data = {
            "ime": prijavljenKorisnik.ime,
            "prezime": prijavljenKorisnik.prezime,
            "adresa": prijavljenKorisnik.adresa,
            "grad": prijavljenKorisnik.grad,
            "drzava": prijavljenKorisnik.drzava,
            "brojTelefona": prijavljenKorisnik.brojTelefona,
            "email": prijavljenKorisnik.email,
            "lozinka": prijavljenKorisnik.lozinka
        }

    return jsonify(response_data)

@app.route('/', methods=['GET'])
def prikazProizvoda():

    proizvodi = procitajProizvodIzBaze()

    response_data = [
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
        kartica = pronadjiKarticuVlasnika(prijavljenKorisnik.email)
        if kartica is not None:
            korisnickiProizvodi = {
                'email': prijavljenKorisnik.email,
                'proizvodi': response_data,
                'kartica': serijalizacija_kartice(kartica)
        }
        else:
            korisnickiProizvodi = {
                'email': prijavljenKorisnik.email,
                'proizvodi': response_data,
                'kartica': ''
            }
    else:
        korisnickiProizvodi = {
            'email': '',
            'proizvodi': response_data,
            'kartica': ''
        }

    return jsonify(korisnickiProizvodi), 200

@app.route('/UzivoKupovina', methods=['GET'])
def uzivoKupovina():

    proizvodi = procitajProizvodIzBaze()
    kupovine = procitajKupovinuIzBaze()

    response_data = [
        {
            'nazivProizvoda': proizvod.naziv,
            'cena': proizvod.cena,
            'valuta': proizvod.valuta,
            'kupac': next((kupovina.kupac for kupovina in kupovine if kupovina.proizvod == proizvod.naziv), ''),
            'vreme': next((kupovina.datumKupovine for kupovina in kupovine if kupovina.proizvod == proizvod.naziv), '')
        }
        for proizvod in proizvodi
    ]

    return jsonify(response_data)

@app.route('/IstorijaProizvoda', methods=['GET'])
def kupljeno():

    kupovine = pronadjiKupovinePoKupcu(prijavljenKorisnik.email)
    kupovine.reverse()
    kupljeni_proizvodi = {}

    for k in kupovine:
        if k.kupac == prijavljenKorisnik.email:
            proizvod = pronadjiProizvodPoNazivu(k.proizvod)
            if k.proizvod == proizvod.naziv:
                kupljen_proizvod = Proizvod(k.proizvod, proizvod.cena, proizvod.valuta, k.kolicina, proizvod.slika)
                kupljeni_proizvodi[kupljen_proizvod] = k.datumKupovine

    response_data = [
        {
            'slika': p.slika,
            'nazivProizvoda': p.naziv,
            'cena': p.cena,
            'valuta': p.valuta,
            'kolicina': p.kolicina,
            'vreme': datetime.now().strftime("%Y.%m.%d %H:%M:%S")
        }
        for p in kupljeni_proizvodi
    ]

    return jsonify(response_data)

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
     
    kartica = None
    if prijavljenKorisnik is not None:
        kartica = pronadjiKarticuVlasnika(prijavljenKorisnik.email)

    if kartica is not None and kartica.odobrena == 'DA':
        response_data = {
            'brojKartice': kartica.brojKartice,
            'datumIsteka': kartica.datumIsteka,
            'stanje': kartica.stanjeNaRacunu,
            'valuta': kartica.valuta
        }
        return jsonify(response_data)
    else:
        response_data = {
            'brojKartice': '',
            'datumIsteka': '',
            'stanje': '',
            'valuta': ''
        }
    return jsonify(response_data), 200

@app.route('/IzmenaKolicine', methods=['PUT'])
def izmeniKolicinu():

    naziv = request.json['naziv']
    cena = request.json['cena']
    valuta = request.json.get('valuta')
    kolicina = request.json['kolicina']
    slika = request.json['slika']

    proizvod = Proizvod(naziv, cena, valuta, kolicina, slika)
    izmeniProizvodUBazi(proizvod)

    response_data = {
        "message": "Podaci uspesno primljeni",
        "naziv": naziv,
        "cena": cena,
        "valuta": valuta,
        "kolicina": kolicina,
    }

    return jsonify(response_data), 200

@app.route('/IzmenaKolicine', methods=['GET'])
def izmenaKolicine():

    proizvodi = procitajProizvodIzBaze()

    response_data = [
        {
            'naziv': proizvod.naziv,
            'cena': proizvod.cena,
            'valuta': proizvod.valuta,
            'kolicina': proizvod.kolicina,
            'slika': proizvod.slika,
        }
        for proizvod in proizvodi
    ]

    return jsonify(response_data), 200

@app.route('/Verifikacija', methods=['GET'])
def verifikujKarticu():

    kartice = procitajKarticuIzBaze()
    serijalizovane_kartice = [serijalizacija_kartice(kartica) for kartica in kartice]
    posalji_kartice = []

    for k in serijalizovane_kartice:
        if k['vlasnik'] != "secernisanns@gmail.com" and k['odobrena'] != 'DA':
            posalji_kartice.append(k)

    response_data = {
        'kartice': posalji_kartice
    }

    return jsonify(response_data), 200

@app.route('/Konverzija', methods=['PUT'])
def konverzija():

    email = request.json['email']
    brojKartice = request.json['brojKartice']
    stanje = request.json['stanje']
    valuta = request.json['valuta']

    kartica = pronadjiKarticuSaBrojemKartice(brojKartice)
    kartica.stanjeNaRacunu = stanje
    kartica.valuta = valuta

    izmeniKarticuUBazi(kartica)

    response_data = {
        'massage': 'Podaci uspešno primljeni'
    }

    return jsonify(response_data), 200

@app.route('/Uplata', methods=['PUT'])
def uplata():
    email = request.json['email']
    brojKartice = request.json['brojKartice']
    iznos = request.json['iznos']
    valuta = request.json['valuta']

    kartica = pronadjiKarticuSaBrojemKartice(brojKartice)

    if valuta == '':
        valuta = kartica.valuta

    if proveraValuta(kartica, valuta):
        konvertovanIznos = float(iznos)
        kartica.stanje += konvertovanIznos
        izmeniKarticuUBazi(kartica)
    else:
        print("Valute se ne poklapaju!")

    response_data = {
        'message': 'Podaci su uspešno primljeni!'
    }

    return jsonify(response_data), 200

@app.route('/Naruci', methods=['POST'])
def naruciProizvod():
    global kupovine

    nazivProizvoda = request.json['nazivProizvoda']
    cena = request.json['cena']
    cena = request.json['cena']
    valuta = request.json['valuta']
    kolicina = request.json['kolicina']
    zarada = request.json['zarada']

    kupovina = Kupovina(nazivProizvoda, prijavljenKorisnik.email, kolicina, cena, valuta, str(datetime.now()))
    kupovine.append(kupovina)

    pokreni_proces(kupovine)

    for kupovina in kupovine:
        proizvod = pronadjiProizvodPoNazivu(kupovina.proizvod)
        if proizvod is not None:
            proizvod.kolicina -= int(kupovina.kolicina)
            izmeniProizvodUBazi(proizvod)

        kartica = pronadjiKarticuVlasnika(kupovina.kupac)
        if kartica is not None:
            stanje = float(kartica.stanje)
            stanje -= (float(kupovina.cenaKupovine) * int(kupovina.kolicina))
            kartica.stanjeNaRacunu = str(stanje)
            izmeniKarticuUBazi(kartica)

        zarada = float(karticaAdmin.stanje)
        zarada += float(zarada)
        karticaAdmin.stanje = str(zarada)
        izmeniKarticuUBazi(karticaAdmin)

    response_data = {
        'message': 'Podaci uspešno primljeni'
    }

    return jsonify(response_data), 200

@app.route('/UplataKonverzija', methods=['GET'])
def uplataiKonverzija():
    kartica = None

    if (prijavljenKorisnik != None):
        kartica = pronadjiKarticuVlasnika(prijavljenKorisnik.email)

    if (kartica != None):
        response_data = {
            'kartica': serijalizacija_kartice(kartica)
        }
        return jsonify(response_data)
    else:
        response_data = {
            'kartica': ''
        }
        return jsonify(response_data), 200


if __name__ == "__main__":
    app.run(debug=True,port=5000)
