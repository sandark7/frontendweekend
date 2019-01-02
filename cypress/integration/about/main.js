import ENlang from '../../../locale/en/messages.json'
/* global describe, before, cy, it */
describe('main content', () => {
  before(() => {
    cy.visit('http://127.0.0.1:8080/en/')
      .get('.test--header_nav-about')
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
      .should('contain', ENlang.site_description)
  })

  it('should have host info', () => {
    cy.get('.test--host_photo')
      .should('have.attr', 'src')
      .and(
        'equal',
        'https://avatars0.githubusercontent.com/u/13529513?s=460&v=4'
      )
  })

  it('should have footer', () => {
    cy.get('footer.test--footer')
  })
})
