describe('Production Planning', () => {
  it('should load production suggestions from the API', () => {
    cy.visit('/production-plan');

    // verify if the table headers are present
    cy.contains('th', 'Product').should('be.visible');
    cy.contains('th', 'Quantity Possible').should('be.visible');

    // wait for the API response and check if data is rendered
    // if DB is empty, it will show "No data available"
    cy.get('body').then(($body) => {
      if ($body.find('td').length > 0) {
        cy.get('table tbody tr').should('have.length.at.least', 1);
      } else {
        cy.contains('No data available').should('be.visible');
      }
    });
  });
});