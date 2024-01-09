create database online_kupovina;

use online_kupovina;

create table korisnik
(
    id INT PRIMARY KEY not null AUTO_INCREMENT,
    ime varchar(45) not null,
    prezime varchar(45) not null,
    adresa varchar(45) not null,
    grad varchar(45) not null,
    drzava varchar(45) not null,
    brojTelefona varchar(45) not null,
    email varchar(45) not null UNIQUE,
    lozinka varchar(45) not null
);

create table proizvod
(
    id INT PRIMARY KEY not null AUTO_INCREMENT,
    naziv varchar(45) not null UNIQUE,
    cena float not null,
    valuta varchar(45) not null,
    kolicina int not null,
    slika varchar(45) not null
);

create table kartica
(
    id INT PRIMARY KEY not null AUTO_INCREMENT,
    brojKartice varchar(16) not null UNIQUE,
    datumIsteka varchar(5) not null,
    cvv varchar(3) not null,
    stanje float not null,
    valuta varchar(3) not null,
    vlasnik varchar(45) not null,
    odobrena varchar(2) not null,
    FOREIGN KEY (vlasnik) REFERENCES korisnik(email)
);

CREATE TABLE kupovina (
    id INT IDENTITY(1,1) PRIMARY KEY,
    datumKupovine VARCHAR(50),
    proizvod VARCHAR(50),
    kupac VARCHAR(50),
    kolicina INT,
    cenaKupovine FLOAT,
    valuta VARCHAR(50),
    FOREIGN KEY (kupac) REFERENCES Korisnik(email),
    FOREIGN KEY (proizvod) REFERENCES Proizvod(naziv)
);

insert into korisnik (ime, prezime, adresa, grad, drzava, brojTelefona, email, lozinka) values ("admin", "admin", "Balzakova 65", "Subotica", "Srbija", "024567876", "secernisanns@gmail.com", "secernisan1234!");

insert into proizvod (naziv, cena, valuta, kolicina, slika) values ("Nugat", 520, "RSD", 5, "Proizvodi/nugat.jpg");
insert into proizvod (naziv, cena, valuta, kolicina, slika) values ("Pistać Malina", 590, "RSD", 3, "Proizvodi/pistacmalina.jpg");
insert into proizvod (naziv, cena, valuta, kolicina, slika) values ("Chocco", 550, "RSD", 8, "Proizvodi/choco.jpg");
insert into proizvod (naziv, cena, valuta, kolicina, slika) values ("Cherry", 590, "RSD", 20, "Proizvodi/cherry.jpg");
insert into proizvod (naziv, cena, valuta, kolicina, slika) values ("Plazma", 490, "RSD", 3, "Proizvodi/plazma.jpg");

insert into kartica (brojKartice, datumIsteka, cvv, stanje, valuta, vlasnik, odobrena) values ("9876543210987654", "17/27", "987", 0, "RSD", "secernisanns@gmail.com", "DA");