describe('Index page', () => {
    beforeEach(() => {
        cy.visit('http://127.0.0.1:8080/')
    })

    it('should have a yellow bg', () => {
        cy.get('body')
            .should('have.css', 'background-color')
            .and('equal', 'rgb(247, 223, 29)')
    })

    it('should have Soundcloud embedded player', () => {
        cy.get('iframe.test--sc-embedded-player')
            .should('have.attr', 'src')
            .and('equal', 'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/users/306455261&color=%23ff5500&auto_play=false&hide_related=false&show_comments=false&show_user=true&show_reposts=false&show_teaser=false')
    })

    it('should have Yandex money embedded widget', () => {
        cy.get('iframe.test--yandex-money-embed')
            .should('have.attr', 'src')
            .and('equal', 'https://money.yandex.ru/quickpay/shop-widget?writer=seller&targets=Frontend%20Weekend&targets-hint=&default-sum=500&button-text=14&payment-type-choice=on&fio=on&hint=&successURL=&quickpay=shop&account=410015721260448')
    })

    describe('index page footer', () => {

        it('should have patreon link', () => {
            cy.get('footer')
                .find('a.test--patreon-link')
                .as('patreon-link')
            cy.get('@patreon-link')
                .should('have.attr', 'href')
                .and('equal', 'https://www.patreon.com/frontendweekend')
            cy.get('@patreon-link')
                .should('contain', 'Patreon')
        })

        it('should have contact email address', () => {
            cy.get('footer')
                .find('a.test--email-link')
                .as('email-link')
            cy.get('@email-link')
                .should('have.attr', 'href')
                .and('equal', 'mailto:pr@frontendweekend.ml')
            cy.get('@email-link')
                .should('contain', 'pr@frontendweekend.ml')
        })
    })

})