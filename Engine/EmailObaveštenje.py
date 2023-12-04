import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

def slanje_emaila(subject, telo, to_email):
    korisnik = "onlinekupovina@gmail.com"
    lozinka = "onlinekupovina1234"

    message = MIMEMultipart()
    message['From'] = korisnik
    message['To'] = to_email
    message['Subject'] = subject
    message.attach(MIMEText(telo, 'plain'))


    with smtplib.SMTP('smtp.gmail.com', 587) as server:
        server.starttls()
        server.login(korisnik, lozinka)
        server.sendmail(korisnik, to_email, message.as_string())

    print("Uspešno ste poslali email!")