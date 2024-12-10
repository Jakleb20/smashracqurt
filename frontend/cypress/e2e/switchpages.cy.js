
/// <reference types="cypress" />

describe('switch pages', function() {
    before(function() {
        cy.visit('http://localhost:5173/HomePage/');
    });

    it('renders headers', function() {

        // Login
        cy.get('input[placeholder="Benutzername"]').should('exist');
        cy.get('input[placeholder="Passwort"]').should('exist');
        cy.get('input[placeholder="Benutzername"]').type('root');
        cy.get('input[placeholder="Passwort"]').type('root');
        cy.get('button[id="submit"]').click();
        
        // Überprüfe, ob der Link "Alle Turniere" existiert
        cy.get('a.nav-link').contains('Alle Turniere').should('exist');

        // Klicke auf den Link "Alle Turniere"
        cy.get('a.nav-link').contains('Alle Turniere').click();


        // Überprüfe, ob der Link "Alle Turniere" existiert
        cy.get('a.nav-link').contains('Startseite').should('exist');

        // Klicke auf den Link "Alle Turniere"
        cy.get('a.nav-link').contains('Startseite').click();
        
    });
});
