describe('Tournament API Tests', () => {

    // Testet die GET-Route '/' und überprüft, ob alle Turniere zurückgegeben werden.
    it('GET / should return all tournaments', () => {
        cy.request('/').then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.be.an('array');
        });
    });

    // Testet die GET-Route '/tByLetter' und überprüft, ob Turniere zurückgegeben werden,
    // die mit einem bestimmten Buchstaben beginnen.
    it('GET /tByLetter should return tournaments starting with specified letter', () => {
        let filteredTournaments = [];
        let tournaments = [];
        
        cy.request({
            url: '/tByLetter',
            qs: { letter: 'A' }
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.be.an('array');
            filteredTournaments = response.body;
            response.body.forEach(tournament => {
                expect(tournament.name[0]).to.match(/A/i);
            });
        });
    });

    // Testet die GET-Route '/tByLetter' und überprüft,
    // ob eine ungültige Eingabe (mehr als ein Buchstabe) zu einem Fehler (400) führt.
    it('GET /tByLetter should return 400 for invalid letter parameter', () => {
        cy.request({
            url: '/tByLetter',
            qs: { letter: 'AB' },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(400);
            expect(response.body).to.eq("Bitte gib einen einzigen Buchstaben als 'letter' an."); // Überprüft die Fehlermeldung
        });
    });

    // Testet die GET-Route '/tByPrize' und überprüft,
    // ob Turniere mit einem bestimmten Preisgeld zurückgegeben werden.
    it('GET /tByPrize should return tournaments with exact prize amount', () => {
        cy.request({
            url: '/tByPrize',
            qs: { prize: 1500000 } // Preisgeldfilter: 1.500.000
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.be.an('array');
            response.body.forEach(tournament => {
                expect(tournament.prize).to.eq(1500000);
            });
        });
    });

    // Testet die GET-Route '/tByPrize' und überprüft,
    // ob eine ungültige Eingabe für das Preisgeld zu einem Fehler (400) führt.
    it('GET /tByPrize should return 400 for invalid prize parameter', () => {
        cy.request({
            url: '/tByPrize',
            qs: { prize: 'abc' },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(400); // Erwartet HTTP-Status 400
            expect(response.body).to.eq("Bitte gib eine gültige Zahl als 'prize' an.");
        });
    });

    // Testet die GET-Route '/tByPrize' und überprüft,
    // ob eine Abfrage ohne passende Ergebnisse einen Fehlerstatus (404) liefert.
    it('GET /tByPrize should return 404 if no tournaments found with specified prize', () => {
        cy.request({
            url: '/tByPrize',
            qs: { prize: 999999 }, // Kein Turnier mit diesem Preisgeld erwartet
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(404);
            expect(response.body).to.eq("Keine Turniere mit diesem Prize gefunden.");
        });
    });

    // Testet die GET-Route '/prize-range' und überprüft,
    // ob Turniere innerhalb eines bestimmten Preisgeldbereichs zurückgegeben werden.
    it('GET /prize-range should return tournaments within the prize range', () => {
        cy.request({
            url: '/prize-range',
            qs: { minPrize: 500, maxPrize: 1500 } // Preisbereich: 500 bis 1500
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.be.an('array');
            response.body.forEach(tournament => {
                expect(tournament.prize).to.be.within(500, 1500);
            });
        });
    });

    // Testet die GET-Route '/prize-range' und überprüft,
    // ob ungültige Eingaben für den Preisbereich zu einem Fehler (400) führen.
    it('GET /prize-range should return 400 for invalid range parameters', () => {
        cy.request({
            url: '/prize-range',
            qs: { minPrize: 'abc', maxPrize: 'xyz' }, // falsche Parameter: keine Zahlen
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(400); // Erwartet HTTP-Status 400
            expect(response.body).to.eq("Bitte gib gültige Zahlen als 'minPrize' und 'maxPrize' an.");
        });
    });
});
