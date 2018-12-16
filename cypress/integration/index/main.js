describe('main content', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:8080/')
  })

  it('should have a correct body css', () => {
    cy.get('body')
      .should('have.css', 'background-color')
      .and('equal', 'rgb(247, 223, 29)')
    cy.get('body')
      .should('have.css', 'font-size')
      .and('equal', '14px')
  })

  it('should have a wrapper', () => {
    cy.get('.test--wrapper')
      .should('have.css', 'display')
      .and('equal', 'flex')

    cy.get('.test--wrapper')
      .should('have.css', 'flex-direction')
      .and('equal', 'column')

    cy.get('.test--wrapper')
      .should('have.css', 'justify-content')
      .and('equal', 'center')

    cy.get('.test--wrapper')
      .should('have.css', 'align-items')
      .and('equal', 'center')
  })

  it('should have latest episode featured', () => {
    cy.get('.test--main_wrapper')
      .as('main_wrapper')
    cy.get('@main_wrapper')
      .find('.test--audio')
    cy.get('@main_wrapper')
      .find('.test--show_more')
      .first()
      .click()
    cy.get('@main_wrapper')
      .find('.test--text_wraper')
  })

  it('should have more episodes link', () => {
    cy.get('.test--header_nav-archive')
      .find('span')
      .should('contain', 'More episodes')
  })

  it('should have Yandex money embedded widget', () => {
    cy.get('iframe.test--yandex-money-embed')
      .as('yandex-money-embed')
    cy.get('@yandex-money-embed')
      .should('have.attr', 'src')
      .and('equal', 'https://money.yandex.ru/quickpay/shop-widget?writer=seller&targets=Frontend%20Weekend&targets-hint=&default-sum=500&button-text=14&payment-type-choice=on&fio=on&hint=&successURL=&quickpay=shop&account=410015721260448')
    cy.get('@yandex-money-embed')
      .should('have.attr', 'width')
      .and('equal', '450')
    cy.get('@yandex-money-embed')
      .should('have.attr', 'height')
      .and('equal', '213')
  })

  it('should have patreon link', () => {
    cy.get('.test--donate-wrapper')
      .find('a.test--patreon-link')
      .as('patreon-link')
    cy.get('@patreon-link')
      .should('have.attr', 'href')
      .and('equal', 'https://www.patreon.com/frontendweekend')
    cy.get('@patreon-link')
      .should('contain', 'Patreon')
    cy.get('.test--donate-wrapper')
      .find('a.gtm--patreon-link')
  })
})
