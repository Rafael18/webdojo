/// <reference types='cypress' />

describe('Validações de Alertas em JavaScript', () => {
    beforeEach(() => {
        cy.login()
        cy.goTo('Alertas JS', 'JavaScript Alerts')
    })

    it('Deve validar a mensagem de alerta', () => {

        cy.on('window:alert', (msg) => {
            expect(msg).to.equal('Olá QA, eu sou uma Alert Box!')
        })

        cy.contains('button', 'Mostrar Alert')
            .click()
    })

    it('Deve confirmar um diálogo e validar a resposta positiva', () => {

        cy.on('window:confirm', (msg) => {
            expect(msg).to.equal('Aperta um botão!')
            return true; //True simula o click no botão OK
        })
        cy.contains('button', 'Mostrar Confirm').click()
    })

    it('Deve cancelar um diálogo e validar a resposta negativa', () => {
        cy.on('window:confirm', (msg) => {
            expect(msg).to.equal('Aperta um botão!')
            return false; //False simula o click no botão Cancelar
        })

        cy.on('window:alert', (msg) => {
            expect(msg).to.equal('Você cancelou!')
        })

        cy.contains('button', 'Mostrar Confirm').click()
    })

    it.only('Deve interagir com um prompt, inserir um texto e validar uma mensagem', () => {
        cy.window().then((win) => {
            cy.stub(win, 'prompt').returns('Rafael')
        })

        cy.on('window:alert', (msg) => {
            expect(msg).to.equal('Olá Rafael! Boas vindas ao WebDojo!')
        })

        cy.contains('button', 'Mostrar Prompt').click()

    })
})