from EmailObaveštenje import slanje_emaila
from Proizvod import Proizvod
from Korisnik import Korisnik
from Kartica import *
from putanjaDoSlike import odrediPutanju
from datetime import datetime
from databaseFunctions import *
from config import *
from flask import redirect

# Proizvodi = [
#     Proizvod(
#         naziv = 'Plazma',
#         cena = 490,
#         valuta = 'RSD',
#         kolicina = 3,
#         slika = 'Proizvodi/plazma.jpg'
#     ),
#     Proizvod(
#         naziv = 'Nugat', 
#         cena = 520, 
#         valuta = 'RSD',
#         kolicina = 5, 
#         slika = 'Proizvodi/nugat.jpg'
#     ),
#     Proizvod(
#         naziv = 'Pistać Malina',
#         cena = 590,
#         valuta = 'RSD',
#         kolicina = 3,
#         slika = 'Proizvodi/pistacmalina.jpg'
#     ),
#     Proizvod(
#         naziv = 'Chocco',
#         cena = 550,
#         valuta = 'RSD',
#         kolicina = 8,
#         slika = 'Proizvodi/choco.jpg'
#     ),
#     Proizvod(
#         naziv = 'Cherry', 
#         cena = 590, 
#         valuta = 'RSD',
#         kolicina = 20, 
#         slika = 'Proizvodi/cherry.jpg'
#     ),
#      Proizvod(
#         naziv = 'Jagoda', 
#         cena = 600, 
#         valuta = 'RSD',
#         kolicina = 12, 
#         slika = 'Proizvodi/jagoda.jpg'
#     ),
#     Proizvod(
#         naziv = 'Monaliza', 
#         cena = 610, 
#         valuta = 'RSD',
#         kolicina = 2, 
#         slika = 'Proizvodi/monaliza.jpg'
#     ),
#      Proizvod(
#         naziv = 'Cheese Cake', 
#         cena = 510, 
#         valuta = 'RSD',
#         kolicina = 8, 
#         slika = 'Proizvodi/cake.jpg'
#     )
# ]

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

