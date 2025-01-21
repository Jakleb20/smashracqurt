// it('should login, fetch tournaments from the backend, apply filters, and verify filtered results', () => {
//     cy.visit('http://95.143.172.216:45921/Tournaments');
//
//     // Anmelden
//     cy.get('input[placeholder="Benutzername"]').type('root');
//     cy.get('input[placeholder="Passwort"]').type('Leon');
//     cy.get('button[id="submit"]').click();
//
//     // Sicherstellen, dass die Seite nach dem Login geladen ist
//     cy.url().should('include', '/HomePage');
//     cy.get('a.nav-link').contains('Alle Turniere').click();
//
//     // Sicherstellen, dass die Turnier-Seite geladen ist
//     cy.url().should('include', '/Tournaments');
//     cy.get('#tournament-list-title').should('contain.text', 'Liste der Turniere');
//
//     // Warten, bis das Eingabefeld für "Min Preis" sichtbar ist
//     cy.get('input[placeholder="Min Preis"]').should('be.visible');
//
//     // Setze Filter (Beispiel: Min Preis = 5000)
//     const minPrize = 5000;
//     const nameFilter = 'Aus';
//     cy.get('input[placeholder="Min Preis"]').type(minPrize.toString());
//     cy.get('input[placeholder="Name"]').type(nameFilter);
//     cy.contains('button', 'Filter anwenden').click();
//
//     // Überprüfe, dass die richtigen Turniere gefiltert wurden
//     cy.request('GET', 'http://95.143.172.216:45920/tournaments').then((response) => {
//         expect(response.status).to.eq(200);
//
//         const filteredTournaments = response.body.filter((tournament) =>
//             tournament.prize >= minPrize && tournament.name.toLowerCase().startsWith(nameFilter.toLowerCase())
//         );
//
//         cy.get('#tournament-list-item').should('have.length', filteredTournaments.length);
//
//         filteredTournaments.forEach((tournament, index) => {
//             cy.get('#tournament-list-item').eq(index).should('contain.text', tournament.name);
//             cy.get('#tournament-list-item').eq(index).should('contain.text', tournament.description);
//             cy.get('#tournament-list-item').eq(index).should('contain.text', `${tournament.prize}€`);
//         });
//     });
// });
