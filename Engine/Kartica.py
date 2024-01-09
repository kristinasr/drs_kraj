from config import db
# srecna nova
class Kartica(db.Model):
    table = "kartica",
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    brojKartice = db.Column(db.String, unique=True, nullable=False)
    datumIsteka = db.Column(db.String, nullable=False)
    ccv = db.Column(db.String, nullable=False)
    stanje = db.Column(db.Float, nullable=False)
    valuta = db.Column(db.String, nullable=False)
    vlasnik = db.Column(db.String, nullable=False)
    odobrena = db.Column(db.String, nullable=False)

    def __init__(self, brojKartice, datumIsteka, ccv, stanje, valuta, vlasnik, odobrena):
        self.brojKartice = brojKartice
        self.datumIsteka = datumIsteka
        self.ccv = ccv
        self.stanje = stanje
        self.valuta = valuta
        self.vlasnik = vlasnik
        self.odobrena = odobrena

def serializacija_kartice(kartica):
    return {
        'brojKartice': kartica.brojKartice,
        'datumIsteka': kartica.datumIsteka,
        'ccv': kartica.ccv,
        'stanje': kartica.stanje,
        'valuta': kartica.valuta,
        'vlasnik': kartica.vlasnik,
        'odobrena': kartica.odobrena
    }
    

def proveraValuta(self, valuta):
    if self.valuta == valuta:
        return True
    else:
        return False