/// <reference types="cypress" />

describe('template spec', function () {
  it('renders input fields', function () {
    // Cypress verwendet die baseUrl automatisch bei cy.visit
    cy.visit('http://95.143.172.216:45921/'); // Startseite besuchen (ergibt http://95.143.172.216:45921/)

    // Überprüfen, ob Eingabefelder vorhanden sind
    cy.get('input[placeholder="Benutzername"]').should('exist');
    cy.get('input[placeholder="Passwort"]').should('exist');

    // Login testen
    cy.get('input[placeholder="Benutzername"]').type('root');
    cy.get('input[placeholder="Passwort"]').type('root');
    cy.get('button[id="submit"]').click();

    // Beispiel-Assertions für Startseite
    cy.get('h1').should('contain', 'Tennis-Racquet');
    cy.get('button[id="logout"]').should('exist');

    // Logout testen
    cy.get('button[id="logout"]').click();
  });
});
