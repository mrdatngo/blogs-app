import React, { useState, useEffect } from "react";
import { Form, Input, Row, Col, Typography, Select, Checkbox } from "antd";
import { useSelect, useInputForm } from "../customHooks/antd";

const { Option } = Select;
const { Text } = Typography;

const Question = ({ updateQuestion, questionIndex, question }) => {
  const [type, onTypeChange] = useSelect("");
  const [description, onDescriptionChange] = useInputForm("");
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    if (question.answers) {
      setAnswers(question.answers);
      onTypeChange(question.type);
      onDescriptionChange({ target: { value: question.description } });
    }
  }, [question]);

  useEffect(() => {
    updateQuestion(questionIndex, {
      type,
      description,
      answers,
    });
  }, [type, description, answers]);

  const onCheckBoxChange = (index, event) => {
    var newAnswers = [...answers];
    if (newAnswers[index] === undefined) {
      newAnswers[index] = {
        description: "",
        right: event.target.checked,
      };
    } else {
      newAnswers[index].right = event.target.checked;
    }
    setAnswers(newAnswers);
  };

  return (
    <div
      style={{
        padding: "10px",
        marginBottom: "10px",
        border: "1px solid #F0F0F0",
        borderRadius: "5px",
      }}
    >
      <Form.Item
        label={"Question " + (questionIndex + 1)}
        name={"question" + questionIndex}
        initialValue={description}
        rules={[
          {
            required: true,
            message: "Please input question name!",
          },
        ]}
      >
        <Text strong>{description}</Text>
      </Form.Item>
      <Row>
        <Col span={4}>
          <Typography.Text strong>Answer</Typography.Text>
          <Form.Item
            // label="Type"
            name={"type" + questionIndex}
          >
            <Text type="secondary">{type}</Text>
          </Form.Item>
        </Col>
        <Col span={20}>
          <Row style={{ textAlign: "center" }}>
            {answers.map((answer, index) => {
              return (
                <React.Fragment key={index}>
                  <Col span={2}>
                    <Checkbox
                      checked={answers[index].right}
                      onChange={(event) => {
                        onCheckBoxChange(index, event);
                      }}
                    />
                  </Col>
                  <Col span={10} style={{ textAlign: "left" }}>
                    <Text>{answer.description}</Text>
                  </Col>
                </React.Fragment>
              );
            })}
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default Question;
