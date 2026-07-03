import questions from "../data/questions.json"
import answers from "../data/answers.json"

const BLANK = "________"

const getQuestionV1 = () => {
  const question = questions[Math.floor(Math.random() * questions.length)]
  const blankCount = (question.match(new RegExp(BLANK, "g")) || []).length
  const numAnswer = Math.max(blankCount, 1)
  return { numAnswer, question }
}

const getAnswerV1 = () => {
  return answers[Math.floor(Math.random() * answers.length)]
}

export { getQuestionV1, getAnswerV1 }
