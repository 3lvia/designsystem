describe('Accessibity sidebar Test', () => {

    beforeEach(() => {
        cy.visit('http://localhost:4200/accessibility');
    });

    it('Visits the Accessibility overview page', () => {
        cy.url().should('eq', 'http://localhost:4200/accessibility');
    });

    it('Visits the Accessibity doc page on clicking on Accessibity in the sidebar', () => {
        cy.get('.navbar-item').contains('Accessibility').click();
        cy.url().should('eq', 'http://localhost:4200/accessibility/accessibility-doc');
    });

    it('Visits the Alt-Texts doc page on clicking on Alt-Texts in the sidebar', () => {
        cy.get('.navbar-item').contains('Alt-texts').click();
        cy.url().should('eq', 'http://localhost:4200/accessibility/alttext-doc');
    });

    it('Visits the UU Tools doc page on clicking on UU Tools in the sidebar', () => {
        cy.get('.navbar-item').contains('UU Tools').click();
        cy.url().should('eq', 'http://localhost:4200/accessibility/uutools-doc');
    });
});
