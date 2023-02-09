describe('Create a user account, login, search a movie, then add it to favourites, see the favourites list and delete the movie from it', () => {
  it('Can do everything explained above', () => {
    cy.visit('http://localhost:3000/');
    cy.get('body > main > a:nth-child(4)').click();
    cy.get('body > main > form > input.emailForm').type("express@testing.com");
    cy.get('body > main > form > input:nth-child(3)').type("fT5?fslT%c");
    cy.get('body > main > form > input:nth-child(4)').type("fT5?fslT%c");
    cy.get('body > main > form > div > input[type=radio]:nth-child(1)').click();
    cy.get('body > main > form > input[type=submit]:nth-child(6)').click();
    cy.get('body > main > form > input.emailForm').type("express@testing.com");
    cy.get('body > main > form > input.passwordForm').type("fT5?fslT%c");
    cy.get('body > main > form > input[type=submit]:nth-child(4)').click();
    cy.get('body > main > form > img').click();
    cy.get('body > main > form > div > input[type=text]:nth-child(1)').type("matrix{enter}");
    cy.get('body > main > section > article:nth-child(1) > a').click();
    cy.get('#saveFav').click();
    cy.get('#formatHeader > label').click();
    cy.get('#formatHeader > div.nav > div > nav > a:nth-child(1)').click();
    cy.get('.delete-fav').click();
    cy.get('#confirm-delete').click();
  })
})