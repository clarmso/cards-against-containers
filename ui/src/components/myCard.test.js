import React from "react"
import renderer from "react-test-renderer"
import { Question, Answer } from "./myCard"

test("Display a question card without any content", () => {
  const component = renderer.create(<Question />)
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

test("Display a question card", () => {
  const component = renderer.create(
    <Question question="What is Stratford ON?" />
  )
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

test("Display an answer card without any content", () => {
  const component = renderer.create(<Answer />)
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

test("Display an answer card", () => {
  const component = renderer.create(
    <Answer answer="The swan is a symbol of this Ontario city; Each year, white & black swans are released into the Avon River." />
  )
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
