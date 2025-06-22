/// <reference types='cypress' />

describe('Links abrindo noca guia/janela', () => {
    it('Validando o atributo do link', () => {

        cy.viewport(1280, 720)
        cy.intercept('GET', 'https://298279967.log.optimizely.com/event*', {
            statusCode: 200,
            body: {
                sucesso: true,
                dados: []
            }
        }).as('mockReturn')


        cy.visit('https://the-internet.herokuapp.com/windows')

        cy.get('#content')
            .find('a')
            .should('have.attr', 'href', '/windows/new')
            .and('have.attr','target', '_blank')
            // .click()

    })
})

describe('Acessa link com termo de uso removendo o _blank', () => {
    it.only('Validando o atributo do link', () => {

        cy.viewport(1280, 720)
        cy.intercept('GET', 'https://298279967.log.optimizely.com/event*', {
            statusCode: 200,
            body: {
                sucesso: true,
                dados: []
            }
        }).as('mockReturn')


        cy.visit('https://the-internet.herokuapp.com/windows')

        cy.get('#content')
            .find('a')
            .should('have.attr', 'href', '/windows/new')
            .and('have.attr','target', '_blank')
            .invoke('removeAttr', 'target')
            .click()

        cy.contains('New Window')
            .should('be.visible')

    })
})