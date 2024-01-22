
describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')

    const user = {
      name: 'Two User',
      username: 'user2',
      password: 'secretpassword'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)

    const user1 = {
      name: 'Another One',
      username: 'anotherone',
      password: 'secretpassword'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user1)

    cy.visit('http://localhost:5173')
  })

  it('Login form is shown', function() {
    cy.contains('Login')
    cy.get('#username')
    cy.get('#password')
    cy.get('#login-button')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('user2')
      cy.get('#password').type('secretpassword')
      cy.get('#login-button').click()
      cy.contains('Logged in as Two User')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('user2')
      cy.get('#password').type('no')
      cy.get('#login-button').click()
      cy.get('.error')
        .contains('invalid username or password')
      cy.contains('Login')
    })
  })


  describe('When logged in and two blogs exists', function() {
    beforeEach(function() {
      cy.login({ username: 'user2', password: 'secretpassword' })

      cy.createBlog({
        title: 'The zero blog',
        author: 'Zero Author',
        url: 'www.zeroblog.com'
      })
      cy.createBlog({
        title: 'The first blog',
        author: 'First Author',
        url: 'www.firstblog.com'
      })
    })

    it('A blog can be created', function() {
      cy.get('#show-button').click()
      cy.get('#title').type('Cypress testing')
      cy.get('#author').type('Cypher Cypress')
      cy.get('#url').type('www.cypress.com')
      cy.get('#save-button').click()
      cy.contains('Cypress testing - Cypher Cypress')
    })

    it('A blog can be liked', function() {
      cy.contains('The first blog - First Author')
        .find('#view-button')
        .click()
      cy.get('.blog').eq(1).should('contain', 'The first blog')
        .contains('likes 0')
        .find('.like-button')
        .click()
      cy.contains('likes 1')

    })
    it('A blog creator can remove their blog', function() {
      cy.contains('The zero blog - Zero Author')
        .find('#view-button').click()
      cy.get('.blog').eq(0).should('contain', 'The zero blog')
        .get('#delete-button').click()
      cy.contains('Blog removed.')
      cy.contains('The zero blog - Zero Author').should('not.exist')
    })

    it('Another one can not remove another users blog ', function() {
      cy.get('#logout-button').click()
      cy.contains('Logout successful')
      cy.login({ username: 'anotherone', password: 'secretpassword' })
      cy.contains('Logged in as Another One')
      cy.contains('The first blog - First Author')
        .find('#view-button')
        .click()
      cy.get('.blog').eq(1).should('contain', 'The first blog')
        .get('#delete-button').should('not.be.visible')

    })

    it('The blogs are ordered by amount of likes', function() {
      cy.contains('The first blog - First Author')
        .find('#view-button')
        .click()
      cy.get('.blog').eq(1).should('contain', 'The first blog')
        .find('.like-button')
        .click()
        .click()
      cy.get('.blog').eq(0).should('contain', 'The first blog')
      cy.contains('The zero blog - Zero Author')
        .find('#view-button')
        .click()
      cy.get('.blog').eq(1).should('contain', 'The zero blog')
        .find('.like-button')
        .click()
        .click()
        .click()
      cy.get('.blog').eq(0).should('contain', 'The zero blog')
      cy.get('.blog').eq(1).should('contain', 'The first blog')
    })
  })


})