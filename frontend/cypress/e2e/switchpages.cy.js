/// <reference types="cypress" />

describe('Switch Pages Test', function () {
    it('logs in and switches between pages', function () {
        // Besuche die Startseite
        cy.visit('http://95.143.172.216:45921/HomePage/');

        // **Login**
        cy.get('input[placeholder="Benutzername"]').should('exist');
        cy.get('input[placeholder="Passwort"]').should('exist');
        cy.get('input[placeholder="Benutzername"]').type('root');
        cy.get('input[placeholder="Passwort"]').type('root');
        cy.get('button[id="submit"]').click();

        // **Prüfen, ob Login erfolgreich war**
        cy.get('h1').should('contain', 'Sport');
        
    });
});
