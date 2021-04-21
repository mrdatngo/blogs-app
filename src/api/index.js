import axios from "axios";
export default {
  registeration: (id, name) => {
    return axios.post(
      `${process.env.NEXT_PUBLIC_BASE_API}/api/exams/register`,
      {
        _id: id,
        name,
      }
    );
  },
  fetchExam: (examId) => {
    return axios.get(
      `${process.env.NEXT_PUBLIC_BASE_API}/api/exams/get?_id=${examId}`
    );
  },
  submit: (answersId, result) => {
    return axios.post(`${process.env.NEXT_PUBLIC_BASE_API}/api/exams/submit`, {
      _id: answersId,
      answers: result,
    });
  },
};
