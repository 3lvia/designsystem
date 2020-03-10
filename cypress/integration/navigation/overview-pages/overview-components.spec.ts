describe('Elvis Components overview page navigation Test', () => {

    beforeEach(() => {
        cy.visit('http://localhost:4200/components');
    });

    it('Navigates to Alerts doc page when clicking card link', () => {
        cy.get('.e-card_title').contains('Alerts')
            .parent('.e-card_header_text')
            .parent('.e-card_header')
            .siblings('.e-card_actions').children().contains('View component').click();
        cy.url().should('eq', 'http://localhost:4200/components/feedback-doc');
    });

    it('Navigates to Badge doc page when clicking card link', () => {
        cy.get('.e-card_title').contains('Badge')
            .parent('.e-card_header_text')
            .parent('.e-card_header')
            .siblings('.e-card_actions').children().contains('View component').click();
        cy.url().should('eq', 'http://localhost:4200/components/badge-doc');
    });

    it('Navigates to Button doc page when clicking card link', () => {
        cy.get('.e-card_title').contains('Button')
            .parent('.e-card_header_text')
            .parent('.e-card_header')
            .siblings('.e-card_actions').children().contains('View component').click();
        cy.url().should('eq', 'http://localhost:4200/components/button-doc');
    });
});

