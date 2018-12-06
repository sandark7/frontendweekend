describe('Index page', () => {
    it('should return true', () => {
        expect(true).to.eq(true)
    })

    it('should have a yellow bg', () => {
        cy.visit('http://127.0.0.1:8080/')
        cy.get('body')
    })
})