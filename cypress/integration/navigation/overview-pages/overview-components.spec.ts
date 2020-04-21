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

    it('Navigates to label doc page when clicking card link', () => {
        cy.get('.e-card_title').contains('label')
            .parent('.e-card_header_text')
            .parent('.e-card_header')
            .siblings('.e-card_actions').children().contains('View component').click();
        cy.url().should('eq', 'http://localhost:4200/components/label-doc');
    });

    it('Navigates to Button doc page when clicking card link', () => {
        cy.get('.e-card_title').contains('Button')
            .parent('.e-card_header_text')
            .parent('.e-card_header')
            .siblings('.e-card_actions').children().contains('View component').click();
        cy.url().should('eq', 'http://localhost:4200/components/button-doc');
    });

    it('Navigates to Card doc page when clicking card link', () => {
        cy.get('.e-card_title').contains('Card')
            .parent('.e-card_header_text')
            .parent('.e-card_header')
            .siblings('.e-card_actions').children().contains('View component').click();
        cy.url().should('eq', 'http://localhost:4200/components/card-doc');
    });

    it('Navigates to Checkbox doc page when clicking card link', () => {
        cy.get('.e-card_title').contains('Checkbox')
            .parent('.e-card_header_text')
            .parent('.e-card_header')
            .siblings('.e-card_actions').children().contains('View component').click();
        cy.url().should('eq', 'http://localhost:4200/components/checkbox-doc');
    });

    it('Navigates to Toggle doc page when clicking card link', () => {
        cy.get('.e-card_title').contains('Toggle')
            .parent('.e-card_header_text')
            .parent('.e-card_header')
            .siblings('.e-card_actions').children().contains('View component').click();
        cy.url().should('eq', 'http://localhost:4200/components/checkbox-toggle-doc');
    });

    it('Navigates to Divider doc page when clicking card link', () => {
        cy.get('.e-card_title').contains('Divider')
            .parent('.e-card_header_text')
            .parent('.e-card_header')
            .siblings('.e-card_actions').children().contains('View component').click();
        cy.url().should('eq', 'http://localhost:4200/components/divider-doc');
    });

    it('Navigates to Dropdown doc page when clicking card link', () => {
        cy.get('.e-card_title').contains('Dropdown')
            .parent('.e-card_header_text')
            .parent('.e-card_header')
            .siblings('.e-card_actions').children().contains('View component').click();
        cy.url().should('eq', 'http://localhost:4200/components/dropdown-doc');
    });

    it('Navigates to Header doc page when clicking card link', () => {
        cy.get('.e-card_title').contains('Header')
            .parent('.e-card_header_text')
            .parent('.e-card_header')
            .siblings('.e-card_actions').children().contains('View component').click();
        cy.url().should('eq', 'http://localhost:4200/components/header-doc');
    });

    it('Navigates to Input doc page when clicking card link', () => {
        cy.get('.e-card_title').contains('Input')
            .parent('.e-card_header_text')
            .parent('.e-card_header')
            .siblings('.e-card_actions').children().contains('View component').click();
        cy.url().should('eq', 'http://localhost:4200/components/input-doc');
    });

    it('Navigates to Link doc page when clicking card link', () => {
        cy.get('.e-card_title').contains('Link')
            .parent('.e-card_header_text')
            .parent('.e-card_header')
            .siblings('.e-card_actions').children().contains('View component').click();
        cy.url().should('eq', 'http://localhost:4200/components/link-doc');
    });

    it('Navigates to Radiobutton doc page when clicking card link', () => {
        cy.get('.e-card_title').contains('Radiobutton')
            .parent('.e-card_header_text')
            .parent('.e-card_header')
            .siblings('.e-card_actions').children().contains('View component').click();
        cy.url().should('eq', 'http://localhost:4200/components/radiobutton-doc');
    });

    it('Navigates to Select doc page when clicking card link', () => {
        cy.get('.e-card_title').contains('Select')
            .parent('.e-card_header_text')
            .parent('.e-card_header')
            .siblings('.e-card_actions').children().contains('View component').click();
        cy.url().should('eq', 'http://localhost:4200/components/select-doc');
    });

    it('Navigates to Table doc page when clicking card link', () => {
        cy.get('.e-card_title').contains('Table')
            .parent('.e-card_header_text')
            .parent('.e-card_header')
            .siblings('.e-card_actions').children().contains('View component').click();
        cy.url().should('eq', 'http://localhost:4200/components/table-doc');
    });

    it('Navigates to Tags doc page when clicking card link', () => {
        cy.get('.e-card_title').contains('Tags')
            .parent('.e-card_header_text')
            .parent('.e-card_header')
            .siblings('.e-card_actions').children().contains('View component').click();
        cy.url().should('eq', 'http://localhost:4200/components/tags-doc');
    });

    it('Navigates to Tooltip doc page when clicking card link', () => {
        cy.get('.e-card_title').contains('Tooltip')
            .parent('.e-card_header_text')
            .parent('.e-card_header')
            .siblings('.e-card_actions').children().contains('View component').click();
        cy.url().should('eq', 'http://localhost:4200/components/tooltip-doc');
    });
});

