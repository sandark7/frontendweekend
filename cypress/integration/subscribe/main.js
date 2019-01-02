import ENlang from '../../../locale/en/messages.json'
/* global describe, before, cy, it */
describe('main content', () => {
  before(() => {
    cy.visit('http://127.0.0.1:8080/en/')
      .get('.test--header_nav-subscribe')
      .click()
  })

  it('should have header', () => {
    cy.get('.test--header-nav')
  })

  it('should have content_wrapper', () => {
    cy.get('.test--content_wrapper')
      .and('have.css', 'max-width')
      .should('equal', '450px')
  })

  it('should have podcast description', () => {
    cy.get('.test--podcast_description')
      .should('contain', ENlang.subscribe_page_description)
  })

  it('should have subscription links', () => {
    cy.get('.test--list')
      .find('.test--list_item')
    cy.get('.test--list')
      .find('.test--link')
  })

  it('should have footer', () => {
    cy.get('footer.test--footer')
  })
})
