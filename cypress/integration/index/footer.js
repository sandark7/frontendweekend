describe('footer', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:8080/')
  })

  it('should have correct css', () => {
    cy.get('footer.test--footer')
      .should('have.css', 'text-align')
      .and('equal', 'center')
    cy.get('footer.test--footer')
      .should('have.css', 'max-width')
      .and('equal', '450px')
    cy.get('footer.test--footer')
      .should('have.css', 'margin-bottom')
      .and('equal', '20px')
  })

  it('should have contact email address', () => {
    cy.get('footer.test--footer')
      .find('a.test--email-link')
      .as('email-link')
    cy.get('@email-link')
      .should('have.attr', 'href')
      .and('equal', 'mailto:pr@frontendweekend.ml')
    cy.get('@email-link')
      .should('contain', 'pr@frontendweekend.ml')
    cy.get('footer.test--footer')
      .find('a.gtm--email-link')
  })

  it('should have gh issues address', () => {
    cy.get('footer.test--footer')
      .find('a.test--gh-link')
      .as('gh-link')
    cy.get('@gh-link')
      .should('have.attr', 'href')
      .and('contain', 'frontendweekend/issues')
    cy.get('footer.test--footer')
      .find('a.gtm--gh-link')
  })
})
