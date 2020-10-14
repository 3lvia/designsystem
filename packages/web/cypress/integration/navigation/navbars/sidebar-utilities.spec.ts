describe('Utilities sidebar Test', () => {

    beforeEach(() => {
        cy.visit('http://localhost:4200/utilities');
    });

    it('Visits the Utilities overview page', () => {
        cy.url().should('eq', 'http://localhost:4200/utilities');
    });

    it('Visits the New Project doc page on clicking on New Project in the sidebar', () => {
        cy.get('.navbar-item').contains('New project').click();
        cy.url().should('eq', 'http://localhost:4200/utilities/new-project-doc');
    });

    // TODO: Implement when page is ready
    // it('Visits the Template doc page on clicking on Template in the sidebar', () => {
    //     cy.get('.navbar-item').contains('Templates').click();
    //     cy.url().should('eq', 'http://localhost:4200/utilities/template-doc');
    // });

    it('Visits the Colors doc page on clicking on Colors in the sidebar', () => {
        cy.get('.navbar-item').contains('Colors').click();
        cy.url().should('eq', 'http://localhost:4200/utilities/color-doc');
    });

    it('Visits the Icons doc page on clicking on Icons in the sidebar', () => {
        cy.get('.navbar-item').contains('Icons').click();
        cy.url().should('eq', 'http://localhost:4200/utilities/icon-doc');
    });

    it('Visits the Typography doc page on clicking on Typography in the sidebar', () => {
        cy.get('.navbar-item').contains('Typography').click();
        cy.url().should('eq', 'http://localhost:4200/utilities/typography-doc');
    });

    it('Visits the Spacing doc page on clicking on Spacing in the sidebar', () => {
        cy.get('.navbar-item').contains('Spacing').click();
        cy.url().should('eq', 'http://localhost:4200/utilities/spacing-doc');
    });

    it('Visits the Shadow doc page on clicking on Shadow in the sidebar', () => {
        cy.get('.navbar-item').contains('Shadow').click();
        cy.url().should('eq', 'http://localhost:4200/utilities/shadow-doc');
    });
});
