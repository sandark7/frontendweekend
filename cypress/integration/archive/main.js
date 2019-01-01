import ENlang from '../../../locale/en/messages.json'

describe('main content', () => {
  before(() => {
    cy.visit('http://127.0.0.1:8080/en/archive/')
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
      .should('contain', ENlang.archive_page_title)
  })

  it('should have at least 1 podcast', () => {
    cy.get('.test--episode_link')
      .should('have.attr', 'href')
      .and('contain', 'episode')
  })

  it('should have footer', () => {
    cy.get('footer.test--footer')
  })
})
