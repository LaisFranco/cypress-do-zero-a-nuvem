describe('Central de Atendimento ao Cliente TAT', () => {
  beforeEach(() => {
    cy.visit('./src/index.html') // Acesse a página
    cy.get('form').trigger('reset')
    cy.reload()
  })

  it('verifica o título da aplicação', () => {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT'); // Verifique o título
  })

  it('preenche os campos obrigatórios e envia o formulário', () => {
    const longText = Cypress._.repeat('ábacdefghijlkmntuvxzyw', 10)
    cy.get('#firstName').type('Lais')
    cy.get('#lastName').type('Oliveira')
    cy.get('#email').type('teste@teste.com.br')
    cy.get('#product').select(4)
    cy.contains('Elogio').click()
    cy.get('#open-text-area').type(longText, { delay: 0 })
    cy.get('button[type="submit"]').click()

    cy.get('.success').should('be.visible')
  })

  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    const longText = Cypress._.repeat('ábacdefghijlkmntuvxzyw', 10)
    cy.get('#firstName').type('Lais')
    cy.get('#lastName').type('Oliveira')
    cy.get('#email').type('teste@teste,com.br'); // E-mail inválido
    cy.get('#open-text-area').type(longText, { delay: 0 });
    cy.get('button[type="submit"]').click()
    cy.get('.error').should('be.visible')
    cy.wait(10000)
  })

  it.only('campo telefone continua vazio quando preenchido com valor nao numerico', () => {
    cy.get('#phone')
      .type('abacd')
      .should('have.value', '')
    })
  it.only('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    const longText = Cypress._.repeat('ábacdefghijlkmntuvxzyw', 10)
    cy.get('#firstName').type('Lais')
    cy.get('#lastName').type('Oliveira')
    cy.get('#email').type('teste@teste.com.br')
    cy.get('#phone-checkbox').click() 
    cy.get('#open-text-area').type(longText, { delay: 0 })
    cy.get('button[type="submit"]').click()

    cy.get('.error').should('be.visible')
  })
})