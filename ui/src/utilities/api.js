import axios from "axios"

const getQuestionV1 = async () => {
  const response = await axios.get("/api/v1/question")
  const question = response.data.question
  const numAnswer = response.data.numAnswer
  return { numAnswer, question }
}

const getAnswerV1 = async () => {
  const response = await axios.get("/api/v1/answer")
  const answer = response.data.answer
  return answer
}

export { getQuestionV1, getAnswerV1 }
