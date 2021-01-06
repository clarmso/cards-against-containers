import React from "react"
import {
  render,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react"
import CardsAgainstContainers from "../cardsAgainstContainers"
import axios from "axios"
import MockAdapter from "axios-mock-adapter"

describe("<CardsAgainstContainers />", () => {
  const mock = new MockAdapter(axios)

  beforeEach(() => {
    mock.resetHandlers()
  })

  test("Display a question card and an answer card", async () => {
    const question = "What is the largest Great Lake?"
    const answer = "What is Lake Superior."
    mock.onGet("/api/v1/question").reply(200, {
      index: 42,
      question,
      numAnswer: 1,
    })
    mock.onGet("/api/v1/answer").reply(200, {
      index: 42,
      answer,
    })
    const { getAllByRole, getByText } = render(<CardsAgainstContainers />)
    await waitForElementToBeRemoved(() => getAllByRole("progressbar"))
    await waitFor(() => getByText(question))
    await waitFor(() => getByText(answer))
  })

  test("Display a question card and multiple answer cards", async () => {
    const question =
      "2 of the 4 provinces that formed the new Dominion of Canada in 1867."
    const answers = ["Ontario", "Quebec", "New Brunswick", "Nova Scotia"]
    mock
      .onGet("/api/v1/answer")
      .replyOnce(200, { index: 0, answer: answers[0] })
      .onGet("/api/v1/answer")
      .replyOnce(200, { index: 1, answer: answers[1] })
      .onGet("/api/v1/answer")
      .replyOnce(200, { index: 2, answer: answers[2] })
      .onGet("/api/v1/answer")
      .replyOnce(200, { index: 3, answer: answers[3] })
    mock.onGet("/api/v1/question").reply(200, {
      index: 42,
      question,
      numAnswer: 4,
    })
    const { getAllByRole, getByText } = render(<CardsAgainstContainers />)
    await waitForElementToBeRemoved(() => getAllByRole("progressbar"))
    await waitFor(() => getByText(question))
    await waitFor(() => getByText(answers[0]))
    await waitFor(() => getByText(answers[1]))
    await waitFor(() => getByText(answers[2]))
    await waitFor(() => getByText(answers[3]))
  })
})
