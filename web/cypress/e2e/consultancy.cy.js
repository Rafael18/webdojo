describe('Formulário de Consultoria', () => {

    it('Deve solicitar consultoria individual', () => {
        cy.start()
        cy.submitLoginForm('papito@webdojo.com', 'katana123')

        cy.goTo('Formulários', 'Consultoria')

        // cy.get('#name').type('Rafael Batista')
        // cy.get('#email').type('rafaeltec_@live.com')
        // cy.get('input[type="email"]').type('rafaeltec_@live.com')
        // cy.get('#phone').type(81983379052)
        // cy.get('#consultancyType').select('inCompany')
        // cy.get('input[placeholder="000.000.000-00"')
        //     .type('08858796438')
        //     .should('have.value', '088.587.964-38')

        cy.get('input[placeholder="Digite seu nome completo"]')
            .type('Rafael Batista')

        cy.get('input[placeholder="Digite seu email"]').type('rafaeltec_@live.com')

        cy.get('input[placeholder="(00) 00000-0000"]').type('81 98337-9052')
            .should('have.value', '(81) 98337-9052')

        cy.contains('label', 'Tipo de Consultoria')
            .parent()
            .find('select')
            .select('Individual')

        cy.contains('label', 'Pessoa Física')
            .find('input')
            .click()
            .should('be.checked')

        cy.contains('label', 'Pessoa Jurídica')
            .find('input')
            .should('be.not.checked')

        cy.contains('label', 'CPF')
            .parent()
            .find('input')
            .type('08858796438')
            .should('have.value', '088.587.964-38')

        const discoveryChannels = [
            'Instagram',
            'LinkedIn',
            'Udemy',
            'YouTube',
            'Indicação de Amigo'
        ]

        // Loop para preencher os checkboxs
        discoveryChannels.forEach((channel) => {

            cy.contains('label', channel)
                .find('input')
                .check()
                .should('be.checked')

        })

        cy.get('input[type="file"]')
            .selectFile('./cypress/fixtures/teste_upload.pdf', { force: true })

        cy.get('textarea[placeholder="Descreva mais detalhes sobre sua necessidade"]')
            .type('Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.')

        const techs = [
            'Cypress',
            'Selenium',
            'WebDriverIO',
            'Playwright',
            'Robot Framework'
        ]

        techs.forEach((tech) => {

            cy.get('input[placeholder="Digite uma tecnologia e pressione Enter"')
                .type(tech)
                .type('{enter}')

            cy.contains('label', 'Tecnologias')
                .parent()
                .contains('span', tech)
                .should('be.visible')
        })

        cy.contains('label', 'termos de uso')
            .find('input')
            .check()

        cy.contains('button', 'Enviar formulário')
            .click()
        
        cy.get('.modal')
            .should('be.visible', {timeout: 7000})
            .find('.modal-content')
            .should('be.visible')
            .and('have.text', 'Sua solicitação de consultoria foi enviada com sucesso! Em breve, nossa equipe entrará em contato através do email fornecido.')

        // cy.contains('Sua solicitação de consultoria foi enviada com sucesso! Em breve, nossa equipe entrará em contato através do email fornecido.')
        //     .should('be.visible')

    })

    it('Deve verificar os campos obrigatórios', () => {
        cy.start()
        cy.submitLoginForm('papito@webdojo.com', 'katana123')

        cy.goTo('Formulários', 'Consultoria')

        cy.contains('button', 'Enviar formulário')
            .click()

        cy.get('#name')
            .parent()
            .contains('p', 'Campo obrigatório')
            .should('be.visible')
            .and('have.class', 'text-red-400')
            .and('have.css', 'color','rgb(248, 113, 113)')

        cy.get('#email')
            .parent()
            .contains('p', 'Campo obrigatório')
            .should('be.visible')
            .and('have.class', 'text-red-400')
            .and('have.css', 'color','rgb(248, 113, 113)')

        cy.contains('p', 'Você precisa aceitar os termos de uso')
            .should('be.visible')
            .and('have.class', 'text-red-400')
            .and('have.css', 'color','rgb(248, 113, 113)')
    })
})