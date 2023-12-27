from Korisnik import Korisnik
from Proizvod import Proizvod
from Kartica import Kartica
from config import db, app

def dodajKorisnikaUBazu(noviKorisnik):
    with app.app_context():
        postojeciKorisnik = Korisnik.query.filter_by(email=noviKorisnik.email).first()
        if postojeciKorisnik is None:
            db.session.add(noviKorisnik)
            db.session.commit()
        else:
            print(f"Korisnik sa email {noviKorisnik.email} već postoji u bazi!")

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
            print(f"Korisnik sa email {email} ne postoji u bazi!")
    
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
            print(f"Korisnik sa email {postojeciKorisnik.email} ne postoji u bazi!")
    
def dodajProizvodUBazu(noviProizvod):
    with app.app_context():
        postojeciProizvod = Proizvod.query.filter_by(naziv=noviProizvod.naziv).first()
        if postojeciProizvod is None:
            db.session.add(noviProizvod)
            db.session.commit()
        else:
            print(f"Proizvod sa nazivom {noviProizvod.naziv} već postoji u bazi!")

def procitajProizvodIzBaze():
    with app.app_context():
        proizvodi = Proizvod.query.all()
        return proizvodi
    
def dodajKarticuUBazu(novaKartica):
    with app.app_context():
        kartica = Kartica.query.filter_by(brojKartice=novaKartica.brojKartice).first()
        if kartica is None:
            db.session.add(novaKartica)
            db.session.commit()
        else:
            print(f"Kartica sa brojem {novaKartica.brojKartice} već postoji u bazi!")

def procitajKarticuIzBaze():
    with app.app_context():
        kartica = Kartica.query.all()
        return kartica