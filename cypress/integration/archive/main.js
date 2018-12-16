describe('main content', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:8080/archive/')
  })

  it('should have header', () => {
    cy.get('.test--header-nav')
  })

  it('should have content_wrapper', () => {
    cy.get('.test--content_wrapper')
      .and('have.css', 'max-width')
      .should('equal', '450px')
  })

  it('should have title', () => {
    cy.get('.test--content_wrapper')
      .find('h1')
      .should('contain', 'Frontend Weekend podcast archive')
  })

  it('should have at least 1 podcast', () => {
    cy.get('.test--podcast_link')
      .should('have.attr', 'href')
      .and('contain', 'episode')
  })

  it('should have footer', () => {
    cy.get('footer.test--footer')
  })
})
