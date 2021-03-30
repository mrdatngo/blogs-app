import React from "react";
import Link from "next/link";
import Head from "next/head";
import Layout from "../components/Layout";
import axios from "axios";
import { useEffect, useState, useRef } from "react";

import { Table, Tag, Space, Input } from "antd";

export default ({ data }) => {
  const [loading, setLoading] = useState(false);
  // const [message, setMessage] = useState("");
  const [keyword, setKeyword] = useState("");
  const [current, setCurrent] = useState(1);
  const [listExam, setListExam] = useState([]);
  const [colums, setColums] = useState([
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      render: (stt) => <a>{stt}</a>,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Time",
      dataIndex: "time",
      key: "time",
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      render: (text) => (
        <a>
          <Tag color={text == "OPEN" ? "green" : "red"} key={text}>
            {text.toUpperCase()}
          </Tag>
        </a>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => {
        return (
          <Space size="middle">
            <Link href={`exam/registeration?id=${record._id}`}>Take</Link>
          </Space>
        );
      },
    },
  ]);
  const firstUpdate = useRef(true);

  useEffect(async () => {
    if (!firstUpdate.current) {
      setLoading(true);
      const response = await axios.post(
        `${process.env.baseApi}/api/exams/list?page=${current}`,
        {
          isOpened: true,
        }
      );
      const data = response.data;
      setLoading(false);
      updateExams(data);
    }
    console.log("I'm int");
  }, [current]);

  useEffect(() => {
    console.log(data);
    updateExams(data);
    firstUpdate.current = false;
  }, []);

  const updateExams = (data) => {
    var listExam = [];
    data &&
      data.data.forEach((exam, index) => {
        console.log(exam);
        listExam.push({
          _id: exam._id,
          stt: exam._id,
          name: exam.name,
          status: exam.status,
          time: exam.time,
        });
      });
    setListExam(listExam);
  };

  const onPageChange = (page) => {
    setCurrent(page);
  };

  const onSearch = (value) => {
    setKeyword(value);
  };

  return (
    <Layout>
      <Head>
        <title>NextJS</title>
      </Head>
      {/* <h3>Hello world: {message}</h3>
      <img src="./images/logo192.png" alt="" />
      <Link href="/about">
        <a>About</a>
      </Link> */}

      {/* <button onClick={findNext}></button> */}

      <Input.Search
        placeholder="input search text"
        onSearch={onSearch}
        style={{ width: 200 }}
      />

      <Table
        pagination={{
          pageSize: 50,
          total: 100,
          current,
          onChange: onPageChange,
        }}
        rowKey={(record) => record._id}
        columns={colums}
        dataSource={listExam}
        loading={loading}
      />

      {/* <style jsx>{`
        h3 {
          text-align: center;
        }
      `}</style> */}
    </Layout>
  );
};

// export async function getStaticProps(context) {
//     return {
//         props: {}, // will be passed to the page component as props
//     };
// }

export async function getServerSideProps(context) {
  const response = await axios.post(`${process.env.baseApi}/api/exams/list`, {
    isOpened: true,
  });
  console.log("DATA", response);
  return {
    props: {
      data: response.data,
    }, // will be passed to the page component as props
  };
}
