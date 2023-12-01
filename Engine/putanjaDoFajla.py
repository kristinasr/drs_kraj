import os

def odrediPutanju(putanjaDoFajla):
    nazivFajla = os.path.basename(putanjaDoFajla)
    novaPutanja = f"Proizvodi/{nazivFajla}"
    return novaPutanja