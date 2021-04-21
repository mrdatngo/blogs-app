import React, { useEffect, useState } from "react";
import { Form, Input, Button, Modal, Typography } from "antd";
import {} from "antd";
import { useRouter } from "next/router";
import api from "../../api";

const { Text } = Typography;
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};
const Registeration = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    console.log("router: ", router.query);
    // console.log("query: ", query);
    // router.push(`/exam/taken?id=${"test"}`);
  }, []);

  const onFinish = (values) => {
    console.log("Success:", values);
    setLoading(true);
    api
      .registeration(router.query.id, name)
      .then((res) => {
        setLoading(false);
        console.log("res: ", res);
        let answerId = res.data.data._id;
        let examId = res.data.data.examId;
        if (!answerId) {
          alert("Something went wrong");
        } else {
          router.push(`/exam/taken?answers_id=${answerId}&exam_id=${examId}`);
        }
      })
      .catch((err) => {
        setLoading(false);
        var message = "Something went wrong";
        if (err.response && err.response.data && err.response.data.message) {
          message = err.response.data.message;
        }
        setMessage(message);
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const onNameChange = (event) => {
    setName(event.target.value);
  };

  return (
    <Modal title="Basic Modal" visible={true} footer={null}>
      <Form
        {...layout}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        loading={loading}
      >
        <Form.Item
          label="Your name"
          name="yourname"
          rules={[
            {
              required: true,
              message: "Please input your name!",
            },
          ]}
        >
          <Input onChange={onNameChange} />
        </Form.Item>
        <div style={{ textAlign: "center" }}>
          <Text type="danger">{message}</Text>
        </div>
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit" loading={loading}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export async function getServerSideProps({ query }) {
  return {
    props: {
      query,
    }, // will be passed to the page component as props
  };
}

export default Registeration;
