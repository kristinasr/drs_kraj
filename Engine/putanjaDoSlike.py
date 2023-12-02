import os

def odrediPutanju(putanjaDoSlike):
    nazivFajla = os.path.basename(putanjaDoSlike)
    novaPutanja = f"Proizvodi/{nazivFajla}"
    return novaPutanja