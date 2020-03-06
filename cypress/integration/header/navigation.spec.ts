describe('App-Shell Test', () => {
    it('Visits the App-Shell doc page', () => {
        cy.visit('http://localhost:4200/home');
        cy.url().should('eq', 'http://localhost:4200/home');
    });

    it('should navigate to welcome page when clicking hafslund log', () => {
        cy.get('.header-tabs').contains('Components').click();
        cy.url().should('eq', 'http://localhost:4200/components');
    });

    it('should navigate to welcome page when clicking hafslund log', () => {
        cy.get('.header-tabs').contains('Utilities').click();
        cy.url().should('eq', 'http://localhost:4200/utilities');
    });

    it('should navigate to welcome page when clicking hafslund log', () => {
        cy.get('.header-tabs').contains('Accessibility').click();
        cy.url().should('eq', 'http://localhost:4200/accessibility');
    });
});

