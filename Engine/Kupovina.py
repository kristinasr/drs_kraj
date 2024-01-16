from config import db

class Kupovina (db.Model):
    __tablename__ = "Kupovina"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    proizvod = db.Column(db.String(), nullable=False)
    kupac = db.Column(db.String(), nullable=False)
    kolicina = db.Column(db.Integer, nullable=False)
    cena = db.Column(db.Float(), nullable=False)
    valuta = db.Column(db.String(), nullable=False)
    datumKupovine = db.Column(db.String(), nullable=False)

    def __init__(self, proizvod, kupac, kolicina, cena, valuta, datumKupovine):
        self.proizvod = proizvod
        self.kupac = kupac
        self.kolicina = kolicina
        self.cena = cena
        self.valuta = valuta
        self.datumKupovine = datumKupovine