import React from "react"
import renderer from "react-test-renderer"
import Footer from "./footer"

test("Display Footer with default parameters", () => {
  const component = renderer.create(<Footer />)
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

test("Display Footer with author, homepage link and github link", () => {
  const author = "Hello World"
  const homepageLink = "https://helloworld.com"
  const githubLink = "https://github.com/helloworld"
  const component = renderer.create(
    <Footer
      author={author}
      homepageLink={homepageLink}
      githubLink={githubLink}
    />
  )
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
