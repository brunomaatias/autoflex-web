describe('Products Management', () => {
  const productCode = `PRD-${Date.now()}`;

  beforeEach(() => {
    cy.visit('/products');
  });

  it('should create a product with raw material association', () => {
    cy.contains('button', 'New').click();

    // product Info
    cy.get('input[name="code"]').type(productCode);
    cy.get('input[name="name"]').type('Industrial Table');
    cy.get('input[name="price"]').type('450');

    // associate Material
    // selects the first available raw material in the dropdown
    cy.get('select').select(1); 
    cy.get('input[type="number"]').last().clear().type('4');
    cy.contains('button', 'Add').click();

    // verify if added to the internal preview table
    cy.get('table').should('contain', '4');

    cy.contains('button', 'Save').click();

    cy.on('window:alert', (t) => {
      expect(t).to.contains('Product created successfully');
    });
  });

  it('should display the product in the list', () => {
    cy.contains('Industrial Table').should('be.visible');
  });
});