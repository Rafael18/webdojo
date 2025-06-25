/// <reference types='cypress' />

import { personal, company } from '../fixtures/consultancy.json'

describe('Formulário de Consultoria', () => {

    // before(() => {
    //     cy.log('Isso acontece antes de todos os testes uma única vez')
    // })

    beforeEach(() => {
        cy.login()
        cy.goTo('Formulários', 'Consultoria')

        // cy.fixture('consultancy').as('consultancyData')
    })

    it('Deve solicitar consultoria individual', () => {


        // cy.get('#name').type('Rafael Batista')
        // cy.get('#email').type('rafaeltec_@live.com')
        // cy.get('input[type="email"]').type('rafaeltec_@live.com')
        // cy.get('#phone').type(81983379052)
        // cy.get('#consultancyType').select('inCompany')
        // cy.get('input[placeholder="000.000.000-00"')
        //     .type('08858796438')
        //     .should('have.value', '088.587.964-38')

        // const consultancyForm = consultancyData.personal

        cy.fillConsultancyForm(personal)

        cy.submitConsultancyForm()

        cy.vidalidadeConsultancyModal()

        // cy.contains('Sua solicitação de consultoria foi enviada com sucesso! Em breve, nossa equipe entrará em contato através do email fornecido.')
        //     .should('be.visible')

    })

    it('Deve solicitar consultoria In Company', () => {

        // const consultancyForm = consultancyData.company

        cy.fillConsultancyForm(company)

        cy.submitConsultancyForm()

        cy.vidalidadeConsultancyModal()

        cy.contains('Sua solicitação de consultoria foi enviada com sucesso! Em breve, nossa equipe entrará em contato através do email fornecido.')
            .should('be.visible')

    })

    it('Deve verificar os campos obrigatórios', () => {

        cy.submitConsultancyForm()

        const requiredFields = [
            { label: 'Nome Completo *', messege: 'Campo obrigatório' },
            { label: 'Email *', messege: 'Campo obrigatório' },
            { label: 'termos de uso *', messege: 'Você precisa aceitar os termos de uso' }
        ]

        requiredFields.forEach(({ label, messege }) => {
            cy.contains('label', label)
                .parent()
                .find('p')
                .should('be.visible')
                .should('have.text', messege)
                .and('have.class', 'text-red-400')
                .and('have.css', 'color', 'rgb(248, 113, 113)')
        })

    })

    // afterEach(() => {
    //     cy.log('Isso acontece após cada teste (afterEach)')
    // })

    // after(() => {
    //     cy.log('Isso acontece depois de todos os testes uma única vez')
    // })
})