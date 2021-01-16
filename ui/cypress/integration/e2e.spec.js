// <reference types="Cypress" />

describe("Sanity tests", () => {
  beforeEach(() => {
    cy.intercept("GET", "/api/v1/answer").as("v1APIanswer")
    cy.intercept("GET", "/api/v1/question").as("v1APIquestion")
    cy.visit("/")
  })

  it("loads and refreshes property", () => {
    cy.wait("@v1APIquestion")
    cy.wait("@v1APIanswer")
    cy.findAllByText("Cards Against Containers").should("be.visible")
    cy.get("[data-cy*='question-']").should("be.visible")
    cy.get("[data-cy*='answer-']").should("be.visible")
    cy.contains("button", "Refresh").click()
    cy.wait("@v1APIquestion")
    cy.wait("@v1APIanswer")
    cy.contains("button", "Refresh").should("be.enabled")
    cy.get("[data-cy*='question-']").should("be.visible")
    cy.get("[data-cy*='answer-']").should("be.visible")
  })

  it("displays question and answer cards fetched from the REST API", () => {
    const FAKE_QUESTION = "Which province was the last to join Canada in 1949?"
    const FAKE_ANSWER = "What is Newfoundland and Labrador?"
    cy.intercept("GET", "/api/v1/answer", req => {
      req.reply({ index: 1, answer: FAKE_ANSWER })
    })
    cy.intercept("GET", "/api/v1/question", req => {
      req.reply({ index: 1, question: FAKE_QUESTION, numAnswer: 1 })
    })
    cy.contains("button", "Refresh").click()
    cy.wait("@v1APIquestion")
    cy.wait("@v1APIanswer")
    cy.get("[data-cy*='question-']").contains(FAKE_QUESTION)
    cy.get("[data-cy*='answer-']").contains(FAKE_ANSWER)
    cy.percySnapshot()
  })

  it("fetches multiple answer cards if the question requires multiple answers", () => {
    const FAKE_QUESTION =
      "2 of the 4 provinces that formed the new dominion of Canada in 1867."
    let answers = []
    cy.intercept("GET", "/api/v1/question", req => {
      req.reply({ index: 1, question: FAKE_QUESTION, numAnswer: 2 })
    })
    cy.wait("@v1APIanswer").then(({ response }) => {
      answers[0] = response.body.answer
    })
    cy.wait("@v1APIanswer").then(({ response }) => {
      answers[1] = response.body.answer
    })
    cy.contains("button", "Refresh")
      .should("be.enabled")
      .then(() => {
        cy.get("[data-cy*='question-']").findAllByText(FAKE_QUESTION)
        cy.get("[data-cy*='answer-']").contains(answers[0])
        cy.get("[data-cy*='answer-']").contains(answers[1])
      })
  })

  it("has no critical accessibility violations on load", () => {
    cy.injectAxe()
    cy.checkA11y(null, {
      includedImpacts: ["critical"],
    })
  })
})
