/// <reference types='cypress' />

import {personal, company} from '../fixtures/consultancy.json'

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

        cy.get('input[placeholder="Digite seu nome completo"]')
            .type(personal.name)

        cy.get('input[placeholder="Digite seu email"]')
            .type(personal.email)

        cy.get('input[placeholder="(00) 00000-0000"]')
            .type(personal.phone)
        // .should('have.value', '(81) 98337-9052')

        cy.contains('label', 'Tipo de Consultoria')
            .parent()
            .find('select')
            .select(personal.consultancyType)

        if (personal.personType === 'CPF') {

            cy.contains('label', 'Pessoa Física')
                .find('input')
                .click()
                .should('be.checked')

            cy.contains('label', 'Pessoa Jurídica')
                .find('input')
                .should('be.not.checked')
        }

        if (personal.personType === 'cnpj') {
            cy.contains('label', 'Pessoa Jurídica')
                .find('input')
                .should('be.not.checked')

            cy.contains('label', 'Pessoa Física')
                .find('input')
                .click()
                .should('be.checked')
        }

        cy.contains('label', 'CPF')
            .parent()
            .find('input')
            .type(personal.document)
        // .should('have.value', '088.587.964-38')

        // Loop para preencher os checkboxs
        personal.discoveryChannels.forEach((channel) => {

            cy.contains('label', channel)
                .find('input')
                .check()
                .should('be.checked')

        })

        cy.get('input[type="file"]')
            .selectFile(personal.file, { force: true })

        cy.get('textarea[placeholder="Descreva mais detalhes sobre sua necessidade"]')
            .type(personal.description)

        personal.techs.forEach((tech) => {

            cy.get('input[placeholder="Digite uma tecnologia e pressione Enter"')
                .type(tech)
                .type('{enter}')

            cy.contains('label', 'Tecnologias')
                .parent()
                .contains('span', tech)
                .should('be.visible')
        })

        if (personal.terms === true) {
            cy.contains('label', 'termos de uso')
                .find('input')
                .check()
        }

        cy.contains('button', 'Enviar formulário')
            .click()

        cy.get('.modal')
            .should('be.visible', { timeout: 7000 })
            .find('.modal-content')
            .should('be.visible')
            .and('have.text', 'Sua solicitação de consultoria foi enviada com sucesso! Em breve, nossa equipe entrará em contato através do email fornecido.')

        // cy.contains('Sua solicitação de consultoria foi enviada com sucesso! Em breve, nossa equipe entrará em contato através do email fornecido.')
        //     .should('be.visible')

    })

    it('Deve solicitar consultoria In Company', () => {

        // const consultancyForm = consultancyData.company

        cy.get('input[placeholder="Digite seu nome completo"]')
            .type(company.name)

        cy.get('input[placeholder="Digite seu email"]')
            .type(company.email)

        cy.get('input[placeholder="(00) 00000-0000"]')
            .type(company.phone)
        // .should('have.value', '(81) 98337-9052')

        cy.contains('label', 'Tipo de Consultoria')
            .parent()
            .find('select')
            .select(company.consultancyType)

        if (company.personType === 'cpf') {

            cy.contains('label', 'Pessoa Física')
                .find('input')
                .click()
                .should('be.checked')

            cy.contains('label', 'Pessoa Jurídica')
                .find('input')
                .should('be.not.checked')
        }

        if (company.personType === 'cnpj') {
            cy.contains('label', 'Pessoa Jurídica')
                .find('input')
                .click()
                .should('be.checked')

            cy.contains('label', 'Pessoa Física')
                .find('input')
                .should('be.not.checked')
        }

        cy.contains('label', 'CNPJ')
            .parent()
            .find('input')
            .type(company.document)
        // .should('have.value', '088.587.964-38')

        // Loop para preencher os checkboxs
        company.discoveryChannels.forEach((channel) => {

            cy.contains('label', channel)
                .find('input')
                .check()
                .should('be.checked')

        })

        cy.get('input[type="file"]')
            .selectFile(company.file, { force: true })

        cy.get('textarea[placeholder="Descreva mais detalhes sobre sua necessidade"]')
            .type(company.description)

        company.techs.forEach((tech) => {

            cy.get('input[placeholder="Digite uma tecnologia e pressione Enter"')
                .type(tech)
                .type('{enter}')

            cy.contains('label', 'Tecnologias')
                .parent()
                .contains('span', tech)
                .should('be.visible')
        })

        if (company.terms === true) {
            cy.contains('label', 'termos de uso')
                .find('input')
                .check()
        }

        cy.contains('button', 'Enviar formulário')
            .click()

        cy.get('.modal')
            .should('be.visible', { timeout: 7000 })
            .find('.modal-content')
            .should('be.visible')
            .and('have.text', 'Sua solicitação de consultoria foi enviada com sucesso! Em breve, nossa equipe entrará em contato através do email fornecido.')

        cy.contains('Sua solicitação de consultoria foi enviada com sucesso! Em breve, nossa equipe entrará em contato através do email fornecido.')
            .should('be.visible')

    })

    it('Deve verificar os campos obrigatórios', () => {

        cy.contains('button', 'Enviar formulário')
            .click()

        cy.get('#name')
            .parent()
            .contains('p', 'Campo obrigatório')
            .should('be.visible')
            .and('have.class', 'text-red-400')
            .and('have.css', 'color', 'rgb(248, 113, 113)')

        cy.get('#email')
            .parent()
            .contains('p', 'Campo obrigatório')
            .should('be.visible')
            .and('have.class', 'text-red-400')
            .and('have.css', 'color', 'rgb(248, 113, 113)')

        cy.contains('p', 'Você precisa aceitar os termos de uso')
            .should('be.visible')
            .and('have.class', 'text-red-400')
            .and('have.css', 'color', 'rgb(248, 113, 113)')
    })

    afterEach(() => {
        cy.log('Isso acontece após cada teste (afterEach)')
    })

    // after(() => {
    //     cy.log('Isso acontece depois de todos os testes uma única vez')
    // })
})