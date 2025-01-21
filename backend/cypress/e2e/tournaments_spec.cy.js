// cypress/e2e/tournaments_spec.cy.js

describe('Tournament API Tests', () => {
    
    

    // Test für die Route GET '/'
    it('GET / should return all tournaments', () => {
        cy.request('http://95.143.172.216:45920/Tournaments').then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.be.an('array'); // Annahme: Antwort ist eine Liste
        });
    });

    // Test für die Route GET '/tByLetter'
    it('GET /tByLetter should return tournaments starting with specified letter', () => {
        cy.request({
            url: 'http://95.143.172.216:45920/Tournaments/tByLetter',
            qs: { letter: 'A' } // Beispiel: Turniere, die mit "A" beginnen
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.be.an('array');
            response.body.forEach(tournament => {
                expect(tournament.name[0]).to.match(/A/i); // Überprüfen, ob der Name mit "A" beginnt
            });
        });
    });

    it('GET /tByLetter should return 400 for invalid letter parameter', () => {
        cy.request({
            url: 'http://95.143.172.216:45920/Tournaments/tByLetter',
            qs: { letter: 'AB' }, // Ungültige Eingabe
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(400);
            expect(response.body).to.eq("Bitte gib einen einzigen Buchstaben als 'letter' an.");
        });
    });

    // Test für die Route GET '/tByPrize'
    // it('GET /tByPrize should return tournaments with exact prize amount', () => {
    //     cy.request({
    //         url: 'http://95.143.172.216:45920/Tournaments/tByPrize',
    //         qs: { prize: 1500000 } // Beispiel: Turniere mit 1000 Preisgeld
    //     }).then((response) => {
    //         expect(response.status).to.eq(200);
    //         expect(response.body).to.be.an('array');
    //         response.body.forEach(tournament => {
    //             expect(tournament.prize).to.eq(1500000);
    //         });
    //     });
    // });

    it('GET /tByPrize should return 400 for invalid prize parameter', () => {
        cy.request({
            url: 'http://95.143.172.216:45920/Tournaments/tByPrize',
            qs: { prize: 'abc' }, // Ungültige Eingabe
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(400);
            expect(response.body).to.eq("Bitte gib eine gültige Zahl als 'prize' an.");
        });
    });

    it('GET /tByPrize should return 404 if no tournaments found with specified prize', () => {
        cy.request({
            url: 'http://95.143.172.216:45920/Tournaments/tByPrize',
            qs: { prize: 999999 }, // Annahme: Kein Turnier hat dieses Preisgeld
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(404);
            expect(response.body).to.eq("Keine Turniere mit diesem Prize gefunden.");
        });
    });

    // Test für die Route GET '/prize-range'
    it('GET /prize-range should return tournaments within the prize range', () => {
        cy.request({
            url: 'http://95.143.172.216:45920/Tournaments/prize-range',
            qs: { minPrize: 500, maxPrize: 1500 } // Beispiel: Preisbereich 500 - 1500
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.be.an('array');
            response.body.forEach(tournament => {
                expect(tournament.prize).to.be.within(500, 1500);
            });
        });
    });

    it('GET /prize-range should return 400 for invalid range parameters', () => {
        cy.request({
            url: 'http://95.143.172.216:45920/Tournaments/prize-range',
            qs: { minPrize: 'abc', maxPrize: 'xyz' }, // Ungültige Eingaben
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(400);
            expect(response.body).to.eq("Bitte gib gültige Zahlen als 'minPrize' und 'maxPrize' an.");
        });
    });

    it('GET /sortedByName should return tournaments sorted by name', () => {
        cy.request({
            url: 'http://95.143.172.216:45920/Tournaments/sortedByName',
            qs: { order: 'asc' } // Alphabetische Sortierung (A-Z)
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.be.an('array');

            // Überprüfen, ob die Namen alphabetisch sortiert sind
            const names = response.body.map(tournament => tournament.name.toLowerCase());
            expect(names).to.deep.equal([...names].sort());
        });

        cy.request({
            url: 'http://95.143.172.216:45920/Tournaments/sortedByName',
            qs: { order: 'desc' } // Umgekehrte alphabetische Sortierung (Z<<-A)
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.be.an('array');

            // Überprüfen, ob die Namen umgekehrt alphabetisch sortiert sind
            const names = response.body.map(tournament => tournament.name.toLowerCase());
            expect(names).to.deep.equal([...names].sort().reverse());
        });
    });
});