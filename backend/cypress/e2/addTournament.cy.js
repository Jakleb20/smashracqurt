const viteUrl = Cypress.env('viteUrl');


/// <reference types="cypress" />

describe('switch pages', function() {
    before(function() {
        cy.visit(viteUrl + '/HomePage/');
    });

    it('renders headers', function() {

        // Login
        cy.get('input[placeholder="Benutzername"]').should('exist');
        cy.get('input[placeholder="Passwort"]').should('exist');
        cy.get('input[placeholder="Benutzername"]').type('root');
        cy.get('input[placeholder="Passwort"]').type('root');
        cy.get('button[id="submit"]').click();

        cy.get('a.nav-link').contains('Alle Turniere').should('exist');

        cy.get('a.nav-link').contains('Alle Turniere').click();

        
        
    });
});
