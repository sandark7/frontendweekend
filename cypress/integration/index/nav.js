describe('nav', () => {
  before(() => {
    cy.visit('http://127.0.0.1:8080/en/')
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

  it('should have lang switcher', () => {
    cy.get('.test--lang_list')
      .should('have.css', 'cursor')
      .and('equal', 'pointer')
    cy.get('.test--lang_item')
    cy.get('.test--lang_btn')
  })

  it('should have lang switcher working', () => {
    cy.get('.test--lang_list')
      .find('.test--lang_btn[data-lang="ru"]')
      .click({ force: true })
    cy.url()
      .should('contain', '/ru/')
  })
})
