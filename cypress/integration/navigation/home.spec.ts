describe('Elvis Home page navigation Test', () => {

    beforeEach(() => {
        cy.visit('http://localhost:4200/home');
    });

    it('Navigates to New Project Page when clicking card link', () => {
        cy.get('.e-card_title').contains('New project')
            .parent('.e-card_header_text')
            .parent('.e-card_header')
            .siblings('.e-card_actions').children().contains('Get started').click();
        cy.url().should('eq', 'http://localhost:4200/utilities/new-project-doc');
    });

    it('Navigates to Components overview page when clicking card link', () => {
        cy.get('.e-card_title').contains('Components')
            .parent('.e-card_header_text')
            .parent('.e-card_header')
            .siblings('.e-card_actions').children().contains('View components').click();
        cy.url().should('eq', 'http://localhost:4200/components/overview-comp-doc');
    });

    // TODO: Implement when page is ready
    // it('Navigates to Template page when clicking card link', () => {
    //     cy.get('.e-card_title').contains('Templates')
    //         .parent('.e-card_header_text')
    //         .parent('.e-card_header')
    //         .siblings('.e-card_actions').children().contains('View templates').click();
    //     cy.url().should('eq', 'http://localhost:4200/utilities/template-doc');
    // });

});
