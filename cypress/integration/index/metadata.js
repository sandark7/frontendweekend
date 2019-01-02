import ENlang from '../../../locale/en/messages.json'
/* global describe, before, cy, it */
describe('metadata', () => {
  before(() => {
    cy.visit('http://127.0.0.1:8080/en/')
  })

  it('should have a favicon', () => {
    cy.root()
      .find('link[rel~=icon]')
  })

  it('should have a valid title', () => {
    cy.root()
      .find('title')
      .should('contain', ENlang.site_title)
  })

  it('should have valid meta descr', () => {
    cy.get('head meta[name="description"]')
      .should('have.attr', 'content', ENlang.site_description)
  })

  it('should have valid meta keywords', () => {
    cy.get('head meta[name="keywords"]')
      .should('have.attr', 'content', ENlang.site_keywords)
  })

  it('should have a sitemap', () => {
    cy.request('http://127.0.0.1:8080/sitemap.xml')
      .its('body')
      .should('contain', 'schemas/sitemap')
  })

  it('should have https only resources', () => {
    cy.get('[src]')
      .should('have.attr', 'src')
      .and('contain', 'https://')
  })

  it('should redirect to en lang by default', () => {
    cy.visit('http://127.0.0.1:8080/')
    cy.url()
      .should('contain', '/en/')
  })
})
