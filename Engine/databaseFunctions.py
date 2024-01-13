from EmailObaveštenje import slanje_emaila
from Kupovina import Kupovina
from Korisnik import Korisnik
from Proizvod import Proizvod
from Kartica import Kartica
from config import db, app
import threading
import time

def dodajKorisnikaUBazu(noviKorisnik):
    with app.app_context():
        korisnik = Korisnik.query.filter_by(email=noviKorisnik.email).first()
        if korisnik is None:
            db.session.add(noviKorisnik)
            db.session.commit()
        else:
            print(f"Korisnik sa email-om {noviKorisnik.email} već postoji u bazi podataka!")

def procitajKorisnikaIzBaze():
    with app.app_context():
        korisnici = Korisnik.query.all()
        return korisnici
    
def pronadjiKorisnikaPoEmailu(email):
    with app.app_context():
        korisnik = Korisnik.query.filter_by(email=email).first()
        
        if korisnik is not None:
            return korisnik
        else:
            print(f"Korisnik sa email-om {email} ne postoji u bazi podataka!")
            return None

def autentifikacijaKorisnika(email, lozinka):
    with app.app_context():
        korisnik = Korisnik.query.filter_by(email=email, lozinka=lozinka).first()
        if korisnik is not None:
            return korisnik
        else:
            print(f"Korisnik sa email-om {email} i lozinkom {lozinka} ne postoji u bazi podataka!")
            return None

def izmeniKorisnikaUBazi(postojeciKorisnik):
    with app.app_context():
        korisnik = Korisnik.query.filter_by(email=postojeciKorisnik.email).first()
        if korisnik is not None:
            korisnik.ime = postojeciKorisnik.ime
            korisnik.prezime = postojeciKorisnik.prezime
            korisnik.adresa = postojeciKorisnik.adresa
            korisnik.grad = postojeciKorisnik.grad
            korisnik.drzava = postojeciKorisnik.drzava
            korisnik.brojTelefona = postojeciKorisnik.brojTelefona
            korisnik.email = postojeciKorisnik.email
            korisnik.lozinka = postojeciKorisnik.lozinka
            db.session.commit()
        else:
            print(f"Korisnik sa email-om {postojeciKorisnik.email} ne postoji u bazi podataka!")
    
def dodajProizvodUBazu(noviProizvod):
    with app.app_context():
        proizvod = Proizvod.query.filter_by(naziv=noviProizvod.naziv).first()
        if proizvod is None:
            db.session.add(noviProizvod)
            db.session.commit()
        else:
            print(f"Proizvod sa nazivom {noviProizvod.naziv} već postoji u bazi podataka!")

def procitajProizvodIzBaze():
    with app.app_context():
        proizvodi = Proizvod.query.all()
        return proizvodi
    
def pronadjiProizvodPoNazivu(naziv):
    with app.app_context():
        proizvod = Proizvod.query.filter_by(naziv=naziv).first()
        if proizvod is not None:
            return proizvod
        else:
            return None
    
def izmeniProizvodUBazi(postojeciProizvod):
    with app.app_context():
        proizvod = Proizvod.query.filter_by(naziv=postojeciProizvod.naziv).first()
        if proizvod is not None:
            proizvod.naziv = postojeciProizvod.naziv
            proizvod.cena = postojeciProizvod.cena
            proizvod.valuta = postojeciProizvod.valuta
            proizvod.kolicina = postojeciProizvod.kolicina
            proizvod.slika = postojeciProizvod.slika
            db.session.commit()
        else:
            print(f"Proizvod sa nazivom {postojeciProizvod.naziv} već postoji u bazi podataka!")

def dodajKarticuUBazu(novaKartica):
    with app.app_context():
        kartica = Kartica.query.filter_by(brojKartice=novaKartica.brojKartice).first()
        if kartica is None:
            db.session.add(novaKartica)
            db.session.commit()
        else:
            print(f"Kartica sa brojem {novaKartica.brojKartice} već postoji u bazi podataka!")

def procitajKarticuIzBaze():
    with app.app_context():
        kartica = Kartica.query.all()
        return kartica

def izmeniKarticuUBazi(postojecaKartica):
    with app.app_context():
        kartica = Kartica.query.filter_by(brojKartice=postojecaKartica.brojKartice).first()
        if kartica is not None:
            kartica.datumIsteka = postojecaKartica.datumIsteka
            kartica.cvv = postojecaKartica.cvv
            kartica.stanje = postojecaKartica.stanje
            kartica.valuta = postojecaKartica.valuta
            kartica.odobrena = postojecaKartica.odobrena
            kartica.vlasnik = postojecaKartica.vlasnik
            db.session.commit()
        else:
            print(f"Kartica sa brojem kartice {postojecaKartica.brojKartice} ne postoji u podataka!")

def pronadjiKarticuSaBrojemKartice(broj_kartice):
    with app.app_context():
        kartica = Kartica.query.filter_by(brojKartice=broj_kartice).first()
        if kartica is not None:
            return kartica
        else:
            print(f"Kartica sa brojem {kartica.brojKartice} ne postoji u bazi podataka!")
            return None

def pronadjiKarticuVlasnika(vlasnik):
    with app.app_context():
        kartica = Kartica.query.filter_by(vlasnik=vlasnik).first()
        if kartica is not None:
            return kartica
        else:
            print(f"Kartica čiji je vlasnik {vlasnik} ne postoji u bazi podataka!")
            return None

def dodajKupovinu(novaKupovina):
    with app.app_context():
        db.session.add(novaKupovina)
        db.session.commit()

def procitajKupovinuIzBaze():
    with app.app_context():
        kupovine = Kupovina.query.all()
        return kupovine

def pronadjiKupovinePoKupcu(kupac):
    with app.app_context():
        kupovine = Kupovina.query.filter_by(kupac=kupac).all()
        return kupovine

def kupljeniProizvodiInfo(kupovine):
    time.sleep(60)
    body = ""
    with app.app_context():
        for kupovina in kupovine:
            db.session.add(kupovina)
            if len(kupovine) > 0:
                body += f"Kupovina:\nProizvod: {kupovina.proizvod}\nKupac: {kupovina.kupac}\nKoličina: {kupovina.kolicina}\nCena: {kupovina.cena}\nDatum kupovine: {kupovina.datumKupovine}\nUkupan iznos: {float(kupovina.cena) * int(kupovina.kolicina)}\nValuta: {kupovina.valuta}\n"
        db.session.commit()

    if body != "":
        title = "Proizvod sa stranice je kupljen!"
        na_email = "secernisanns@gmail.com"
        slanje_emaila(title, body, na_email)

    kupovine.clear()

def proces_kupovine(kupovine):
    proces = threading.Thread(target=kupljeniProizvodiInfo, args=(kupovine,))
    proces.start()