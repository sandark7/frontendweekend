describe('index page', () => {
    beforeEach(() => {
        cy.visit('http://127.0.0.1:8080/')
    })

    describe('metadata', () => {
        it('should have a favicon', () => {
            cy.root()
                .find('link[rel=icon]')
        })

        it('should have a valid title', () => {
            cy.root()
                .find('title')
                    .should('contain', 'Frontend Weekend podcast')
        })
    })

    describe('main content', () => {
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
    
        it('should have Soundcloud embedded player', () => {
            cy.get('iframe.test--sc-embedded-player')
                .as('sc-embedded-player')
            cy.get('@sc-embedded-player')
                .should('have.attr', 'src')
                .and('equal', 'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/users/306455261&color=%23ff5500&auto_play=false&hide_related=false&show_comments=false&show_user=true&show_reposts=false&show_teaser=false')
            cy.get('@sc-embedded-player')
                .should('have.attr', 'width')
                .and('equal', '450')
            cy.get('@sc-embedded-player')
                .should('have.attr', 'height')
                .and('equal', '345')
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
    
    })

    
    describe('footer', () => {

        it('should have correct css', () => {
            cy.get('footer.test--footer')
                .should('have.css', 'text-align')
                .and('equal', 'center')
        })

        it('should have patreon link', () => {
            cy.get('footer.test--footer')
                .find('a.test--patreon-link')
                .as('patreon-link')
            cy.get('@patreon-link')
                .should('have.attr', 'href')
                .and('equal', 'https://www.patreon.com/frontendweekend')
            cy.get('@patreon-link')
                .should('contain', 'Patreon')
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
        })
    })

    describe('mobile version', () => {

        it('should have all widgets at 100% width', () => {
            cy.viewport('iphone-5')
            cy.get('iframe.test--sc-embedded-player')
                .should('have.css', 'width')
                .and('equal', '304px')
            cy.get('iframe.test--yandex-money-embed')
                .should('have.css', 'width')
                .and('equal', '304px')
            cy.get('footer.test--footer')
                .should('have.css', 'width')
                .and('equal', '304px')
        })

    })
})