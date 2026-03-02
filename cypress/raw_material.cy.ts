/// <reference types="cypress" />
describe('Raw Materials Management', () => {
  const uniqueCode = `RM-${Date.now()}`;

  beforeEach(() => {
    cy.visit('/raw-materials'); 
  });

  it('should create a new raw material successfully', () => {
    cy.contains('button', 'New').click();
    
    cy.get('input[name="code"]').type(uniqueCode);
    cy.get('input[name="name"]').type('Steel Sheet');
    cy.get('input[name="stockQuantity"]').clear().type('100');
    
    cy.contains('button', 'Save').click();

    cy.on('window:alert', (t) => {
      expect(t).to.contains('Raw Material created successfully');
    });

    cy.contains('Steel Sheet').should('be.visible');
  });

  it('should edit an existing raw material', () => {
    cy.contains('td', 'Steel Sheet')
      .parent()
      .find('button.text-yellow-600')
      .click();

    cy.get('input[name="name"]').clear().type('Updated Steel Sheet');
    cy.contains('button', 'Save').click();

    cy.contains('Updated Steel Sheet').should('be.visible');
  });
});