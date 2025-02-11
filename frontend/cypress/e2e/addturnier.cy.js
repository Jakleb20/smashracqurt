/// <reference types="cypress" />
describe('AddTurnier Component', () => {
    before(function () {
        cy.visit('http://95.143.172.216:45921/Tournaments');
        cy.get('input[placeholder="Benutzername"]').type('root');
        cy.get('input[placeholder="Passwort"]').type('Leon');
        cy.get('button[id="submit"]').click();
        cy.get('a.nav-link').contains('Turnier hinzufügen').click();
    });

    it('should display the form and inputs correctly', () => {
        cy.get('#tournament-title').should('contain.text', 'Turniere erstellen');
        cy.get('#tournament-name-input').should('exist');
        cy.get('#tournament-description-input').should('exist');
        cy.get('#tournament-prize-input').should('exist');
        cy.get('#add-tournament-button').should('exist');
    });

    it('should show an alert when fields are empty', () => {
        cy.visit('http://95.143.172.216:45921/Tournaments');
        cy.get('input[placeholder="Benutzername"]').type('root');
        cy.get('input[placeholder="Passwort"]').type('Leon');
        cy.get('button[id="submit"]').click();
        cy.get('a.nav-link').contains('Turnier hinzufügen').click();

        cy.get('#add-tournament-button').click();

        cy.on('window:alert', (text) => {
            expect(text).to.equal('Bitte alle Felder korrekt ausfüllen.');
        });
    });

    it('should allow adding a tournament with valid inputs', () => {
        const tournamentName = 'Test Tournament';
        const tournamentDescription = 'This is a test tournament';
        const tournamentPrize = 1000;

        cy.intercept('POST', 'http://95.143.172.216:45921/tournaments/add', {
            statusCode: 201,
            body: {
                name: tournamentName,
                description: tournamentDescription,
                prize: tournamentPrize,
                users: [],
                matches: [],
            },
        }).as('addTournament');

        cy.visit('http://95.143.172.216:45921/Tournaments');
        cy.get('input[placeholder="Benutzername"]').type('root');
        cy.get('input[placeholder="Passwort"]').type('Leon');
        cy.get('button[id="submit"]').click();
        cy.get('a.nav-link').contains('Turnier hinzufügen').click();

        cy.get('#tournament-name-input').type(tournamentName);
        cy.get('#tournament-description-input').type(tournamentDescription);
        cy.get('#tournament-prize-input').type(tournamentPrize.toString());

        cy.get('#add-tournament-button').click();


        cy.get('a.nav-link').contains('Alle Turniere').click();


        // Turnier löschen
        cy.contains('#tournament-list-item', tournamentName)
            .find('button')
            .contains('Löschen')
            .click();

        // Überprüfen, ob das Turnier entfernt wurde
        cy.contains('#tournament-list-item', tournamentName).should('not.exist');

    });

   /* it('check if data is in database & should handle API errors gracefully ', () => {
        const tournamentName = 'Test Tournament';

        cy.visit('http://95.143.172.216:45921/tournaments');
        cy.get('input[placeholder="Benutzername"]').type('root');
        cy.get('input[placeholder="Passwort"]').type('Leon');
        cy.get('button[id="submit"]').click();
        cy.get('a.nav-link').contains('Turnier hinzufügen').click();




    });
*/


});
