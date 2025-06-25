/// <reference types='cypress' />

describe('Gerenciamento de Perfis no Github', () => {
    beforeEach(() => {
        cy.login()
        cy.goTo('Tabela', 'Perfis do GitHub')
    })

    it('Deve poder cadastrar um novo perfil do GitHub', () => {
        cy.get('#name').type('Rafael Batista')
        cy.get('#username').type('Rafael18')
        cy.get('#profile').type('QA')
        cy.contains('button', 'Adicionar Perfil')
            .click()

        cy.contains('table tbody tr', 'Rafael18')
            .should('be.visible')
            .as('trProfile')

        cy.get('@trProfile')
            .contains('Rafael Batista')
            .should('be.visible')

        cy.get('@trProfile')
            .contains('QA')
            .should('be.visible')


    })

    it('Deve poder remover um perfil do GitHub', () => {
        const profile = {
            name: 'Rafael Batista',
            username: 'Rafael18',
            profile: 'QA'
        }

        // Cadastrar massa para teste
        cy.get('#name').type(profile.name)
        cy.get('#username').type(profile.username)
        cy.get('#profile').type(profile.profile)
        cy.contains('button', 'Adicionar Perfil')
            .click()

        // Executar exclusão da massa
        cy.contains('table tbody tr', profile.username)
            .should('be.visible')
            .as('trProfile')

        cy.get('@trProfile')
            .find('button[title="Remover perfil"]')
            .click()

        cy.contains('table tbody', profile.username)
            .should('not.exist')
    })

    it.only('Deve validar o link do GitHub', () => {
        const profile = {
            name: 'Rafael Batista',
            username: 'Rafael18',
            profile: 'QA'
        }

        // Cadastrar massa para teste
        cy.get('#name').type(profile.name)
        cy.get('#username').type(profile.username)
        cy.get('#profile').type(profile.profile)
        cy.contains('button', 'Adicionar Perfil')
            .click()

        // Executar exclusão da massa
        cy.contains('table tbody tr', profile.username)
            .should('be.visible')
            .as('trProfile')

        cy.get('@trProfile')
            .find('a[href="https://github.com/' +profile.username+'"]')
            // .click()
            .should('have.attr','href','https://github.com/'+profile.username)
            .and('have.attr', 'target', '_blank')
    })
})