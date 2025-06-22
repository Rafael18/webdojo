/// <reference types="cypress" />

describe('Login', () => {
  it('Deve logar com sucesso', () => {
    cy.start()
    cy.submitLoginForm('papito@webdojo.com', 'katana123')

    cy.get('[data-cy="user-name"]')
      .should('be.visible')
      .and('have.text', 'Fernando Papito')

    cy.get('[data-cy="welcome-message"]')
      .should('be.visible')
      .and('have.text', 'Olá QA, esse é o seu Dojo para aprender Automação de Testes.')

  })

  it.skip('Não deve logar com senha inválida', () => {
    cy.start()
    cy.submitLoginForm('papito@webdojo.com', 'katana321')

    cy.contains('Acesso negado! Tente novamente.')
    .should('be.visible')

  })

  it('Não deve logar com e-mail não cadastrado', () => {
    cy.start()
    cy.submitLoginForm('dojo@webdojo.com', 'katana123')

    cy.contains('Acesso negado! Tente novamente.')
    .should('be.visible')

  })
})