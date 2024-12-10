describe('Turniere Seite', function () {

    before(function () {
        // Besuche die Seite und logge dich ein
        cy.visit('http://localhost:5173/Tournaments');
        cy.get('input[placeholder="Benutzername"]').type('root');
        cy.get('input[placeholder="Passwort"]').type('root');
        cy.get('button[id="submit"]').click();
        cy.get('a.nav-link').contains('Alle Turniere').click();
    });

    it('Lädt und zeigt Turniere an', function () {
        // Überprüft, ob Turniere angezeigt werden
        cy.get('#tournament-list').should('be.visible');
    });

    it('Filtert Turniere nach dem Anfangsbuchstaben', function () {
        cy.visit('http://localhost:5173/Tournaments');
        cy.get('input[placeholder="Benutzername"]').type('root');
        cy.get('input[placeholder="Passwort"]').type('root');
        cy.get('button[id="submit"]').click();
        cy.get('a.nav-link').contains('Alle Turniere').click();
        // Wähle einen Buchstaben und wende den Filter an
        cy.get('#letterFirst').type("A");
        //cy.get('button').contains('Filter zurücksetzen').click();

        // Stelle sicher, dass alle Turniere mit dem gewählten Buchstaben angezeigt werden
        cy.get('#tournament-list-item').each(($el) => {
            const name = $el.text();
            expect(name.startsWith('A')).to.be.true;
        });
    });


    /*it('Sortiert Turniere nach Namen (aufsteigend)', function () {
        // Wähle die Sortieroption 'Name' und die Reihenfolge 'Aufsteigend'
        cy.get('select').eq(0).select('name');
        cy.get('select').eq(1).select('asc');
        cy.get('button').contains('Filter zurücksetzen').click();

        // Stelle sicher, dass die Turniere nach Namen aufsteigend sortiert sind
        let previousName = '';
        cy.get('#tournament-list-item').each(($el) => {
            const name = $el.text().split(':')[0].trim();
            if (previousName) {
                expect(name.localeCompare(previousName)).to.be.greaterThan(0);
            }
            previousName = name;
        });
    });*/

    it('Sortiert Turniere nach Preis (absteigend)', function () {
        cy.visit('http://localhost:5173/Tournaments');
        cy.get('input[placeholder="Benutzername"]').type('root');
        cy.get('input[placeholder="Passwort"]').type('root');
        cy.get('button[id="submit"]').click();
        cy.get('a.nav-link').contains('Alle Turniere').click();
        // Wähle die Sortieroption 'Preis' und die Reihenfolge 'Absteigend'
        cy.get('select').eq(0).select('prize');
        cy.get('select').eq(1).select('desc');
        cy.get('button').contains('Filter zurücksetzen').click();

        // Stelle sicher, dass die Turniere nach Preis absteigend sortiert sind
        let previousPrize = Infinity;
        cy.get('#tournament-list-item').each(($el) => {
            const prize = parseFloat($el.text().match(/Preis: (\d+(\.\d+)?)/)[1]);
            expect(prize).to.be.lessThan(previousPrize);
            previousPrize = prize;
        });
    });



});
