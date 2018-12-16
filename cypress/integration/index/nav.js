describe('nav', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:8080/')
  })

  it('should have a nav header', () => {
    cy.get('.test--header-nav')
  })

  it('should have logo', () => {
    cy.get('.test--header_nav-logo')
  })

  it('should have about link', () => {
    cy.get('.test--header_nav-about')
      .should('have.attr', 'href')
      .and('contain', '/about/')
  })
})
