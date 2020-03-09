describe('Elvis Header Test', () => {

    // TODO, put in before each to reset every test.
    it('Visits the home page of Elvis', () => {
        cy.visit('http://localhost:4200/home');
        cy.url().should('eq', 'http://localhost:4200/home');
    });

    it('should navigate to Components overview page when clicking on Components in header', () => {
        cy.get('.header-tabs').contains('Components').click();
        cy.url().should('eq', 'http://localhost:4200/components');
    });

    it('should navigate to Utilities overview page when clicking on Utilities in header', () => {
        cy.get('.header-tabs').contains('Utilities').click();
        cy.url().should('eq', 'http://localhost:4200/utilities');
    });

    it('should navigate to Accessibility overview page when clicking on Accessibility in header', () => {
        cy.get('.header-tabs').contains('Accessibility').click();
        cy.url().should('eq', 'http://localhost:4200/accessibility');
    });
    it('should navigate to home page when clicking on logo or title in header', () => {
        cy.get('.header-top').click();
        cy.url().should('eq', 'http://localhost:4200/home');
    });
    it('should have a icon wihth link to Github repo of elvia design system in the header', () => {
        cy.get('.header-top_links').should('have.attr', 'href', 'https://github.com/hafslundnett/elvia-designsystem');
    });
});

