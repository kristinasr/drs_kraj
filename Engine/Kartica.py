from config import db

class Kartica(db.Model):
    __tablename__ = "Kartica"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    brojKartice = db.Column(db.String(), unique=True, nullable=False)
    datumIsteka = db.Column(db.String(), nullable=False)
    cvv = db.Column(db.String(), nullable=False)
    stanje = db.Column(db.Float(), nullable=False)
    valuta = db.Column(db.String(), nullable=False)
    vlasnik = db.Column(db.String(), nullable=False)
    odobrena = db.Column(db.String(), nullable=False)

    def __init__(self, brojKartice, datumIsteka, cvv, stanje, valuta, vlasnik, odobrena):
        self.brojKartice = brojKartice
        self.datumIsteka = datumIsteka
        self.cvv = cvv
        self.stanje = stanje
        self.valuta = valuta
        self.vlasnik = vlasnik
        self.odobrena = odobrena

def podaci_kartice(kartica):
    return {
        'brojKartice': kartica.brojKartice,
        'datumIsteka': kartica.datumIsteka,
        'cvv': kartica.cvv,
        'stanje': kartica.stanje,
        'valuta': kartica.valuta,
        'vlasnik': kartica.vlasnik,
        'odobrena': kartica.odobrena
    }
    
def proveraValute(self, valuta):
    if self.valuta == valuta:
        return True
    else:
        return False