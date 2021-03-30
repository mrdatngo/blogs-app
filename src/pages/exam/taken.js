import React, { useState, useEffect, useRef } from "react";
import {
  Skeleton,
  Form,
  Input,
  Row,
  Col,
  Divider,
  Button,
  Select,
  Layout,
  Card,
  Typography,
  message,
} from "antd";
import { useRouter } from "next/router";
import Question from "../../components/Question";
import api from "../../api";
import { PlusCircleOutlined } from "@ant-design/icons";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const { Option } = Select;
const { Content } = Layout;
const { Text } = Typography;

const Taken = () => {
  const router = useRouter();
  const [answersId, setAnswersId] = useState("");
  const [examId, setExamId] = useState("");

  const [name, setName] = useState("");
  // const [time, setTime] = useState(0);
  const [status, setStatus] = useState("");
  // const [exam, setExam] = useState({});
  const [remainTime, setRemainTime] = useState("0");
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [form] = Form.useForm();

  useEffect(() => {
    // update mode
    // fetchExamAction(id);
    console.log("router: ", router.query);
    let answersId = router.query.answers_id;
    // console.log("answersId", answersId)
    let examId = router.query.exam_id;
    setAnswersId(answersId);
    setExamId(examId);
    if (!answersId || !examId) {
      alert("Missing id answer");
    } else {
      setLoading(true);
      api
        .fetchExam(examId)
        .then((res) => {
          setLoading(false);
          console.log("res: ", res);
          let data = res.data.data;
          let questions = data.questions;
          console.log(questions);
          for (let i = 0; i < questions.length; i++) {
            let answers = questions[i].answers;
            console.log("answers: ", answers);
            answers.forEach((answer) => {
              answer.right = false;
            });
          }
          setQuestions(questions);
          setName(data.name);
          setStatus(data.status);

          setInterval(() => {
            let createAt = Date.parse(data.createdAt);
            let now = new Date().getTime();
            let minuteRemain = Math.floor(
              (createAt - now) / 1000 / 60 + data.time
            );
            console.log(createAt, now, data.time);
            setRemainTime(minuteRemain);
          }, 1000);

          //   form.setFieldsValue({
          //     name: data.name,
          //     time: data.time,
          //     status: data.status,
          //   });
          questions.forEach((question, index) => {
            form.setFieldsValue({
              ["question" + index]: question.description,
              ["type" + index]: question.type,
            });
          });
        })
        .catch((err) => {
          setLoading(false);
          console.log("err", err);
          message.error("Something went wrong!");
        });
    }
  }, []);

  const updateQuestion = (index, question) => {
    questions[index] = question;
    setQuestions(questions);
  };

  //   const onFinish = (values) => {
  //     let answersExam = {
  //       answersId,
  //       examId,
  //       questions,
  //     };
  //     console.log("answersExam: ", answersExam);
  //     // continue here
  //     api.answer();
  //   };

  //   const onFinishFailed = (errorInfo) => {
  //     console.log("Failed:", errorInfo);
  //   };

  const Submit = () => {
    let result = [];
    questions.forEach((question) => {
      let answers = question.answers;
      let choices = [];
      answers.forEach((answer) => {
        if (answer.right) {
          choices.push(answer._id);
        }
      });
      result.push(choices);
    });
    console.log("AnsserID: ", answersId);
    api
      .submit(answersId, result)
      .then((resp) => console.log(resp))
      .catch((err) => {
        let messageErr = "Something went wrong!";
        if (
          err &&
          err.response &&
          err.response.data &&
          err.response.data.message
        ) {
          messageErr = err.response.data.message;
        }
        // debugger;
        console.log(err);
        message.error(messageErr);
      });
    console.log("result: ", result);
  };

  return (
    <>
      {loading ? (
        <Skeleton active />
      ) : (
        <Card style={{ padding: "20px" }}>
          <Form
            form={form}
            {...layout}
            name="basic"
            initialValues={{ remember: true }}
            // onFinish={onFinish}
            // onFinishFailed={onFinishFailed}
            layout="vertical"
          >
            {/* header */}
            <Row>
              <Col span={8}>
                <Form.Item label="Exam name" name="name">
                  {/* <Input disabled /> */}
                  <Text strong>{name}</Text>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="Time(Minutes)" name="time">
                  {/* <Input disabled type="number" /> */}
                  <Text>{remainTime}</Text>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="Status" name="status">
                  {/* <Select
                    disabled
                    style={{ width: "100%" }}
                    // defaultValue={status}
                  >
                    <Option value="close">Close</Option>
                    <Option value="open">Open</Option>
                  </Select> */}
                  {}
                  <Text strong type={status === "close" ? "danger" : "success"}>
                    {status.toUpperCase()}
                  </Text>
                </Form.Item>
              </Col>
            </Row>
            <Divider orientation="left">Questions</Divider>
            {questions &&
              questions.map((_, index) => (
                <Question
                  key={index}
                  updateQuestion={updateQuestion}
                  questionIndex={index}
                  question={questions[index]}
                />
              ))}
            <Button
              onClick={Submit}
              style={{ margin: "10px" }}
              type="primary"
              htmlType="submit"
            >
              Submit
            </Button>
          </Form>
        </Card>
      )}
    </>
  );
};

export async function getServerSideProps({ query }) {
  return {
    props: {
      query,
    }, // will be passed to the page component as props
  };
}

export default Taken;
