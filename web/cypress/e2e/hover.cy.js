/// <reference types="cypress" />

describe('Simulando MouseHover', () => {
    it('Deve mostrar um texto ao passar o mouse sobre o link', () => {
        cy.visit('http://uitestingplayground.com/mouseover')

        cy.contains('a', 'Click me').realHover()

        // cy.contains('a', 'Link Button').realHover()
    })
})
