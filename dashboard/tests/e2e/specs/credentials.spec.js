const APP_URL = process.env.APP_URL || 'http://localhost:8080'

describe('Credentials', () =>{
    it('should generate api_key', () => {
      cy.visit(APP_URL)

      cy.get('#header-login-button').click()
      cy.get('#modal-login').click()

      cy.get('#login-email-field').type('igor@igor.me')
      cy.get('#login-password-field').type('1234')
      cy.get('#login-submit-button').click()

      cy.wait(4000)
      cy.visit(`${APP_URL}/Credentials`)
      cy.wait(2000)

      const oldApikey = cy.get('#apikey').invoke('text')
      cy.get('#generate-apikey').click()
      cy.wait(2000)
      const newApikey = cy.get('#apikey').invoke('text')

      expect(oldApikey).to.not.equal(newApikey)
    })
})
