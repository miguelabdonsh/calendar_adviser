from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import smtplib
import os
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware

# Cargar variables de entorno
load_dotenv()

sender_email = os.getenv("SENDER_EMAIL")
sender_password = os.getenv("SENDER_PASSWORD")


app = FastAPI()

# Configurar CORS, esto evita que al iniciar react en el puerto 3000 y fastapi en el puerto 8000 no haya
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class EventReminder(BaseModel):
    email: str
    date: str
    description: str


def send_email(recipient_email: str, event_date: str, event_description: str):
    subject = f"Recordatorio de evento: {event_date}"
    body = f"Tienes un evento programado para el {event_date}:\n\n{event_description}"
    message = f"Subject: {subject}\n\n{body}"

    try:
        with smtplib.SMTP("smtp.gmail.com", 587) as server:
            server.starttls()  # Inicia conexión segura
            server.login(sender_email, sender_password)
            server.sendmail(sender_email, recipient_email, message)
    except Exception as e:
        print(f"Error al enviar el correo: {e}")
        raise HTTPException(status_code=500, detail="No se pudo enviar el correo electrónico")


@app.get("/")
async def read_root():
    return {"message": "Bienvenido a la API de Calendar Adviser"}


@app.post("/send-reminder/")
async def send_reminder(event: EventReminder):
    # Validar el correo electrónico
    if not event.email or not event.date or not event.description:
        raise HTTPException(status_code=400, detail="Todos los campos son obligatorios")

    # Enviar correo electrónico
    send_email(event.email, event.date, event.description)
    return {"message": "Recordatorio enviado con éxito"}
