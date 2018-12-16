describe('metadata', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:8080/')
  })

  it('should have a favicon', () => {
    cy.root()
      .find('link[rel~=icon]')
  })

  it('should have a valid title', () => {
    cy.root()
      .find('title')
      .should('contain', 'Frontend Weekend podcast')
  })

  it('should have valid meta descr', () => {
    cy.get('head meta[name="description"]')
      .should('have.attr', 'content', 'Самые честные интервью с известными людьми из мира web-разработки. Впечатляющие истории успеха, забавные моменты из жизни и полезные советы – мы показываем человеческое лицо frontend’а и не только.')
  })
})
