/// <reference types='cypress' />

describe('iFrame', () => {
  it('Deve poder executar o vídeo de exemplo', () => {

    cy.start()
    cy.submitLoginForm('papito@webdojo.com','katana123')

    cy.goTo('Video', 'Video')

    cy.get('iframe[title="Video Player"]')
      .should('exist')
      .its('0.contentDocument.body')
      .then(cy.wrap)
      .as('iFramePlayer')

      cy.get('@iFramePlayer', {timeout: 5000})
        .find('.absolute, .inset-0, .flex, .items-center')
        .click()

  })
})