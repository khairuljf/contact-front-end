import { Button, Form, Input } from "antd";
import React, { useId } from "react";
import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";
import api from "../api/contacts";
import { contact } from "./types";
import { useLocation } from "react-router-dom";

export type SetContact = {
  setContacts: React.Dispatch<React.SetStateAction<contact[]>>;
};

type FieldType = {
  name?: string;
  email?: string;
};

type TEditContactProps = {
  contacts: contact[];
  setContacts: React.Dispatch<React.SetStateAction<contact[]>>;
};

export default function EditContactForm({
  contacts,
  setContacts,
}: TEditContactProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const id = useId();

  const newData = location.state?.contact;

  console.log("newData", newData);

  const addContactHandler = async (values: any) => {
    try {
      const response: { data: contact } = await api.put(
        `/contacts/${newData?.id}`,
        values
      );
      if (response.data) {
        const updatedContacts = contacts?.map((contact) => {
          return contact.id === response.data?.id ? response.data : contact;
        });

        setContacts(updatedContacts);

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
        initialValue={newData?.name}
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<FieldType>
        label="E-mail"
        name="email"
        initialValue={newData?.email}
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
}
