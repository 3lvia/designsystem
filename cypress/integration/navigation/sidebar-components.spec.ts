describe('Components sidebar Test', () => {

    beforeEach(() => {
        cy.visit('http://localhost:4200/components');
    });

    it('Visits the Components overview page', () => {
        cy.url().should('eq', 'http://localhost:4200/components');
    });

    it('Visits the Alerts doc page on clicking on Alerts in the sidebar', () => {
        cy.get('.navbar-item').contains('Alerts').click();
        cy.url().should('eq', 'http://localhost:4200/components/feedback-doc');
    });

    it('Visits the Badge doc page on clicking on Badge in the sidebar', () => {
        cy.get('.navbar-item').contains('Badge').click();
        cy.url().should('eq', 'http://localhost:4200/components/badge-doc');
    });

    it('Visits the Button doc page on clicking on Button in the sidebar', () => {
        cy.get('.navbar-item').contains('Button').click();
        cy.url().should('eq', 'http://localhost:4200/components/button-doc');
    });

    it('Visits the Card doc page on clicking on Card in the sidebar', () => {
        cy.get('.navbar-item').contains('Card').click();
        cy.url().should('eq', 'http://localhost:4200/components/card-doc');
    });

    it('Visits the Checkbox doc page on clicking on Checkbox in the sidebar', () => {
        cy.get('.navbar-item').contains('Checkbox').click();
        cy.url().should('eq', 'http://localhost:4200/components/checkbox-doc');
    });

    it('Visits the Checkbox-Toggle doc page on clicking on Checkbox-Toggle in the sidebar', () => {
        cy.get('.navbar-item').contains('Checkbox-Toggle').click();
        cy.url().should('eq', 'http://localhost:4200/components/checkbox-toggle-doc');
    });

    it('Visits the Divider doc page on clicking on Divider in the sidebar', () => {
        cy.get('.navbar-item').contains('Divider').click();
        cy.url().should('eq', 'http://localhost:4200/components/divider-doc');
    });

    it('Visits the Dropdown doc page on clicking on Dropdown in the sidebar', () => {
        cy.get('.navbar-item').contains('Dropdown').click();
        cy.url().should('eq', 'http://localhost:4200/components/dropdown-doc');
    });

    it('Visits the Header doc page on clicking on Header in the sidebar', () => {
        cy.get('.navbar-item').contains('Header').click();
        cy.url().should('eq', 'http://localhost:4200/components/header-doc');
    });

    it('Visits the Input doc page on clicking on Input in the sidebar', () => {
        cy.get('.navbar-item').contains('Input').click();
        cy.url().should('eq', 'http://localhost:4200/components/input-doc');
    });

    it('Visits the Link doc page on clicking on Link in the sidebar', () => {
        cy.get('.navbar-item').contains('Link').click();
        cy.url().should('eq', 'http://localhost:4200/components/link-doc');
    });

    it('Visits the Notification-Dot doc page on clicking on Notification-Dot in the sidebar', () => {
        cy.get('.navbar-item').contains('Notification-Dot').click();
        cy.url().should('eq', 'http://localhost:4200/components/notification-dot-doc');
    });

    it('Visits the Radiobutton doc page on clicking on Radiobutton in the sidebar', () => {
        cy.get('.navbar-item').contains('Radiobutton').click();
        cy.url().should('eq', 'http://localhost:4200/components/radiobutton-doc');
    });

    it('Visits the Select doc page on clicking on Select in the sidebar', () => {
        cy.get('.navbar-item').contains('Select').click();
        cy.url().should('eq', 'http://localhost:4200/components/select-doc');
    });

    it('Visits the Table doc page on clicking on Table in the sidebar', () => {
        cy.get('.navbar-item').contains('Table').click();
        cy.url().should('eq', 'http://localhost:4200/components/table-doc');
    });

    it('Visits the Tags doc page on clicking on Tags in the sidebar', () => {
        cy.get('.navbar-item').contains('Tags').click();
        cy.url().should('eq', 'http://localhost:4200/components/tags-doc');
    });

    it('Visits the Tooltip doc page on clicking on Tooltip in the sidebar', () => {
        cy.get('.navbar-item').contains('Tooltip').click();
        cy.url().should('eq', 'http://localhost:4200/components/tooltip-doc');
    });

});
