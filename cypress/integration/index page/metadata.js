describe('metadata', () => {
    beforeEach(() => {
        cy.visit('http://127.0.0.1:8080/')
    })

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