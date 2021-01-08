import React from "react"
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react"
import {
  toBeEnabled, // eslint-disable-line no-unused-vars
  toBeVisible, // eslint-disable-line no-unused-vars
} from "@testing-library/jest-dom" // eslint-disable-line no-unused-vars
import CardsAgainstContainers from "../cardsAgainstContainers"
import axios from "axios"
import MockAdapter from "axios-mock-adapter"

describe("<CardsAgainstContainers />", () => {
  const mock = new MockAdapter(axios)

  beforeEach(() => {
    mock.resetHandlers()
    cleanup()
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
    const { getAllByRole } = render(<CardsAgainstContainers />)
    await waitForElementToBeRemoved(() => getAllByRole("progressbar"))
    expect(screen.getByText(question)).toBeVisible()
    expect(screen.getByText(answer)).toBeVisible()
  })

  test("Display a question card and multiple answer cards", async () => {
    const question =
      "2 of the 4 provinces that formed the new Dominion of Canada in 1867."
    const answer = ["Ontario", "Quebec", "New Brunswick", "Nova Scotia"]
    mock
      .onGet("/api/v1/answer")
      .replyOnce(200, { index: 0, answer: answer[0] })
      .onGet("/api/v1/answer")
      .replyOnce(200, { index: 1, answer: answer[1] })
      .onGet("/api/v1/answer")
      .replyOnce(200, { index: 2, answer: answer[2] })
      .onGet("/api/v1/answer")
      .replyOnce(200, { index: 3, answer: answer[3] })
    mock.onGet("/api/v1/question").reply(200, {
      index: 42,
      question,
      numAnswer: 4,
    })
    const { getAllByRole } = render(<CardsAgainstContainers />)
    await waitForElementToBeRemoved(() => getAllByRole("progressbar"))
    expect(screen.getByText(question)).toBeVisible()
    expect(screen.getByText(answer[0])).toBeVisible()
    expect(screen.getByText(answer[1])).toBeVisible()
    expect(screen.getByText(answer[2])).toBeVisible()
    expect(screen.getByText(answer[3])).toBeVisible()
  })

  test("Click refresh button fetches a new card combination", async () => {
    const question = [
      "Who was Canada's first prime minister?",
      "Which Great Lake is not in Canada?",
    ]
    const answer = ["Who is Sir John A. MacDonald.", "What is Lake Michigan."]
    mock
      .onGet("/api/v1/answer")
      .replyOnce(200, { index: 0, answer: answer[0] })
      .onGet("/api/v1/answer")
      .replyOnce(200, { index: 1, answer: answer[1] })
    mock
      .onGet("/api/v1/question")
      .replyOnce(200, {
        index: 42,
        question: question[0],
        numAnswer: 1,
      })
      .onGet("/api/v1/question")
      .replyOnce(200, {
        index: 42,
        question: question[1],
        numAnswer: 1,
      })
    const { getAllByRole, getByText } = render(<CardsAgainstContainers />)
    await waitForElementToBeRemoved(() => getAllByRole("progressbar"))
    expect(screen.getByText(question[0])).toBeVisible()
    expect(screen.getByText(answer[0])).toBeVisible()
    fireEvent.click(getByText("Refresh"))
    await waitForElementToBeRemoved(() => getAllByRole("progressbar"))
    expect(screen.getByText(question[1])).toBeVisible()
    expect(screen.getByText(answer[1])).toBeVisible()
    expect(screen.getByText("Refresh")).toBeEnabled()
  })
})
