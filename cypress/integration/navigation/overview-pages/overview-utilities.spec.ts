describe('Elvis Utilities overview page navigation Test', () => {

    beforeEach(() => {
        cy.visit('http://localhost:4200/utilities');
    });

    it('Navigates to New Project doc page when clicking card link', () => {
        cy.get('.e-card_title').contains('New project')
            .parent('.e-card_header_text')
            .parent('.e-card_header')
            .siblings('.e-card_actions').children().contains('Get started').click();
        cy.url().should('eq', 'http://localhost:4200/utilities/new-project-doc');
    });

    it('Navigates to Colors doc page when clicking card link', () => {
        cy.get('.e-card_title').contains('Colors')
            .parent('.e-card_header_text')
            .parent('.e-card_header')
            .siblings('.e-card_actions').children().contains('View utility').click();
        cy.url().should('eq', 'http://localhost:4200/utilities/color-doc');
    });

    it('Navigates to Shadow doc page when clicking card link', () => {
        cy.get('.e-card_title').contains('Shadow')
            .parent('.e-card_header_text')
            .parent('.e-card_header')
            .siblings('.e-card_actions').children().contains('View utility').click();
        cy.url().should('eq', 'http://localhost:4200/utilities/shadow-doc');
    });

    it('Navigates to Spacing doc page when clicking card link', () => {
        cy.get('.e-card_title').contains('Spacing')
            .parent('.e-card_header_text')
            .parent('.e-card_header')
            .siblings('.e-card_actions').children().contains('View utility').click();
        cy.url().should('eq', 'http://localhost:4200/utilities/spacing-doc');
    });

    it('Navigates to Icons doc page when clicking card link', () => {
        cy.get('.e-card_title').contains('Icons')
            .parent('.e-card_header_text')
            .parent('.e-card_header')
            .siblings('.e-card_actions').children().contains('View utility').click();
        cy.url().should('eq', 'http://localhost:4200/utilities/icon-doc');
    });

    it('Navigates to Typography doc page when clicking card link', () => {
        cy.get('.e-card_title').contains('Typography')
            .parent('.e-card_header_text')
            .parent('.e-card_header')
            .siblings('.e-card_actions').children().contains('View utility').click();
        cy.url().should('eq', 'http://localhost:4200/utilities/typography-doc');
    });



});

