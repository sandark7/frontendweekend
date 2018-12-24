describe('mobile version', () => {
  before(() => {
    cy.visit('http://127.0.0.1:8080/en/')
  })

  it('should have all widgets at 100% width', () => {
    cy.viewport('iphone-5')
    cy.get('.test--main_wrapper')
      .should('have.css', 'width')
      .and('lessThan', '321px')
    cy.get('iframe.test--yandex-money-embed')
      .should('have.css', 'width')
      .and('lessThan', '321px')
    cy.get('footer.test--footer')
      .should('have.css', 'width')
      .and('lessThan', '321px')
  })

  it('should have all text left aligned', () => {
    cy.viewport('iphone-5')
    cy.get('.test--donate_text')
      .should('have.css', 'text-align')
      .and('equals', 'left')
    cy.get('.test--footer-email_text')
      .should('have.css', 'text-align')
      .and('equals', 'left')
  })
})
