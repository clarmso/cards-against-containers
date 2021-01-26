// <reference types="Cypress" />

describe("Sanity tests", () => {
  beforeEach(() => {
    cy.intercept("GET", "/api/v1/answer").as("v1APIanswer")
    cy.intercept("GET", "/api/v1/question").as("v1APIquestion")
    cy.visit("/")
  })

  it("load and refresh property", () => {
    cy.wait("@v1APIquestion")
    cy.wait("@v1APIanswer")
    cy.findAllByText("Cards Against Containers").should("be.visible")
    cy.findByTestId("question-card-0").should("be.visible")
    cy.findByTestId("answer-card-0").should("be.visible")
    cy.contains("button", "Refresh").click()
    cy.wait("@v1APIquestion")
    cy.wait("@v1APIanswer")
    cy.contains("button", "Refresh").should("be.enabled")
    cy.findByTestId("question-card-0").should("be.visible")
    cy.findByTestId("answer-card-0").should("be.visible")
  })

  it("display question and answer cards fetched from the REST API", () => {
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
    cy.findByTestId("question-card-0").contains(FAKE_QUESTION)
    cy.findByTestId("answer-card-0").contains(FAKE_ANSWER)
    cy.percySnapshot()
  })

  it("fetch multiple answer cards if the question requires multiple answers", () => {
    const FAKE_QUESTION =
      "2 of the 4 provinces that formed the new dominion of Canada in 1867."
    const FAKE_ANSWER = "What is Ontario?"
    cy.intercept("GET", "/api/v1/question", req => {
      req.reply({ index: 1, question: FAKE_QUESTION, numAnswer: 2 })
    })
    cy.intercept("GET", "/api/v1/answer", req => {
      req.reply({ index: 1, answer: FAKE_ANSWER })
    })
    cy.contains("button", "Refresh")
      .should("be.enabled")
      .then(() => {
        cy.findByTestId("question-card-0").findAllByText(FAKE_QUESTION)
        cy.findByTestId("answer-card-0").contains(FAKE_ANSWER)
        cy.findByTestId("answer-card-1").contains(FAKE_ANSWER)
      })
  })

  it("has no critical accessibility violations on load", () => {
    cy.injectAxe()
    cy.checkA11y(null, {
      includedImpacts: ["critical"],
    })
  })
})
