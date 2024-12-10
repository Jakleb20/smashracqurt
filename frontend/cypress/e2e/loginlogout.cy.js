/// <reference types="cypress" />

describe('template spec', function() {
  before(function() {
    cy.visit('http://localhost:5173/');
  });

  it('renders input fields', function() {
    cy.get('input[placeholder="Benutzername"]').should('exist');
    cy.get('input[placeholder="Passwort"]').should('exist');


    // tries login with right credentials
    cy.get('input[placeholder="Benutzername"]').type('root');
    cy.get('input[placeholder="Passwort"]').type('root');
    cy.get('button[id="submit"]').click();


    // cy.get('h1').should('contain', 'Startseite'); // Beispiel-Assertion, passe sie an deine Seite an
    // cy.get('button[id="logout"]').should('exist'); // Überprüfe, ob der Logout-Button vorhanden ist


    cy.get('button[id="logout"]').click();
  });
});
