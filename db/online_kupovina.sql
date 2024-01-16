create database online_kupovina;

use online_kupovina;

create table Korisnik
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

create table Proizvod
(
    id INT PRIMARY KEY not null AUTO_INCREMENT,
    naziv varchar(45) not null UNIQUE,
    cena float not null,
    valuta varchar(45) not null,
    kolicina int not null,
    slika varchar(45) not null
);

create table Kartica
(
    id INT PRIMARY KEY not null AUTO_INCREMENT,
    brojKartice varchar(16) not null UNIQUE,
    datumIsteka varchar(5) not null,
    cvv varchar(3) not null,
    stanje float not null,
    valuta varchar(3) not null,
    vlasnik varchar(45) not null,
    odobrena varchar(2) not null,
    FOREIGN KEY (vlasnik) REFERENCES Korisnik(email)
);

create table Kupovina (
    id INT PRIMARY KEY not null AUTO_INCREMENT,
    proizvod varchar(45),
    kupac varchar(45),
    kolicina int not null,
    cena float,
    valuta varchar(45),
    datumKupovine varchar(45),
    FOREIGN KEY (kupac) REFERENCES Korisnik(email),
    FOREIGN KEY (proizvod) REFERENCES Proizvod(naziv)
);

insert into Korisnik (ime, prezime, adresa, grad, drzava, brojTelefona, email, lozinka) values ("admin", "admin", "Balzakova 65", "Subotica", "Srbija", "024567876", "secernisanns@gmail.com", "secernisan1234!");

insert into Proizvod (naziv, cena, valuta, kolicina, slika) values ("Nugat", 520, "RSD", 5, "Proizvodi/nugat.jpg");
insert into Proizvod (naziv, cena, valuta, kolicina, slika) values ("Pistać Malina", 590, "RSD", 3, "Proizvodi/pistacmalina.jpg");
insert into Proizvod (naziv, cena, valuta, kolicina, slika) values ("Chocco", 550, "RSD", 8, "Proizvodi/choco.jpg");
insert into Proizvod (naziv, cena, valuta, kolicina, slika) values ("Cherry", 590, "RSD", 20, "Proizvodi/cherry.jpg");
insert into Proizvod (naziv, cena, valuta, kolicina, slika) values ("Plazma", 490, "RSD", 3, "Proizvodi/plazma.jpg");

insert into Kartica (brojKartice, datumIsteka, cvv, stanje, valuta, vlasnik, odobrena) values ("9876543210987654", "17/27", "987", 0, "USD", "secernisanns@gmail.com", "DA");