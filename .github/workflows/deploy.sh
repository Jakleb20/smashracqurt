#!/bin/bash

# Exit on any error
set -e

# Variablen
SERVER_USER="kasmash1"
SERVER_HOST="delphinus.uberspace.de"
APP_DIR="/var/www/your-app" # Pfad zu deiner Anwendung auf dem Server
GIT_BRANCH="main"          # Der Branch, der deployed werden soll

echo "Starte Deployment..."

# Verbindung zum Server herstellen und Deployment-Befehle ausführen
ssh "${SERVER_USER}@${SERVER_HOST}" << EOF
  set -e
  echo "Verbunden mit ${SERVER_HOST}"

  # In das Anwendungsverzeichnis wechseln
  cd SmashRacquet

  # Repository aktualisieren
  echo "Ziehe die neuesten Änderungen aus dem ${GIT_BRANCH}-Branch..."
  git fetch --all
  git reset --hard origin/${main}

  # Abhängigkeiten installieren (Frontend und Backend)
  echo "Installiere Abhängigkeiten für das Frontend..."
  cd frontend && npm install && cd ..
  echo "Installiere Abhängigkeiten für das Backend..."
  cd backend && npm install && cd ..


  # Server neu starten (z. B. mit PM2 oder einem anderen Prozessmanager)
  echo "Starte den Server neu..."
  pm2 restart all || pm2 start backend/server.js --name "your-app"

  echo "Deployment erfolgreich abgeschlossen!"
EOF
