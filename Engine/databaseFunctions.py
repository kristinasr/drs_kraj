import threading
import time
from Engine.EmailObaveštenje import slanje_emaila
from Engine.Kupovina import Kupovina
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

def autentifikacijaKorisnika(email, lozinka):
    with app.app_context():
        korisnik = Korisnik.query.filter_by(email=email, lozinka=lozinka).first()

        if korisnik is not None:
            return korisnik
        else:
            print(f"Korisnik sa email {email} i lozinkom {lozinka} ne postoji u bazi!")
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
    
def pronadjiProizvodPoNazivu(naziv):
    with app.app_context():
        proizvod = Proizvod.query.filter_by(naziv=naziv).first()

        if proizvod is not None:
            return proizvod
        else:
            return None
    

def izmeniProizvodUBazi(postojeci_proizvod):
    with app.app_context():
        proizvod = Proizvod.query.filter_by(naziv=postojeci_proizvod.naziv).first()

        if proizvod is not None:
            proizvod.naziv = postojeci_proizvod.naziv
            proizvod.cena = postojeci_proizvod.cena
            proizvod.valuta = postojeci_proizvod.valuta
            proizvod.kolicina = postojeci_proizvod.kolicina
            proizvod.slika = postojeci_proizvod.slika
            db.session.commit()
        else:
            print(f"Proizvod sa nazivom {postojeci_proizvod.naziv} već postoji u bazi !")

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

def IzmeniKarticeUBazi(postojeca_kartica):
    with app.app_context():
        kartica = Kartica.query.filter_by(brojKartice=postojeca_kartica.brojKartice).first()

        if kartica is not None:
            kartica.datumIsteka = postojeca_kartica.datumIsteka
            kartica.ccv = postojeca_kartica.ccv
            kartica.stanjeNaRacunu = postojeca_kartica.stanjeNaRacunu
            kartica.valuta = postojeca_kartica.valuta
            kartica.odobrena = postojeca_kartica.odobrena
            kartica.vlasnik = postojeca_kartica.vlasnik
            db.session.commit()
        else:
            print(f"Kartica sa brojem kartice {postojeca_kartica.brojKartice} ne postoji u bazi!")

def pronadjiKarticuSaBrojemKartice(broj_kartice):
    with app.app_context():
        kartica = Kartica.query.filter_by(brojKartice=broj_kartice).first()

        if kartica is not None:
            return kartica
        else:
            print(f"Kartica sa brojem {kartica.brojKartice} ne postoji u bazi !")
            return None



def pronadjiKarticuVlasnika(vlasnik):
    with app.app_context():
        kartica = Kartica.query.filter_by(vlasnik=vlasnik).first()

        if kartica is not None:
            return kartica
        else:
            print(f"Kartica sa vlasnikom {vlasnik} ne postoji u bazi !")
            return None

def dodajKupovinu(nova_kupovina):
    with app.app_context():
        db.session.add(nova_kupovina)
        db.session.commit()

def procitajKupovinuIzBaze():
    with app.app_context():
        kupovine = Kupovina.query.all()
        return kupovine

def pronadjiKupovinePoKupcu(kupac):
    with app.app_context():
        kupovine_kupca = Kupovina.query.filter_by(kupac=kupac).all()
        return kupovine_kupca

def dodajKupovineUListu(kupovine):
    time.sleep(60)
    telo = ""
    with app.app_context():
        for kupovina in kupovine:
            db.session.add(kupovina)
            if len(kupovine) > 0:
                telo += f"Podaci o kupovinama:\nNaziv proizvoda: {kupovina.proizvod}\nKupac: {kupovina.kupac}\nNaručena količina: {kupovina.kolicina}\nCena jednog proizvoda: {kupovina.cenaKupovine}\nDatum kupovine: {kupovina.datumKupovine}\nUkupan iznos: {float(kupovina.cenaKupovine) * int(kupovina.kolicina)}\nValuta: {kupovina.valuta}\n"

        db.session.commit()

    if telo != "":
        naslov = "Kupljen je proivod na stranici"
        kome = "drsprojekat2023@gmail.com"
        slanje_emaila(naslov, telo, kome)

    kupovine.clear()

# Funkcija za pokretanje niti za obradu kupovina
def pokreni_proces(kupovine):
    proces = threading.Thread(target=dodajKupovineUListu, args=(kupovine,))
    proces.start()