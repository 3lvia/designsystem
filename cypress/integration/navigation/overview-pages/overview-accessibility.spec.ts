describe('Elvis accessibility overview page navigation Test', () => {

    beforeEach(() => {
        cy.visit('http://localhost:4200/accessibility');
    });

    it('Navigates to Accessibility doc page when clicking card link', () => {
        cy.get('.e-card_title').contains('Accessibility')
            .parent('.e-card_header_text')
            .parent('.e-card_header')
            .siblings('.e-card_actions').children().contains('View requirements').click();
        cy.url().should('eq', 'http://localhost:4200/accessibility/accessibility-doc');
    });

    it('Navigates to Components doc page when clicking card link', () => {
        cy.get('.e-card_title').contains('Alt-texts')
            .parent('.e-card_header_text')
            .parent('.e-card_header')
            .siblings('.e-card_actions').children().contains('View requirements').click();
        cy.url().should('eq', 'http://localhost:4200/accessibility/alttext-doc');
    });

    it('Navigates to Components doc page when clicking card link', () => {
        cy.get('.e-card_title').contains('UU Tools')
            .parent('.e-card_header_text')
            .parent('.e-card_header')
            .siblings('.e-card_actions').children().contains('View tools').click();
        cy.url().should('eq', 'http://localhost:4200/accessibility/uutools-doc');
    });
});