karticaAdmin = Kartica('9876543210987654', '17/27', '987', '0', 'USD', admin.email, "DA")

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
            "message": "Prijava nije uspešna. Uneli ste pogrešan email ili lozinku!"
        }
        return jsonify(response_data), 200

    elif korisnik is None and prijavljenKorisnik is None:
        response_data = {
            "message": "Prijava nije moguća. Korisnik nije registrovan!"
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

    app.logger.info(f"\nIme: {ime}\nPrezime: {prezime}\nAdresa: {adresa}\nGrad: {grad}\nDržava: {drzava}\nBroj Telefona: {brojTelefona}\nEmail: {email}\nLozinka: {lozinka}")
    
    title = "Novi korisnik je uspešno registrovan!"
    body = f"Podaci o korisniku:\nIme: {ime}\nPrezime: {prezime}\nAdresa: {adresa}\nGrad: {grad}\nDržava: {drzava}\nBroj Telefona: {brojTelefona}\nEmail: {email}\nLozinka: {lozinka}"
    na_email = "secernisanns@gmail.com"

    slanje_emaila(title, body, na_email)
    
    response_data = {
        "message": "Registracija je uspešna!",
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

@app.route('/Odjava', methods=['POST'])
def odjava():
    global prijavljenKorisnik
    prijavljenKorisnik = None

    return redirect('/'), 200

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

@app.route('/', methods=['GET'])
def prikaziProizvode():
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
    pocetnaProizvodi = {}

    if prijavljenKorisnik is not None:
        kartica = pronadjiKarticuVlasnika(prijavljenKorisnik.email)
        if kartica is not None:
            pocetnaProizvodi = {
                'email': prijavljenKorisnik.email,
                'proizvodi': response_data,
                'kartica': podaci_kartice(kartica)
        }
        else:
            pocetnaProizvodi = {
                'email': prijavljenKorisnik.email,
                'proizvodi': response_data,
                'kartica': ''
            }
    else:
        pocetnaProizvodi = {
            'email': '',
            'proizvodi': response_data,
            'kartica': ''
        }

    return jsonify(pocetnaProizvodi), 200

@app.route('/Kolicina', methods=['PUT'])
def izmeniKolicinu():
    naziv = request.json['naziv']
    cena = request.json['cena']
    valuta = request.json.get('valuta')
    kolicina = request.json['kolicina']
    slika = request.json['slika']

    proizvod = Proizvod(naziv, cena, valuta, kolicina, slika)
    izmeniProizvodUBazi(proizvod)

    response_data = {
        "message": "Izmena količine proizvoda je uspešna!",
        "naziv": naziv,
        "cena": cena,
        "valuta": valuta,
        "kolicina": kolicina,
    }

    return jsonify(response_data), 200

@app.route('/Kolicina', methods=['GET'])
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

@app.route('/UzivoKupovina', methods=['GET'])
def prikaziKupljeneProizvode():
    proizvodi = procitajProizvodIzBaze()
    kupovine = procitajKupovinuIzBaze()

    response_data = [
        {
            'slika': proizvod.slika,
            'proizvod': proizvod.naziv,
            'cena': proizvod.cena,
            'valuta': proizvod.valuta,
            'kupac': ', '.join([kupovina.kupac for kupovina in kupovine if kupovina.proizvod == proizvod.naziv] if [kupovina.kupac for kupovina in kupovine if kupovina.proizvod == proizvod.naziv] else []),
            'vreme': ', '.join([formatiraj_vreme(kupovina.datumKupovine) for kupovina in kupovine if kupovina.proizvod == proizvod.naziv] if [formatiraj_vreme(kupovina.datumKupovine) for kupovina in kupovine if kupovina.proizvod == proizvod.naziv] else [])  
        }
        for proizvod in proizvodi
    ]

    return jsonify(response_data), 200


@app.route('/Naruci', methods=['POST'])
def naruciProizvod():
    global kupovine

    nazivProizvoda = request.json['nazivProizvoda']
    cena = request.json['cena']
    cena = request.json['cena']
    valuta = request.json['valuta']
    kolicina = request.json['kolicina']
    zaradaAdmina = request.json['zaradaAdmina']

    kupovina = Kupovina(nazivProizvoda, prijavljenKorisnik.email, kolicina, cena, valuta, str(datetime.now()))
    kupovine.append(kupovina)

    proces_kupovine(kupovine)

    for kupovina in kupovine:
        proizvodIzmena = pronadjiProizvodPoNazivu(kupovina.proizvod)
        if proizvodIzmena is not None:
            proizvodIzmena.kolicina -= int(kupovina.kolicina)
            izmeniProizvodUBazi(proizvodIzmena)

        karticaKorisnika = pronadjiKarticuVlasnika(kupovina.kupac)
        if karticaKorisnika is not None:
            stanjeRacuna = float(karticaKorisnika.stanje)
            stanjeRacuna -= (float(kupovina.cena) * int(kupovina.kolicina))
            karticaKorisnika.stanje = str(stanjeRacuna)
            izmeniKarticuUBazi(karticaKorisnika)

        zarada = float(karticaAdmin.stanje)
        zarada += float(zaradaAdmina)
        karticaAdmin.stanje = str(zarada)
        izmeniKarticuUBazi(karticaAdmin)

    response_data = {
        'message': 'Proizvod je uspešno naručen!'
    }

    return jsonify(response_data), 200

@app.route('/IstorijaProizvoda', methods=['GET'])
def prikaziIstorijuKupovineProizvoda():
    kupovine = pronadjiKupovinePoKupcu(prijavljenKorisnik.email)
    kupovine.reverse()
    kupljeni_proizvodi = {}

    for k in kupovine:
        if k.kupac == prijavljenKorisnik.email:
            proizvod = pronadjiProizvodPoNazivu(k.proizvod)
            if k.proizvod == proizvod.naziv:
                kupljeni_proizvod = Proizvod(k.proizvod, proizvod.cena, proizvod.valuta, k.kolicina, proizvod.slika)
                kupljeni_proizvodi[kupljeni_proizvod] = k.datumKupovine

    response_data = [
        {
            'slika': p.slika,
            'proizvod': p.naziv,
            'cena': p.cena,
            'valuta': p.valuta,
            'kolicina': p.kolicina,
            'vreme': formatiraj_vreme(kupljeni_proizvodi[p])
        }
        for p in kupljeni_proizvodi
    ]

    return jsonify(response_data), 200

def formatiraj_vreme(vreme_str):
    datum_i_vreme = datetime.strptime(vreme_str, '%Y-%m-%d %H:%M:%S.%f')
    formatirano_vreme = datum_i_vreme.strftime('%d.%m.%Y. %H:%M:%S')
    return formatirano_vreme

@app.route('/KarticaKorisnika', methods=['POST'])
def dodajKarticu():
    brojKartice = request.json['brojKartice']
    datumIsteka = request.json['datumIsteka']
    cvv = request.json['cvv']

    kartica = Kartica(brojKartice=brojKartice, datumIsteka=datumIsteka, cvv=cvv, stanje=0.0, valuta="USD", vlasnik=prijavljenKorisnik.email, odobrena="NE")
    dodajKarticuUBazu(kartica)

    app.logger.info(f"\nBroj kartice: {brojKartice}\nDatum isteka: {datumIsteka}\nCVV: {cvv}")

    response_data = {
        "message": "Kartica uspešno dodata!",
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
            'stanje': kartica.stanje,
            'valuta': kartica.valuta
        }
        return jsonify(response_data), 200
    else:
        response_data = {
            'brojKartice': '',
            'datumIsteka': '',
            'stanje': '',
            'valuta': ''
        }
        return jsonify(response_data), 200
    
@app.route('/AdminRacun', methods=['GET'])
def prikaziAdminRacun():
    kartica = None

    if prijavljenKorisnik is not None:
        kartica = pronadjiKarticuVlasnika(prijavljenKorisnik.email)

    if kartica is not None and kartica.odobrena == 'DA':
        response_data = {
            'brojKartice': kartica.brojKartice,
            'datumIsteka': kartica.datumIsteka,
            'stanje': kartica.stanje,
            'valuta': kartica.valuta
        }
        return jsonify(response_data), 200
    else:
        response_data = {
            'brojKartice': '',
            'datumIsteka': '',
            'stanje': '',
            'valuta': ''
        }
        return jsonify(response_data), 200

@app.route('/Verifikacija', methods=['PUT'])
def verifikujKarticu():
    email = request.json['email']
    brojKartice = request.json['brojKartice']
    odobrena = request.json['odobrena']

    kartica = pronadjiKarticuSaBrojemKartice(brojKartice)
    kartica.odobrena = odobrena
    izmeniKarticuUBazi(kartica)

    response_data = {
        "message" : "Verifikacija uspešna!"
    }

    return jsonify(response_data), 200

@app.route('/Verifikacija', methods=['GET'])
def verifikacijaKartica():
    kartice = procitajKarticuIzBaze()
    ucitane_kartice = [podaci_kartice(
        kartica) for kartica in kartice]
    lista_kartica = []

    for k in ucitane_kartice:
        if k['vlasnik'] != "secernisanns@gmail.com" and k['odobrena'] != 'DA':
            lista_kartica.append(k)

    response_data = {
        'kartice': lista_kartica
    }

    return jsonify(response_data), 200

@app.route('/Konverzija', methods=['PUT'])
def konvertujValutu():
    email = request.json['email']
    brojKartice = request.json['brojKartice']
    stanje = request.json['stanje']
    valuta = request.json['valuta']

    kartica = pronadjiKarticuSaBrojemKartice(brojKartice)
    kartica.stanje = stanje
    kartica.valuta = valuta

    izmeniKarticuUBazi(kartica)

    response_data = {
        'message': 'Konverzija je uspešna!'
    }

    return jsonify(response_data), 200

@app.route('/Uplata', methods=['PUT'])
def uplatiNaRacun():
    email = request.json['email']
    brojKartice = request.json['brojKartice']
    iznos = request.json['iznos']
    valuta = request.json['valuta']

    kartica = pronadjiKarticuSaBrojemKartice(brojKartice)

    if valuta == '':
        valuta = kartica.valuta

    if proveraValute(kartica, valuta):
        uplata = float(iznos)
        kartica.stanje += uplata
        izmeniKarticuUBazi(kartica)
    else:
        print("Valute se ne poklapaju!")

    response_data = {
        'message': 'Uplata na karticu je uspešna!'
    }

    return jsonify(response_data), 200

@app.route('/UplataIKonverzija', methods=['GET'])
def prikazUplateIKonverzije():
    kartica = None

    if (prijavljenKorisnik != None):
        kartica = pronadjiKarticuVlasnika(prijavljenKorisnik.email)

    if (kartica != None):
        response_data = {
            'kartica': podaci_kartice(kartica)
        }
        return jsonify(response_data), 200
    else:
        response_data = {
            'kartica': ''
        }
        return jsonify(response_data), 200


if __name__ == "__main__":
    app.run(debug=True, port=5000)
