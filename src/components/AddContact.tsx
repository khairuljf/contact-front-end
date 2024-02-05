import { Button, Form, Input } from "antd";
import React, { useId } from "react";
import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";
import api from "../api/contacts";
import { contact } from "./types";

export type SetContact = {
  setContacts: React.Dispatch<React.SetStateAction<contact[]>>;
};

type FieldType = {
  name?: string;
  email?: string;
};

const AddContactForm = ({ setContacts }: SetContact) => {
  const navigate = useNavigate();
  const id = useId();

  const addContactHandler = async (values: any) => {
    const request = {
      id: id,
      ...values,
    };

    try {
      const response: { data: contact } = await api.post("/contacts", request);

      if (response.data) {
        setContacts((prevState) => [...prevState, response?.data]);
        navigate("/");
      }
    } catch (error) {
      // Handle errors from the API call
      console.error("Error while making the API call:", error);
    }

  };

  // Get failed message

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  // Add contact
  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      onFinish={addContactHandler}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item<FieldType>
        label="Name"
        name="name"
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<FieldType>
        label="E-mail"
        name="email"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
      <Link to={"/"}>Cancel</Link>
    </Form>
  );
};

export default AddContactForm;
