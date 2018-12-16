describe('main content', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:8080/archive/')
    cy.get('.test--podcast_link')
      .first()
      .click({force: true})
  })

  it('should have header', () => {
    cy.get('.test--header-nav')
  })

  it('should have wrapper', () => {
    cy.get('.test--wrapper')
  })

  it('should have title', () => {
    cy.get('.test--wrapper')
      .find('.test--episode_title')
  })

  it('should have audio', () => {
    cy.get('.test--wrapper')
      .find('.test--audio')
  })

  it('should have episode description', () => {
    cy.get('.test--wrapper')
      .find('.test--text_wraper')
  })

  it('should have footer', () => {
    cy.get('footer.test--footer')
  })
})
