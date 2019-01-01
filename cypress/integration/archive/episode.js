describe('main content', () => {
  before(() => {
    cy.visit('http://127.0.0.1:8080/en/archive/')
    cy.get('.test--episode_link')
      .first()
      .click({force: true})
  })

  it('should have header', () => {
    cy.get('.test--header-nav')
  })

  it('should have wrapper', () => {
    cy.get('.test--episode_wrapper')
  })

  it('should have title', () => {
    cy.get('.test--episode_wrapper')
      .find('.test--episode_title')
  })


  it('should have stats', () => {
    cy.get('.test--episode_wrapper')
      .find('.test--stats_wrapper')
  })

  it('should have audio', () => {
    cy.get('.test--episode_wrapper')
      .find('.test--audio')
  })

  it('should have audio speed controls', () => {
    cy.get('.test--episode_wrapper')
      .find('.test--controls_wrapper')
    cy.get('.test--episode_wrapper')
      .find('.test--controls_title')
    cy.get('.test--episode_wrapper')
      .find('.test--x05speed')
    cy.get('.test--episode_wrapper')
      .find('.test--x1speed')
    cy.get('.test--episode_wrapper')
      .find('.test--x2speed')
  })

  it('should have episode description', () => {
    cy.get('.test--episode_wrapper')
      .find('.test--text_wraper')
  })

  it('should have timecodes in description', () => {
    cy.get('.test--episode_wrapper')
      .find('.test--text_wraper')
      .find('.test--timecode')
  })

  it('should have share btns', () => {
    cy.get('.test--episode_wrapper')
      .find('.test--share_wrapper')
  })

  it('should have footer', () => {
    cy.get('footer.test--footer')
  })
})
