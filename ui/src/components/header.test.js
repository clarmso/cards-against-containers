import React from "react"
import renderer from "react-test-renderer"
import Header from "./header"

test("Display a header without any content", () => {
  const component = renderer.create(<Header />)
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

test("Display a header with title and description", () => {
  const title = "Prince Edward Island"
  const description = "Locals just call this seventh province The Island"
  const component = renderer.create(
    <Header title={title} description={description} />
  )
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
