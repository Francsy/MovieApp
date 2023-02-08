describe('Create a user account, login, search a movie, then add it to favourites, see the favourites list and delete the movie from it', () => {
  it('Can do everything explained above', () => {
    cy.visit('http://localhost:3000/');
    cy.get('body > a').click();
    cy.get('body > div:nth-child(3) > form > input.emailForm').type("express@testing.com");
    cy.get('body > div:nth-child(3) > form > input:nth-child(2)').type("fT5?fslT%c");
    cy.get('body > div:nth-child(3) > form > input:nth-child(3)').type("fT5?fslT%c");
    cy.get('body > div:nth-child(3) > form > input[type=radio]:nth-child(5)').click();
    cy.get('body > div:nth-child(3) > form > input[type=submit]:nth-child(8)').click();
    cy.get('body > div:nth-child(3) > form > input.emailForm').type("express@testing.com");
    cy.get('body > div:nth-child(3) > form > input.passwordForm').type("fT5?fslT%c");
    cy.get('body > div:nth-child(3) > form > input[type=submit]:nth-child(4)').click();
    cy.get('body > main > form > img').click();
    cy.get('body > main > form > input').type("matrix{enter}");
    cy.get('body > main > section > article:nth-child(1) > a').click();
    cy.get('#saveFav').click();
    cy.get('#burger').click();
    cy.get('body > nav > ul > li:nth-child(1) > a').click();
    cy.get('.delete-fav').click();
    cy.get('#confirm-delete').click();
  })
})