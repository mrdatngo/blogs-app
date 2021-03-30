import axios from "axios";
export default {
  registeration: (id, name) => {
    return axios.post(`http://localhost:9000/api/exams/register`, {
      _id: id,
      name,
    });
  },
  fetchExam: (examId) => {
    return axios.get(`http://localhost:9000/api/exams/get?_id=${examId}`);
  },
  submit: (answersId, result) => {
    return axios.post(`http://localhost:9000/api/exams/submit`, {
      _id: answersId,
      answers: result,
    });
  },
};
